import React from 'react'

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

const IconTie = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.08104 4.52271C6.16224 4.0795 6.5485 3.75758 6.99909 3.75758H8.99909C9.4496 3.75758 9.83581 4.07938 9.9171 4.5225L11.2273 11.6646C11.2921 12.0177 11.1486 12.3768 10.8582 12.5879L8.54802 14.2675C8.22071 14.5055 7.77734 14.5054 7.4501 14.2673L5.14147 12.5878C4.85126 12.3767 4.70781 12.0179 4.77248 11.6649L6.08104 4.52271Z" />
      <path d="M6.22122 2.14142C6.22122 2.58771 6.58301 2.9495 7.0293 2.9495H8.9687C9.41499 2.9495 9.77678 2.58771 9.77678 2.14142C9.77678 1.69513 9.41499 1.33334 8.9687 1.33334H7.0293C6.58301 1.33334 6.22122 1.69513 6.22122 2.14142Z" />
    </svg>
  )
}

export default IconTie
