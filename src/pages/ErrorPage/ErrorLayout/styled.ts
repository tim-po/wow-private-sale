import styled, { css } from 'styled-components'

export const StyledButtonsGrid = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
  gap: 10px 17px ;
  justify-content: center;
  margin-bottom: 82px;


  @media screen and (max-width: 500px) {
    margin-bottom: 82px;
    flex-wrap: wrap;
    padding: 0 20px;
  }
`

export const styledBigButton = css`
  width: 180px;
  height: 60px;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  @media screen and (max-width: 500px) {
    width: 120px;
    height: 40px;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
  }
`
