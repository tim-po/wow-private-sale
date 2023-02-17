import React, { MouseEventHandler, ReactNode, useEffect, useRef } from 'react'
import cn from './index.module.scss'
import { getBg } from '../../utils/background/background'
import Close from '../../images/icons/close'
// CONSTANTS

// DEFAULT FUNCTIONS

interface IWarningCardProp {
  onCrossClick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  wrapClassName?: string
  contentClassName?: string
}

const WarningCard = ({
  onCrossClick,
  children,
  wrapClassName,
  contentClassName,
}: IWarningCardProp) => {
  const card = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (card.current) {
      const bodyBgColor = getBg()

      if (bodyBgColor === 'var(--bg-color-base)')
        card.current.style.setProperty('--bg-warning-card', 'var(--bg-color-invert)')
      else if (bodyBgColor === 'var(--bg-color-invert)')
        card.current.style.setProperty('--bg-warning-card', 'var(--bg-color-base)')
      else card.current.style.setProperty('--bg-warning-card', 'white')
    }
  }, [card.current])

  return (
    <div ref={card} className={wrapClassName ?? ''}>
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
