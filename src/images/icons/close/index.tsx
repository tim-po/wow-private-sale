import React from 'react'
import Cross, { CrossStyle } from '../cross'

const Close = ({ width = Number(14), height = Number(14), color = '#1F1F22' }) => {
  return <Cross width={width} height={height} color={color} state={CrossStyle.close} />
}

export default Close
