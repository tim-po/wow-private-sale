import React from 'react'
import './index.scss'

// CONSTANTS

// DEFAULT FUNCTIONS

type CourseSelectorPropType = {
  // You should declare props like this, delete this if you don't need props
  leftOffset: string
  bgColor: string
}

const CourseSelector = (props: CourseSelectorPropType) => {
  const { leftOffset, bgColor } = props
  return (
    <div className="CourseSelector" style={{ 'left': leftOffset }}>
      <svg
        width="80"
        height="42"
        viewBox="0 0 80 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M68 0H12C7.58172 0 4 3.58172 4 8V37C4 39.2091 2.20914 41 0 41V42H4H76H80V41C77.7909 41 76 39.2091 76 37V8C76 3.58172 72.4183 0 68 0Z"
          fill={bgColor}
        />
      </svg>
    </div>
  )
}

export default CourseSelector
