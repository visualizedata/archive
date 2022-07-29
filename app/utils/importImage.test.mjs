/* eslint-env jest */
///<reference types="@types/jest"/>
import { importImage } from '~/utils/importImage'

describe('import image', () => {
  it('returns image href', async () => {
    const href = await importImage('image.png')

    expect(typeof href).toBe('string')
  })
})
