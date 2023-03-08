import React, { useEffect, useMemo } from 'react'
import { COLORS_BY_PROFESSION } from '../../../constants'
import { Profession } from '../../../types'
import './index.scss'

// CONSTANTS

// DEFAULT FUNCTIONS

type ProfessionCardPropType = {
  profession: Profession
}

const ProfessionCard = (props: ProfessionCardPropType) => {
  const { profession } = props

  const animateSvg = (svg: Element) => {
    let style: HTMLElement | null = document.getElementById('svgAnimeStyles')
    if (!style) {
      style = document.createElement('style')
      style.setAttribute('type', 'text/css')
      style.setAttribute('id', 'svgAnimeStyles')
    }

    svg.querySelectorAll('.svgAnime').forEach((animatedChild, index) => {
      const classList = animatedChild.classList
      animatedChild.classList.add(`n${index}`)
      const transforms = classList[1].split('+')
      let cssTransform = 'transform: '
      transforms.forEach(transform => {
        cssTransform += ' ' + transform
      })
      cssTransform += ';'

      const css = `.ProfessionCardButton:hover .icon-wrapper-${profession.id} .n${index}{${cssTransform}}`

      if (style) {
        style.appendChild(document.createTextNode(css))
      }
    })
    document.head.appendChild(style)
  }

  useEffect(() => {
    if (profession.id) {
      const div = document.getElementsByClassName(`icon-wrapper-${profession.id}`)[0]
      div.innerHTML = profession.svg
      animateSvg(div)
    }
  })

  const getProfessionColor = () => {
    let currentColor = ''
    Object.keys(COLORS_BY_PROFESSION).forEach(professionColor => {
      if (COLORS_BY_PROFESSION[professionColor].includes(profession.name)) {
        currentColor = professionColor
        return
      }
    })
    return currentColor
  }

  const professionColor = useMemo(getProfessionColor, [profession])

  return (
    <div className="professionCard">
      <div className="cardData">
        <h4 className="professionCardTitle">{profession.name}</h4>
        <div className="professionCardKeywords">
          {profession.visible_keywords
            .sort((word1, word2) => {
              return word1.text.length - word2.text.length
            })
            .map(keyword => {
              return (
                <div
                  key={keyword.id}
                  className="professionCardKeyword"
                  style={{ background: professionColor }}
                >
                  {keyword.text}
                </div>
              )
            })}
        </div>
        <div className="professionCardCategory">{profession.category}</div>
      </div>
      <div className={`icon-wrapper-${profession.id}`} />
    </div>
  )
}

export default ProfessionCard
