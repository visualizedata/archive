import { defineStore } from 'pinia'

const allKeysnotes = () => {
  const files = import.meta.globEager(
    '../../data/keynotes/?!(_schema).json'
  )

  const merged = Object.values(files).reduce((state, input) => {
    // input is a "module" and the data we want is stored in `input.default`
    const data = input.default

    // if data is an array, join it to our existing "state" array
    if (data.year) {
      return Object.assign(state, { [data.year]: data })
    }

    // otherwise return our array as is
    return state
  }, {})

  return merged
}

export const useKeynotes = defineStore('keynotes', {
  state: () => ({
    keynotes: allKeysnotes(),
  }),
  getters: {
    paths: (state) => {
      return Object.keys(state.keynotes)
        .sort((a, b) => {
          return a.toLowerCase() - b.toLowerCase() ? 1 : -1
        })
        .map((slug) => ({
          path: `/keynote/${slug}`,
          label: state.keynotes[slug].title,
        }))
    },
    getByYear: (state) => (year) => {
      return state.keynotes[year]
    },
  },
})
