/* eslint-env jest */
///<reference types="@types/jest"/>

import { setActivePinia, createPinia } from 'pinia'
import { useFilters } from './filters.mjs'

describe('Filters Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('updates search query', () => {
    const store = useFilters()

    store.updateQuery('test')

    expect(store.searchQuery).toBe('test')
  })

  it('batch updates filters', () => {
    const store = useFilters()

    const state = {
      searchQuery: 'foo',
      activeYears: [2020],
      activeCategories: ['bar'],
      activeTags: ['baz'],
    }

    store.updateBatch(state)

    const compare = Object.keys(state).reduce((state, input) => {
      state[input] = store[input]
      return state
    }, {})

    expect(compare).toMatchObject(state)
  })
})
