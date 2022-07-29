export const cleanString = (str) => {
  return str.replace(/[^A-Za-z0-9]+/g, '-').toLowerCase()
}

export const makeSlug = (p) => {
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
export const fetchProjects = () => {
  // relative path to "data" folder
  const files = import.meta.globEager(
    '../../data/projects/?!(_schema).json'
  )

  const merged = Object.values(files).reduce((state, input) => {
    // input is a "module" and the data we want is stored in `input.default`
    const data = input.default || input

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
