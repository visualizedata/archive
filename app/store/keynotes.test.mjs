/* eslint-env jest */
///<reference types="@types/jest"/>

import { setActivePinia, createPinia } from 'pinia'
import { useKeynotes } from './keynotes.mjs'

describe('Keynotes Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('sorts by year', () => {
    const store = useKeynotes()
    const keynotes = store.paths

    const firstLabel = keynotes[0].label
    const lastLabel = keynotes[keynotes.length - 1].label

    expect(parseInt(firstLabel)).toBeGreaterThan(parseInt(lastLabel))
  })
})
