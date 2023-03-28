import { css } from 'styled-components'

export const globalStyles = css`
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('../../../public/fonts/Inter-Regular.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('../../../public/fonts/Inter-Medium.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('../../../public/fonts/Inter-SemiBold.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('../../../public/fonts/Inter-Bold.ttf') format('truetype');
  }

  body {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    color: var(--main-color);
  }

  body svg {
    vertical-align: unset;
  }

  button {
    outline: none !important;
    cursor: pointer;
    border: none;
    background: none;
    text-decoration: none;
  }

  a:hover {
    color: var(--color-5-dark)
  }

  a button:hover {
    text-decoration: none;
  }

  html {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 16px;
  }

  .MainButton {
    transition: 0.3s;
    align-self: center;
    background: var(--color-5-dark);
    color: white;
    font-weight: 500;
    border: 0;
    border-radius: 8px;
  }

  .MainButton:hover {
    background: #AE78FE;
    color: white;
  }

  .MainButton:active {
    background: #7328E2;
    color: white;
  }

  .SecondaryButton {
    color: var(--color-5-dark);
    border-radius: 8px;
    background: white;
    border: 1px solid var(--color-5-dark);
    transition: 0.3s;
    font-weight: 500;
  }

  .SecondaryButton:hover {
    background: #F3F3FE;
    color: #AE78FE;
  }

  .SecondaryButton:active {
    background: #F3F3FE;
    color: #7328E2;
  }

  .sticky-header {
    background-color: var(--bg-color);
    transition: var(--bg-transition);
  }

  .fullWidth {
    width: 100vw !important;
    padding-left: 32px;
    transform: translateX(-32px);
    padding-right: 32px;
  }

  .sideAppearanceAnimation {
    z-index: 2;
    position: fixed;
    transition-property: right;
    transition-duration: 0.4s;
    bottom: 32px;
    right: 32px;

    &.sideAppearanceAnimationNone {
      right: -600px;
      overflow: hidden;
      transition-duration: 0.4s;
      transition-property: right;
    }
  }

  @media screen and (max-width: 1000px) {
    .fullWidth {
      /*width: 100vw;*/
      transform: translateX(-16px);
      padding-left: 16px;
      padding-right: 16px;
    }

    .fullWidthMobile {
      transform: translateX(-16px);
      padding-left: 16px;
      padding-right: 16px;
    }
  }

  @media screen and (max-width: 570px) {
    .sideAppearanceAnimation {
      right: 16px;

      &.sideAppearanceAnimationNone {
        right: -100%;
      }
    }
  }
`

export const globalMainSkeletonStyles = css`.MainSkeleton {
  position: relative;
  z-index: 9;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.1) !important;
  background-image: linear-gradient(-45deg, var(--skeleton-base-color) 0, var(--skeleton-base-color) 45%, var(--skeleton-shine-color) 50%, var(--skeleton-base-color) 55%, var(--skeleton-base-color) 100%) !important;
  content: "";
  animation: skeleton-shine 2s infinite;
  background-size: 400% 400% !important;
  backdrop-filter: blur(30px);
  border: none !important;
  pointer-events: none;
  //color: transparent !important;

  &::placeholder {
    opacity: 0;
  }

  &::before {
    opacity: 0;
  }

  &::after {
    opacity: 0;
  }

  div, span, img, video, p, source {
    opacity:0;
  }
}

@keyframes skeleton-shine {
  from {
    background-position: right;
  }

  to {
    background-position: left;
  }
}`
