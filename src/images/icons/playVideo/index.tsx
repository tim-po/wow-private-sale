import React from 'react'
import './index.scss'
// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

const PlayVideoArrow = () => {
  return (
    <svg
      width="24"
      height="28"
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={'playArrow'}
        d="M3.35144 25.9375C2.91973 25.9367 2.49567 25.8235 2.12097 25.6091C1.27722 25.131 0.752686 24.2029 0.752686 23.1953V2.80469C0.752686 1.7943 1.27722 0.868986 2.12097 0.390861C2.50459 0.170387 2.9404 0.0570074 3.38283 0.0625734C3.82527 0.0681394 4.25809 0.192447 4.63605 0.422502L22.063 10.8541C22.4262 11.0818 22.7256 11.398 22.9331 11.7731C23.1407 12.1482 23.2495 12.5699 23.2495 12.9986C23.2495 13.4273 23.1407 13.8489 22.9331 14.224C22.7256 14.5991 22.4262 14.9154 22.063 15.1431L4.63323 25.5775C4.24644 25.8113 3.80341 25.9358 3.35144 25.9375Z"
        fill="white"
      />
    </svg>
  )
}

export default PlayVideoArrow
