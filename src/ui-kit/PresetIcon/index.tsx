import React from 'react'

import biz from '../../images/icons/Static/biz.svg'
import optic from '../../images/icons/Static/optic.svg'
import bio from '../../images/icons/Static/bio.svg'
import art from '../../images/icons/Static/art.svg'
import dev from '../../images/icons/Static/dev.svg'
import science from '../../images/icons/Static/science.svg'
import styled from 'styled-components'

const classes: { [key: string]: { icon: string; color: string } } = {
  'Бизнес': { icon: biz, color: 'var(--color-2)' },
  'Soft Skills': { icon: biz, color: 'var(--color-2)' },
  'Оптика': { icon: optic, color: 'var(--color-1)' },
  'Разработка': { icon: dev, color: 'var(--color-8)' },
  'Наука': { icon: science, color: 'var(--color-7)' },
  'Art & Science': { icon: art, color: 'var(--color-4)' },
  'Биотехнологии': { icon: bio, color: 'var(--color-3)' },
}

const PresetIconWrap = styled.div<{ background: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background: ${props => props.background};
`

type PresetIconPropType = {
  presetClass: string
}

export const PresetIcon = (props: PresetIconPropType) => {
  const { presetClass } = props
  const currentClass = { ...classes[presetClass], name: presetClass }
  return (
    <PresetIconWrap background={currentClass.color}>
      <img src={currentClass.icon} alt={currentClass.name} />
    </PresetIconWrap>
  )
}

export default PresetIcon
