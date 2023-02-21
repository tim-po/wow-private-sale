import React from 'react'

import './index.scss'
// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

const IconPath = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={'pathIcon'}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5415 7.64C14.5415 7.64 14.5417 7.64032 14.001 8.00093L14.5415 7.64C14.7407 7.93867 14.6602 8.34256 14.3616 8.54172C14.0629 8.74086 13.6594 8.66024 13.4603 8.36168L13.4575 8.35758L13.4473 8.34239C13.4379 8.32863 13.4237 8.30768 13.4048 8.28015C13.3669 8.22507 13.3103 8.14368 13.237 8.04066C13.0903 7.83451 12.8769 7.5424 12.6124 7.20169C12.0813 6.51752 11.3536 5.64964 10.5529 4.88912C9.73873 4.11582 8.9087 3.51166 8.17629 3.27623C7.82047 3.16185 7.52035 3.1452 7.26705 3.20849C7.0217 3.26979 6.76407 3.41975 6.5076 3.74027C6.25409 4.05708 6.16884 4.33647 6.16565 4.59077C6.1623 4.85738 6.24884 5.15861 6.44291 5.50703C6.84401 6.22711 7.5975 6.97131 8.44772 7.77899C8.50439 7.83283 8.5616 7.88703 8.61917 7.94159C9.3781 8.6607 10.2002 9.43963 10.6775 10.2099C10.9409 10.635 11.1421 11.1212 11.1343 11.6465C11.1262 12.1955 10.8919 12.6942 10.4596 13.1265C9.99701 13.5891 9.4726 13.8678 8.9077 13.9725C8.34951 14.076 7.79389 14.0021 7.27125 13.8286C6.24318 13.4872 5.2539 12.7306 4.41972 11.9365C3.57458 11.132 2.83462 10.2363 2.30922 9.54791C2.0455 9.20235 1.83352 8.90597 1.68691 8.6951C1.61356 8.58961 1.55645 8.50536 1.51728 8.44687C1.4977 8.41762 1.48259 8.3948 1.47217 8.37897L1.46008 8.36053L1.45672 8.35537L1.45572 8.35384C1.45572 8.35384 1.45517 8.353 2.00073 7.99962L1.45572 8.35384C1.26055 8.05254 1.34605 7.64923 1.64735 7.45407C1.9486 7.25894 2.35097 7.34492 2.54618 7.64609L2.54861 7.64983L2.55803 7.6642C2.56664 7.67727 2.57986 7.69725 2.59748 7.72356C2.63273 7.7762 2.68555 7.85415 2.75425 7.95296C2.89174 8.1507 3.09237 8.43128 3.34264 8.75921C3.84524 9.41777 4.53885 10.2551 5.31604 10.9949C6.10418 11.7452 6.92597 12.3441 7.68089 12.5948C8.04974 12.7173 8.37859 12.7485 8.67074 12.6943C8.95618 12.6414 9.24799 12.4997 9.54037 12.2073C9.77476 11.9729 9.83213 11.7841 9.83444 11.6273C9.83711 11.447 9.7674 11.2092 9.5725 10.8947C9.18791 10.2741 8.48384 9.60575 7.67052 8.8337C7.63138 8.79655 7.59198 8.75915 7.55235 8.7215C6.73592 7.94591 5.82277 7.06521 5.30721 6.13964C5.04297 5.66523 4.85867 5.13845 4.86575 4.57446C4.87298 3.99817 5.07939 3.44439 5.49255 2.92805C5.90275 2.41543 6.39514 2.08637 6.95193 1.94726C7.50075 1.81013 8.05486 1.87168 8.57413 2.0386C9.59189 2.36576 10.5954 3.13657 11.4482 3.94654C12.3144 4.76929 13.0869 5.69295 13.6393 6.40452C13.9165 6.76168 14.1407 7.06849 14.2961 7.28678C14.3738 7.39598 14.4345 7.4832 14.476 7.54367C14.4968 7.57391 14.5129 7.59748 14.5239 7.61378L14.5367 7.63272L14.5402 7.63796L14.5415 7.64Z"
      />
      <path
        className={'pathBall'}
        d="M15.5 7.5C15.5 8.60457 14.6046 9.5 13.5 9.5C12.3954 9.5 11.5 8.60457 11.5 7.5C11.5 6.39543 12.3954 5.5 13.5 5.5C14.6046 5.5 15.5 6.39543 15.5 7.5Z"
      />
      <path
        className={'pathBall'}
        d="M3.33407 8.00004C3.33407 8.73642 2.73712 9.33338 2.00074 9.33338C1.26436 9.33338 0.667404 8.73642 0.667404 8.00004C0.667404 7.26366 1.26436 6.66671 2.00074 6.66671C2.73712 6.66671 3.33407 7.26366 3.33407 8.00004Z"
      />
      <path
        className={'pathBall'}
        d="M9.33407 8.00004C9.33407 8.73642 8.73712 9.33338 8.00074 9.33338C7.26436 9.33338 6.6674 8.73642 6.6674 8.00004C6.6674 7.26366 7.26436 6.66671 8.00074 6.66671C8.73712 6.66671 9.33407 7.26366 9.33407 8.00004Z"
      />
    </svg>
  )
}

export default IconPath
