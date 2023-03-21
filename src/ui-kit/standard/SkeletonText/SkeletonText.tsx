import React from 'react'
import { makeEmptyList } from '../../../utils/general'
import styled from 'styled-components'

const WrapText = styled.div`
  gap: 4px;
  display: flex;
  flex-wrap: wrap;
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
          <div
            key={index}
            className="MainSkeleton"
            style={{
              width: Math.floor(Math.random() * (100 - 30 + 1)) + 30 + 'px',
              height: height ? height : 10,
            }}
          />
        )
      })}
    </WrapText>
  )
}
export default SkeletonText
