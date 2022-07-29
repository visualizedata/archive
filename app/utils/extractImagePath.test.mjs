/* eslint-env jest */
///<reference types="@types/jest"/>
import { extractImagePath } from './extractImagePath.mjs'

describe('extract image path', () => {
  it('removes .png', () => {
    const { path, ext } = extractImagePath('/assets/images/image.png')

    expect(path).toBe('/assets/images/image')
    expect(ext).toBe('png')
  })

  it('throws error if path is invalud', () => {
    expect(() => extractImagePath('foo.bar')).toThrowError()
  })
})
