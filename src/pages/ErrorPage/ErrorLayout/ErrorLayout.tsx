import React from 'react'
import styled from 'styled-components'

const StyledErrorWrap = styled.div`
  transition: all 0.3s;
  width: 100%;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  align-items: center;
  padding-top: 88px;


  @media screen and (max-width: 500px) {
    height: auto;
    padding-top: 64px;
  }
`

const StyledTitle = styled.span`
  transition: all 0.3s;
  padding: 0 20px;
  font-weight: 800;
  font-size: 64px;
  line-height: 76px;
  margin-bottom: 16px;
  
  @media screen and (max-width: 500px) {
    font-weight: 800;
    font-size: 44px;
    line-height: 56px;
    margin-bottom: 16px;
  }
`

const StyledSubTitle = styled.span`
  transition: all 0.3s;
  padding: 0 20px;
  text-align: center;
  font-weight: 700;
  font-size: 32px;
  line-height: 36px;
  margin-bottom: 56px;

  @media screen and (max-width: 500px) {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 52px;
  }
`

type ErrorLayoutProps = {
  title?: string
  subtitle?: string
  children?: React.ReactNode
}

const ErrorLayout = ({ title, subtitle, children }: ErrorLayoutProps) => {
  return (
    <StyledErrorWrap>
      {title && <StyledTitle>{title}</StyledTitle>}
      {subtitle && <StyledSubTitle>{subtitle}</StyledSubTitle>}
      {children}
    </StyledErrorWrap>
  )
}

export default ErrorLayout
