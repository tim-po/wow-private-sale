import React from 'react'
import './index.scss'
import styled, { keyframes } from 'styled-components'
import Spinners from '../../../images/icons/spinners'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const SpinnerContainer = styled.div<{ size: number }>`
  position: absolute;
  top: 40%;
  left: calc(50% - ${({ size = 40 }) => size / 2}px);
  transform-origin: center;
  height: ${({ size = 40 }) => size}px;
  width: ${({ size = 40 }) => size}px;
  animation: ${spin} 1s ease-in-out infinite;
`

type SpinnerPropType = {
  size: number
}

const Spinner = (props: SpinnerPropType) => {
  const { size } = props

  return (
    <SpinnerContainer size={40}>
      <Spinners width={size} height={size} />
    </SpinnerContainer>
  )
}

export default Spinner
