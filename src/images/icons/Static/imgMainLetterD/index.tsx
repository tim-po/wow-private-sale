import React from 'react'
import { LetterImageProps } from 'types'

const ImgMainLetterD = (props: LetterImageProps) => {
  const { width, height } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.22214 1.03247L8.63307 6.92318M8.63307 6.92318L6.57964 27.4574M8.63307 6.92318C6.26222 7.48012 3.78426 8.12784 1.4834 8.77121M8.63307 6.92318C28.965 4.03047 20.9704 27.0151 1.4834 28.9674"
        stroke="#8533FF"
        strokeWidth="1.71314"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ImgMainLetterD
