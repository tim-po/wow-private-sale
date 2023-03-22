import React from 'react'
import { makeEmptyList } from '../../../utils/general'
import styled from 'styled-components'
import { StyledMainSkeleton } from '../../../stylesheets/StyledVars/StyledSkeleton'
import { randomNumberBetween } from '../../../utils/mathUtils'

const WrapText = styled.div`
  gap: 4px;
  display: flex;
  flex-wrap: wrap;
`
const SkeletonTextStyledDiv = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  ${StyledMainSkeleton};
`

type SkeletonTextPropType = {
  wordCount: number
  height?: number
}
const SkeletonText = (props: SkeletonTextPropType) => {
  const { wordCount, height } = props
  return (
    <WrapText>
      {makeEmptyList(wordCount).map((_, index) => {
        return (
          <SkeletonTextStyledDiv
            key={index}
            width={randomNumberBetween(30, 100, true)}
            height={height ?? 10}
          />
        )
      })}
    </WrapText>
  )
}
export default SkeletonText
