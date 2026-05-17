import json
import pandas as pd
import requests

from os import makedirs, path
from PIL import Image as PImage


EXPECTED_DATA_DEFINITIONS = [
  "first_name", "last_name", "project_title",
  "project_subtitle", "project_description", "project_tags",
  "repo_url", "project_url", "student_url", "image_url",
]

EXPECTED_COLLECTION_DEFINITIONS = ["course", "year"]
VALID_COURSES = ["thesis", "ms1", "ms2", "other"]

TEMP_COLUMNS = [
  "image_url", "author_id", "project_id"
]

REQUIRED_COLUMNS = [
  "author", "title", "subtitle", "description",
  "tags", "project_repo", "project_url", "student_url",
  "category", "year", "image", "video",
]


def make_author_slug(name):
  return name.lower().replace(" ", "")

def make_collection_id(definitions):
  return definitions["course"].lower() + "_" + str(definitions["year"])


def check_collection_definitions(definitions):
  key_diff = set(EXPECTED_COLLECTION_DEFINITIONS).difference(set(definitions.keys()))

  if len(key_diff) > 0:
    raise Exception(f"Check definitons. The following keys are missing: {key_diff}")

  course = definitions["course"]
  if type(course) is not str or course.lower() not in VALID_COURSES:
    raise Exception(f"Check course value: it should be a string and one of {VALID_COURSES}")

  year = definitions["year"]
  if type(year) is not int or year < 2000 or year > 2100:
    raise Exception("Check year value: it should be a 4 digit whole number (int)")


def check_data_definitions(data, definitions, optional=[]):
  key_diff = set(EXPECTED_DATA_DEFINITIONS).difference(set(definitions.keys())).difference(set(optional))

  if len(key_diff) > 0:
    raise Exception(f"Check definitons. The following keys are missing: {key_diff}")
  
  def_vals = [v.lower() for k,v in definitions.items() if (k != "project_tags") and (k not in optional)]
  def_vals += [t.lower() for t in definitions["project_tags"]]

  val_diff = set(def_vals).difference(set(data.columns.str.lower()))

  if "" in def_vals:
    raise Exception(f"Check definitons. Some column names are blank: {definitions}")

  if len(val_diff) > 0:
    raise Exception(f"Check definitons. The following columns are missing: {val_diff}")

  for k in optional:
    if k in definitions and definitions[k]:
      if definitions[k].lower() not in data.columns.str.lower():
        print(f"Warning. The following optional column is missing from dataset: {definitions[k]}")


def extract_data(data_, data_definitions, collection_definitions, optional=[]):
  data = data_.copy().fillna("")
  original_columns = [c.lower() for c in data.columns]
  data.columns = original_columns
  check_data_definitions(data, data_definitions, optional)

  check_collection_definitions(collection_definitions)
  collection_id = make_collection_id(collection_definitions)

  for k,v in data_definitions.items():
    if type(v) is str:
      data_definitions[k] = v.lower()
    if type(v) is list:
      data_definitions[k] = [x.lower() for x in v]

  res_df = pd.DataFrame(columns=REQUIRED_COLUMNS + TEMP_COLUMNS)
  res_df["author"] = data.apply(lambda row: row[data_definitions["first_name"]] + " " + row[data_definitions["last_name"]], axis=1)
  res_df["author_id"] = res_df["author"].apply(make_author_slug)
  res_df["author"] = res_df["author"].apply(lambda x: [x])
  res_df["title"] = data[data_definitions["project_title"]]
  res_df["subtitle"] = data_definitions["project_subtitle"] if "project_subtitle" in data_definitions else ""
  res_df["video"] = ""
  res_df["video"] = res_df["video"].apply(lambda x: [])
  res_df["description"] = data[data_definitions["project_description"]]
  res_df["project_repo"] = data[data_definitions["repo_url"]]
  res_df["project_url"] = data[data_definitions["project_url"]]
  res_df["student_url"] = data[data_definitions["student_url"]]

  res_df["tags"] = ""
  res_df["tags"] = res_df["tags"].apply(lambda x: [])
  for idx,row in res_df.iterrows():
    for tag_col in data_definitions["project_tags"]:
      if data.iloc[idx][tag_col]:
        row["tags"].append(data.iloc[idx][tag_col])

  res_df["category"] = collection_definitions["course"]
  res_df["category"] = res_df["category"].apply(lambda x: [x])
  res_df["year"] = collection_definitions["year"]

  author_cum_cnt = res_df.groupby("author_id").cumcount()
  res_df["project_id"] = res_df.apply(lambda row: f"{row['author_id']}{author_cum_cnt[row.name]}", axis=1)
  res_df["image"] = res_df["project_id"].apply(lambda pid: [f"{collection_id}/{pid}.png"])
  res_df["image_url"] = data[data_definitions["image_url"]]

  no_image_url = (~res_df["image_url"].str.startswith("http"))
  res_df.loc[no_image_url, "image"] = res_df.loc[no_image_url, "image"].apply(lambda x: [])

  return res_df


def create_paths(projects_dir_path, projects_file_path, images_dir_path):
  if path.isfile(projects_file_path):
    raise Exception(f"{projects_file_path} already exists. Move it or delete it before continuing.")

  makedirs(projects_dir_path, exist_ok=True)
  makedirs(images_dir_path, exist_ok=True)


def download_images(data, images_dir_path):
  for idx,row in data.iterrows():
    img_url = row["image_url"].strip()
    img_filepath = f"{images_dir_path}/{row['project_id']}.png"

    if path.isfile(img_filepath):
      print(f"WARNING: {img_filepath} exists. Skipping")
      continue

    if not str(img_url).lower().startswith("http"):
      continue

    with requests.get(img_url, stream=True) as response:
      try:
        PImage.open(response.raw).save(img_filepath)
      except Exception as e:
        print(img_url)


def save_data(data, collection_definitions, projects_path, images_path):
  collection_id = make_collection_id(collection_definitions)

  collection_file_path = f"{projects_path}/{collection_id}.json"
  images_dir_path = f"{images_path}/{collection_id}"

  create_paths(projects_path, collection_file_path, images_dir_path)
  download_images(data, images_dir_path)

  missing_cols = set(REQUIRED_COLUMNS).difference(set(data.columns))
  if len(missing_cols) > 0:
    raise Exception(f"Missing columns from dataset: {missing_cols}")

  extra_cols = set(data.columns).difference(set(REQUIRED_COLUMNS))
  data_json = data.drop(columns=extra_cols).to_dict(orient="records")

  json.dump(data_json, 
            open(collection_file_path, "w"), 
            indent=2, sort_keys=True,
            ensure_ascii=False)

