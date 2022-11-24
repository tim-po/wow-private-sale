import React from "react";
import './index.scss'
import styled from "styled-components";
import {DiplomaTileWrapper, DiplomaTitle} from "../DiplomaGeneralStyles";

type GenericModalPropType = {
  iconUrl: string;
  title: string;
}

const TextSmall = styled.span`
  font-weight: 500;
  font-size: 12px;
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

const Description = (props: GenericModalPropType) => {
  const {iconUrl, title} = props
  return (
    <DiplomaTileWrapper>
      <DiplomaTitle>{title}</DiplomaTitle>
      <TextSmall>Университет ИТМО, г. Санкт-Петербург</TextSmall>
      <BachelorTitleWrapper>
        <StyledIcon src={iconUrl} alt="icon"/>
        <TextSmall>Бакалавриат</TextSmall>
      </BachelorTitleWrapper>
    </DiplomaTileWrapper>
  )
}

export default Description