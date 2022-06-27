# Updates
## Data Schema

for data.json

```jsonc
{
      "author": array[1],
      
      "title": string,
      "subtitle": string, 		
      "description": string,

      "student_url": string, 			
      "project_url": string,       
      "project_repo": string, 
      
      "category": array[1],  //"thesis" or "ms1"     
      "tags": array, //for "ms1" category, tag can be "smithsonian", "met", or "undp"
      
      "year": int,
      
      "image": array,      
      "image_url": array,     
      "video": string,
}

```

for metadata.json

```json

{

    "msdv_url": "http://www.newschool.edu/parsons/ms-data-visualization/",
    "msdv_archive_url": "https://parsons.nyc/",

    "amt_url": "http://www.newschool.edu/parsons/art-media-technology-school-amt/",
    "parsons_url": "https://www.newschool.edu/parsons/",
    "newschool_url": "https://www.newschool.edu/"
    
}

```



## Collecting Progress

Following is a checklist of all the data files to be processed. Some files needs to be manually adjust. So the instructions are also included here.

All the json files can be found at [src/archive-json-wip](https://github.com/visualizedata/archive/tree/testing/src/archive-json-wip)


### Thesis Data


- [x] before 2022
- [x] 2022
  
  - [ ] need to collect `student_url`


### Partnerships

- Smithsonian Institute Partnership 2021 https://github.com/visualizedata/smithsonian-2020`
- SI 2020 https://github.com/visualizedata/smithsonian-2020
- The Met Museum 2019 https://github.com/visualizedata/met-museum-2019
- UNDP Renewable Energy 2018 https://github.com/visualizedata/undp-renewable-energy
- UNDP Inequality Trends 2017 https://github.com/visualizedata/undp-inequality-trends
- UNDP Inequality 2016 https://github.com/visualizedata/undp-inequality
- UNDP Gender Gap 2015 https://github.com/visualizedata/undp

#### Collection

- [x] smithsonian ms1-2021
  - [x] modify name: Gisli Gudjonsson -> G\u00edsli Gudj\u00f3nsson
  - [ ] 1 typo: `decription` in data.json
  
- [x] smithsonian ms1-2020
  - [x] modify name: Soonk Paik -> Seungyu Paik

- [x] met ms1-2019
  - [x] modify name: Antonie C. Dreyer -> Antonie Dreyer
  
- [x] met ms1-2018

- [ ] undp 2018

- [ ] undp 2017 

- [ ] undp 2016

- [ ] undp 2015


# Next Step

	
* move images to the location [src/assets/images](https://github.com/visualizedata/archive/tree/testing/src/assets/images) and update `image_url` accordingly
 
* Process `undp` data

* Update `metadata.json` 

* Manual adjustments if needed

