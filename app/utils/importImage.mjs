import { extractImagePath } from './extractImagePath.mjs'

export const importImage = async (src) => {
  const { path, ext } = extractImagePath(src)
  switch (ext) {
    case 'jpg': {
      return new URL(`../assets/images/${path}.jpg`, import.meta.url).href
    }
    case 'jpeg': {
      return new URL(`../assets/images/${path}.jpeg`, import.meta.url).href
    }
    case 'png': {
      return new URL(`../assets/images/${path}.png`, import.meta.url).href
    }
    case 'gif': {
      return new URL(`../assets/images/${path}.gif`, import.meta.url).href
    }
    default: {
      throw new Error('invalid image extensions')
    }
  }
}
