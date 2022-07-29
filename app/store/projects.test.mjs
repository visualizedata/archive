/* eslint-env jest */
///<reference types="@types/jest"/>

import { setActivePinia, createPinia } from 'pinia'
import { useProjects } from './projects.mjs'

describe('Project Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('sorts by year', () => {
    const store = useProjects()
    const projects = store.projects

    const firstProject = projects[0]
    const lastProject = projects[projects.length - 1]

    expect(firstProject.year).toBeGreaterThan(lastProject.year)
  })
})
