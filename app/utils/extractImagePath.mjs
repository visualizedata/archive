export const extractImagePath = (src) => {
  const $src = src.toLowerCase()

  const match = new RegExp(
    '(?<filePath>.*).(?<ext>(png|jpg|jpeg|gif))$',
    'g'
  ).exec($src)

  const filePath = match.groups['filePath']
  const ext = match.groups['ext']

  if (!filePath || !ext) {
    throw new Error('invalid image path')
  }

  const path = src.replaceAll(`.${ext}`, '')

  return {
    path,
    ext,
  }
}
