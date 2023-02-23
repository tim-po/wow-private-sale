import React from 'react'
import { LetterImageProps } from 'types'

const ImgMainLetterB = (props: LetterImageProps) => {
  const { width, height } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.0691 2L18.6937 15.7542M18.6937 15.7542L13.8992 63.6994M18.6937 15.7542C13.158 17.0546 7.37227 18.5669 2 20.0691M18.6937 15.7542C43.4363 9.94185 63.1829 8.36397 18.6807 30.8534C16.2056 32.1042 17.0606 35.9773 19.8306 36.1109C94.3007 39.702 40.2156 58.0927 2 67.2251"
        stroke="#8533FF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ImgMainLetterB
