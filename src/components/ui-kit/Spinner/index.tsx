import React from 'react'
import './index.scss'
import Spinners from '../../../images/icons/spinners'
import styled, { keyframes } from 'styled-components'

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
  width: number
}

const Spinner = (props: SpinnerPropType) => {
  const { width } = props

  return (
    <SpinnerContainer size={40}>
      <Spinners width={width} height={width} />
    </SpinnerContainer>
  )
}

export default Spinner
