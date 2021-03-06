<img src="./.github/assets/tns.png" width="50" height="50"/>

# MSDV Archive

<a href="http://newschool.edu"><img src="https://img.shields.io/badge/made%20at-The%20New%20School-E82E21.svg" height="20px"/></a> <img src="https://img.shields.io/badge/npm-16.15.0-informational.svg" height="20px"/>

This repository archives projects made by students of the MS Data Visualization program at Parsons School of Design.

> **Note**: Please submit a pull request with your new project URL if you relocate your work to a different domain name or hosting provider.

# Getting Started

## Prerequisites

You will need access to the following command line tools.

Required:

- **Node.js (v16.15.0)**
  [https://nodejs.org/](https://nodejs.org/)
- **Yarn (v3.2.1)**
  [https://yarnpkg.com/](https://yarnpkg.com/)

Optional:

- A Node.js version manager like [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm)

## Development Decisions

* Vite is a build-tool, similar to webpack, which provides a development server and bundles the final project assets. Vite 

> **Warning**: This project uses ESM. Use `.mjs` extension instead of `.js`. If CommonJS is needed, use `.cjs`. Do not remove `"type": "module"` from `package.json`

* By design, Node.js will default to using CommonJS modules. This project uses ESM (or ECMAScript modules) which is consistent with the build. Node.js will run correctly with ESM providing the following: your file extension ends in `.mjs` and you have `"type": "module"` set in `package.json`

## Yarn Commands

> **Warning**: Make sure you are using the correct version of yarn. Run the following command in your terminal: `yarn set version 3.2.1`

This repository uses `yarn` to run commands. These commands are defined inside of the `package.json` file.

```sh
# Example:
# yarn [command]
yarn dev
```

| command  | description                                                      | why is this helpful                                                                      |
| :------- | :--------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| dev      | starts development server                                        | gives us a live preview of our site that we can view in the browser                      |
| format   | runs prettier to format files according to .pretterrc.yml config | keeps code style consistent and reduces the number of line changes between Pull Requests |
| lint     | runs eslint to check for code errors and bugs                    | helps catch errors like typos before we build the site                                   |
| test     | runs jest to execute unit tests to check components              | checks that recent changes don't change how our components function                      |
| validate | validates that all JSON files in /data follow the correct schema | ensures that there aren't any unknown or missing properties in our JSON                  |
| build    | builds static deployment assets                                  | compiles framework specific files (like .vue) to browser compatible javascript           |

## GitHub Actions

This repository is set up to use GitHub Actions to check the status of commits made and to deploy the project to GitHub Pages. Each workflow is defined in a separate Yaml file in `.github/workflows/`

| workflow | description                                                                                                    |
| :------- | :------------------------------------------------------------------------------------------------------------- |
| test     | runs formatter, linter, and ensures that build process do not throw any errors                                 |
| validate | checks that all JSON files in /data folder use the correct schema and don't have unknown or missing properties |
| deploy   | builds web assets and pushes automatically to github pages branch                                              |

## Data

Project data is stored in `./data/projects.json`. The file follows the schema defined in `./data/schema.json` which follows a [JSON Schema](https://json-schema.org/) specification.

The projects array follows this template:

```json
{
   "description": "Project description",
   "image": "static/preview-YEAR/<STUDENT NAME>.png",
   "name": "Student Name",
   "portfolio": "<PORTFOLIO LINK>",
   "repo": "<PROJECT REPO>",
   "subtitle": "Project intro text",
   "tags": ["#data", "#technology"],
   "title": "Project title",
   "url": "<PROJECT LINK>",
   "video": "<VIDEO LINK>",
   "year": YYYY
}
```

The `validate` GitHub workflow will run anytime a commit is made (including pull requests). You can also validate before pushing code by running

```sh
yarn validate
```

## Local Development

### Starting a local development server

1. Make sure you have the right version of Node.js
   ```sh
   node --version
   # v16.15.0
   ```
2. Make sure you have the right version of Node.js
   ```sh
   yarn --version
   # 3.2.1

   # if version does not match, execute the following
   yarn set version 3.2.1
   ```
3. Install dependencies
   ```sh
   yarn install
   ```
4. Start development server
   ```sh
   yarn dev
   ```

## Deploying

An update to `gh-pages` is made when a commit is pushed to the `main` branch.

---

# How to contribute updates to this repository

It is recommended to follow the best practices detailed in the MS Data Visualization GitHub workflow document found at https://github.com/visualizedata/github-workflow

### Workflow for contributing to MS Data Visualization repositories

1. Initial setup:

   - [Fork a repository, create a local clone of your fork, and configure Git to sync your fork with the original repository](https://help.github.com/articles/fork-a-repo/)

2. In the local clone of your fork, [create a branch for your edits](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging).
   `git branch mybranch` creates a branch named _mybranch_
   `git checkout mybranch` switches to the branch _mybranch_

   - Do all your work in this branch.
   - [Push your branch](https://help.github.com/articles/pushing-to-a-remote/) to the forked repo early and often.
   - Never work in the `main` branch!
   - gh-pages will publish _directly to the live site_ (it takes about 5 minutes to update)

3. [Pull in changes often from the `upstream main` to keep it synced](https://help.github.com/articles/syncing-a-fork/) so that when you prepare your pull request, merge conflicts will be less likely. Again, never work in the `main` branch!

4. [Merge the fork main into the fork branch](https://stackoverflow.com/a/16957483) and, if applicable, [resolve any merge conflicts](https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/).
   `git merge <branch>` merges the specified branch into the current branch.

5. When you are ready for your contributions to be considered, open a [Pull Request](https://help.github.com/articles/creating-a-pull-request/) in GitHub. The Pull Request should be for the up-to-date **branch** of your fork. Prior to submitting the Pull Request, make sure you have:
   - Synced the fork main with the latest version of the upstream main (#3).
   - Merged the fork main to the fork branch and resolved any merge conflicts (#4).

### Tips

Use [GitHub issues](https://guides.github.com/features/issues/) to log problems and communicate.

Sometimes, you mess up and need to go back to a previous commit. [Use `revert`](https://www.atlassian.com/git/tutorials/undoing-changes/git-checkout). Do not use `reset`! Here's a helpful [Stack Overflow answer](http://stackoverflow.com/questions/4114095/how-to-revert-git-repository-to-a-previous-commit).

---

# Helpful resources

Node.js
- [ESM Modules](https://nodejs.org/api/esm.html#modules-ecmascript-modules)

Vue
- [Vue Documentation](https://vuejs.org/guide/introduction.html)

JSON Schema
- [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/)

GitHub
- [Introduction to GitHub Flow](https://guides.github.com/introduction/flow/)
- [GitHub Help: Collaborating on projects using issues and pull requests](https://help.github.com/categories/collaborating-on-projects-using-issues-and-pull-requests/)
- [GitHub Guides: contributing to open source](https://guides.github.com/activities/contributing-to-open-source/)
