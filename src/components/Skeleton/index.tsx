import React  from 'react'
import { makeEmptyList } from '../../utils/general'
import { KeywordType } from '../../types'
import './index.scss'
type SkeletonsPropType = {
  width: number,
  key: number,
  height: number
}
const Skeleton = (props: SkeletonsPropType) => {
  const { width,key, height } = props

  return(
       <div className="skeleton-v2"
                  style={{
                  'width': width + 'px',
                    'height': height + 'px',
                  }} key={key} />

)
}

export default Skeleton
