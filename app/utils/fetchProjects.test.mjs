/* eslint-env jest */
///<reference types="@types/jest"/>
import { fetchProjects } from './fetchProjects.mjs'

describe('fetch projects', () => {
  it('fetches an array of projects', () => {
    const projects = fetchProjects()

    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThan(0)
  })
})
