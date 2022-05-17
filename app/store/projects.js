import path from 'path'
import { defineStore } from 'pinia'

import { useFilters } from './filters'
import Fuse from 'fuse.js'

const cleanString = (str) => {
  return str.replace(/[^A-Za-z0-9]+/g, '-').toLowerCase()
}

const makeSlug = (p) => {
  const year = p.year
  const title = cleanString(p.title)
  const author = cleanString(p.author.join('-'))

  // example: 2020-my-thesis-jane-doe
  return [year, title, author].join('-')
}

/**
 * allProjects
 * @description this function finds all of the JSON files in our `/data/src` folder
 * and merges them together into one array
 */
export const allProjects = () => {
  // relative path to "data" folder
  const files = import.meta.globEager('../../data/projects/*.json')

  const merged = Object.values(files).reduce((state, input) => {
    // input is a "module" and the data we want is stored in `input.default`
    const data = input.default

    // if data is an array, join it to our existing "state" array
    if (Array.isArray(data)) {
      return state.concat(
        data.map((project) => {
          return { ...project, slug: makeSlug(project) }
        })
      )
    }

    // otherwise return our array as is
    return state
  }, [])

  // initially sort projects by year
  return merged.sort((a, b) => {
    return b.year > a.year ? 1 : -1
  })
}

/**
 * useProjects
 * @description this is our pinia state slice for `projects`
 */
export const useProjects = defineStore('projects', {
  state: () => ({
    projects: allProjects(),
  }),
  getters: {
    findBySlug: (state) => {
      return (str) => state.projects.find((p) => p.slug === str)
    },
    filteredProjects: (state) => {
      const filterStore = useFilters()
      const searchQuery = filterStore.$state.searchQuery
      const activeTags = filterStore.$state.activeTags
      const activeCategories = filterStore.$state.activeCategories
      const activeYears = filterStore.$state.activeYears

      // filter by tags and years prior to running fuse
      let projects = state.projects

      console.log({ searchQuery, activeTags, activeYears })

      if (activeTags.length > 0) {
        projects = projects.filter((project) => {
          return activeTags.every((tag) => project.tags.includes(tag))
        })
      }

      if (activeCategories.length > 0) {
        projects = projects.filter((project) => {
          return project.category.some((tag) =>
            activeCategories.includes(tag)
          )
        })
      }

      if (activeYears.length > 0) {
        projects = projects.filter((project) => {
          return activeYears.includes(project.year)
        })
      }

      if (searchQuery !== '' && searchQuery !== null) {
        const options = {
          // which keys should be assessed for matches
          keys: ['title', 'description', 'author'],
          // At what point does the match algorithm give up.
          // A threshold of 0.0 requires a perfect match (of both letters and location)
          // a threshold of 1.0 would match anything.
          threshold: 0.3,
        }
        const fuse = new Fuse(projects, options)

        const results = fuse.search(searchQuery)

        return results.map((result) => result.item)
      }

      return projects
    },
  },
})
