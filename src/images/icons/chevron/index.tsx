import React from 'react'

export enum Turn {
  left = -180,
  right = 0,
  up = -90,
  down = 90,
}

const Chevron = ({
  turn = Turn.right,
  width = Number(6),
  height = Number(12),
  color = '#6E6D79',
}) => {
  const style: React.CSSProperties = {
    transform: `rotate(${turn}deg)`,
    stroke: color,
    pointerEvents: 'none',
  }

  const viewBox =
    width > 6 && height > 12 ? () => `0 0 ${width} ${height}` : () => `0 0 6 12`
  return (
    <svg
      width={width}
      height={height}
      style={style}
      viewBox={viewBox()}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11L5 6L1 1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default Chevron
