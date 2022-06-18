import { defineStore } from 'pinia'

import allProjects from './_allProjects.js'

const createMetadata = (projects) => {
  const tags = {},
    categories = {},
    years = {}

  projects.forEach((project) => {
    // push tags
    project.tags.forEach((entry) => {
      if (!tags[entry]) {
        tags[entry] = 0
      }

      tags[entry] += 1
    })

    // push categories
    project.category.forEach((entry) => {
      if (!categories[entry]) {
        categories[entry] = 0
      }

      categories[entry] += 1
    })

    // push year
    const year = project.year

    if (!years[year]) {
      years[year] = 0
    }

    years[year] += 1
  })

  return { tags, categories, years }
}

/**
 * useFilters
 * @description this is our filter store
 */
export const useFilters = defineStore('filters', {
  state: () => {
    const { tags, categories, years } = createMetadata(allProjects())
    return {
      // search
      searchQuery: null,

      // tags
      tags: tags,
      activeTags: [],

      // categories
      categories: categories,
      activeCategories: [],

      // years
      years: years,
      activeYears: [],

      // sort
      sortKeys: ['year', 'student name', 'title'],
      activeSortKey: 'year',
      sortDirection: 'ascending',
    }
  },
  getters: {},
  actions: {
    updateQuery(query) {
      this.searchQuery = query
    },
    updateBatch(options) {
      Object.entries(options).forEach(([key, value]) => {
        this[key] = value
      })
    },
  },
})
