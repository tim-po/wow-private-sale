import React from 'react'

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

const IconBag = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.5 5.5C15.4994 4.96974 15.2885 4.46137 14.9136 4.08643C14.5386 3.71148 14.0303 3.50058 13.5 3.5H12V3C11.9996 2.6023 11.8414 2.22101 11.5602 1.9398C11.279 1.65858 10.8977 1.50041 10.5 1.5H5.5C5.1023 1.50041 4.72101 1.65858 4.4398 1.9398C4.15858 2.22101 4.00041 2.6023 4 3V3.5H2.5C1.96974 3.50058 1.46137 3.71148 1.08643 4.08643C0.711479 4.46137 0.500579 4.96974 0.5 5.5V7H15.5V5.5ZM11 3.5H5V3C5 2.86739 5.05268 2.74021 5.14645 2.64645C5.24021 2.55268 5.36739 2.5 5.5 2.5H10.5C10.6326 2.5 10.7598 2.55268 10.8536 2.64645C10.9473 2.74021 11 2.86739 11 3V3.5ZM10.5 8.25C10.5 8.44891 10.421 8.63968 10.2803 8.78033C10.1397 8.92098 9.94891 9 9.75 9H6.25C6.05109 9 5.86032 8.92098 5.71967 8.78033C5.57902 8.63968 5.5 8.44891 5.5 8.25V8.125C5.5 8.09185 5.48683 8.06005 5.46339 8.03661C5.43995 8.01317 5.40815 8 5.375 8H0.5V12.5C0.5 13.0304 0.710714 13.5391 1.08579 13.9142C1.46086 14.2893 1.96957 14.5 2.5 14.5H13.5C14.0304 14.5 14.5391 14.2893 14.9142 13.9142C15.2893 13.5391 15.5 13.0304 15.5 12.5V8H10.625C10.5918 8 10.5601 8.01317 10.5366 8.03661C10.5132 8.06005 10.5 8.09185 10.5 8.125V8.25Z" />
    </svg>
  )
}

export default IconBag
