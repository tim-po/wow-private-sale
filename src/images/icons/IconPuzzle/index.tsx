import React from 'react'

import './index.scss'
// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

const IconPuzzle = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={'puzzle'}
        d="M10.7856 14.9999H8.5625C8.41332 14.9999 8.27024 14.9407 8.16475 14.8352C8.05926 14.7297 8 14.5866 8 14.4374V13.5715C8.00042 13.4385 7.97373 13.3068 7.92156 13.1845C7.86939 13.0621 7.79283 12.9517 7.69656 12.8599C7.45344 12.6227 7.10031 12.4912 6.73125 12.5002C6.06375 12.5159 5.5 13.1034 5.5 13.7834V14.4374C5.5 14.5866 5.44074 14.7297 5.33525 14.8352C5.22976 14.9407 5.08668 14.9999 4.9375 14.9999H2.73813C2.50987 14.9999 2.28385 14.955 2.07297 14.8676C1.86209 14.7803 1.67048 14.6522 1.50909 14.4908C1.18312 14.1649 1 13.7228 1 13.2618V11.0624C1 10.9132 1.05926 10.7702 1.16475 10.6647C1.27024 10.5592 1.41332 10.4999 1.5625 10.4999H2.42844C2.71469 10.4999 2.99313 10.3774 3.2125 10.1562C3.33455 10.0332 3.43106 9.88721 3.49649 9.72675C3.56192 9.56628 3.59498 9.39446 3.59375 9.22118C3.58437 8.55899 3.03938 7.99993 2.40344 7.99993H1.5625C1.41332 7.99993 1.27024 7.94066 1.16475 7.83517C1.05926 7.72968 1 7.58661 1 7.43743V5.23805C1 5.0098 1.04496 4.78378 1.13231 4.5729C1.21966 4.36202 1.34769 4.17041 1.50909 4.00901C1.83505 3.68305 2.27715 3.49993 2.73813 3.49993H4.46438C4.53068 3.49993 4.59427 3.47359 4.64115 3.4267C4.68804 3.37982 4.71438 3.31623 4.71438 3.24993V3.04743C4.71437 2.77548 4.76854 2.50626 4.87371 2.25547C4.97888 2.00468 5.13295 1.77735 5.32693 1.58675C5.5209 1.39615 5.7509 1.24609 6.00349 1.14534C6.25609 1.04459 6.52622 0.995154 6.79812 0.999926C7.90719 1.0193 8.80937 1.9493 8.80937 3.07274V3.24993C8.80937 3.31623 8.83571 3.37982 8.8826 3.4267C8.92948 3.47359 8.99307 3.49993 9.05937 3.49993H10.7856C11.0108 3.49993 11.2337 3.54427 11.4417 3.63043C11.6497 3.71658 11.8387 3.84286 11.9979 4.00205C12.1571 4.16125 12.2833 4.35024 12.3695 4.55824C12.4557 4.76624 12.5 4.98917 12.5 5.2143V6.94055C12.5 7.00686 12.5263 7.07044 12.5732 7.11733C12.6201 7.16421 12.6837 7.19055 12.75 7.19055H12.9269C14.07 7.19055 15 8.0968 15 9.21055C15 10.3546 14.0816 11.2856 12.9525 11.2856H12.75C12.6837 11.2856 12.6201 11.3119 12.5732 11.3588C12.5263 11.4057 12.5 11.4692 12.5 11.5356V13.2856C12.5 13.5107 12.4557 13.7336 12.3695 13.9416C12.2833 14.1496 12.1571 14.3386 11.9979 14.4978C11.8387 14.657 11.6497 14.7833 11.4417 14.8694C11.2337 14.9556 11.0108 14.9999 10.7856 14.9999Z"
      />
    </svg>
  )
}

export default IconPuzzle
