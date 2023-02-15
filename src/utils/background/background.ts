import { Colors } from './ColorTypes'

export const changeBg = (bgColor: Colors) => {
  const regexp = /#[a-f0-9]{6}/gi

  if (bgColor.startsWith('#') && bgColor.length !== 4 && !bgColor.match(regexp)) {
    throw new Error('Wrong HEX cde')
  }

  document.body.style.setProperty('--bg-color', bgColor)
  const metaTheme = document.querySelector('meta[name="theme-color"]')

  if (metaTheme) {
    metaTheme.setAttribute('content', bgColor)
  } else {
    const meta = document.createElement('meta')
    meta.name = 'theme-color'
    meta.setAttribute('content', bgColor)
    document.getElementsByTagName('head')[0].appendChild(meta)
  }
}
