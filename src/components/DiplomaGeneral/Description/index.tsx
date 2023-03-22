import React from 'react'
import './index.scss'
import styled from 'styled-components'

const TextSmall = styled.span`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
`

const BachelorTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`

const StyledIcon = styled.img`
  margin-right: 8px;
  width: 16px;
  height: 16px;
`

const Description = () => {
  return (
    <>
      <TextSmall>Университет ИТМО, г. Санкт-Петербург</TextSmall>
      <BachelorTitleWrapper>
        <StyledIcon src={'/static/star.svg'} alt="icon" />
        <TextSmall>Бакалавриат</TextSmall>
      </BachelorTitleWrapper>
    </>
  )
}

export default Description
