import React, { MouseEventHandler, ReactNode, useEffect, useRef } from 'react'
import cn from './index.module.scss'
import { getBg } from '../../utils/background/background'
import Close from '../../images/icons/close'

const animations = {
  'collapse': {
    show: cn.showNote,
    hide: cn.hideNote,
  },
  'side': {
    show: cn.sideAppearanceAnimation,
    hide: cn.sideAppearanceAnimationNone,
  },
}

interface IWarningCardProp {
  onCrossClick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  wrapClassName?: string
  contentClassName?: string
  animationName: keyof typeof animations
  isAnimated: boolean
}

const WarningCard = ({
  onCrossClick,
  children,
  wrapClassName,
  contentClassName,
  animationName,
  isAnimated,
}: IWarningCardProp) => {
  const card = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (card.current) {
      const bodyBgColor = getBg()

      if (
        bodyBgColor === 'var(--bg-color-base)' ||
        bodyBgColor === 'white' ||
        bodyBgColor?.toUpperCase() === '#FFFFFF'
      )
        card.current.style.setProperty('--bg-warning-card', 'var(--bg-color-invert)')
      else if (bodyBgColor === 'var(--bg-color-invert)')
        card.current.style.setProperty('--bg-warning-card', 'var(--bg-color-base)')
      else card.current.style.setProperty('--bg-warning-card', 'white')
    }
  }, [card.current])

  return (
    <div
      ref={card}
      className={`${wrapClassName ?? ''} ${
        isAnimated ? animations[animationName].show : animations[animationName].hide
      }`}
    >
      <div
        className={
          cn.WarningCard +
          ` ${onCrossClick ? cn.withCross : ''}` +
          ` ${contentClassName ?? ''}`
        }
      >
        {children}
        {onCrossClick && (
          <button onClick={onCrossClick} className={cn.closeBtn}>
            <Close width={10} height={10} />
          </button>
        )}
      </div>
    </div>
  )
}

export default WarningCard
