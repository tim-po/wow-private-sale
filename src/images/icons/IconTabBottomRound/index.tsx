import React, { CSSProperties } from 'react'

type IconTabBottomRoundProps = {
  style?: CSSProperties
  fill?: string
}

const IconTabBottomRound = ({ style, fill = 'white' }: IconTabBottomRoundProps) => {
  return (
    <svg
      width="4"
      height="6"
      viewBox="0 0 4 6"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path d="M0 6H4V0C3.5 2.5 3 4.5 0 5V6Z" />
    </svg>
  )
}

export default IconTabBottomRound
