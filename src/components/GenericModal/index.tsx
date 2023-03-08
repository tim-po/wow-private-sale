import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import Close from '../../images/icons/close'
import useWindowDimensions from '../../utils/useWindowDimensions'

// CONSTANTS

// DEFAULT FUNCTIONS

export type GenericModalOwnProps = {
  hideMobile: boolean
  hideDesktop: boolean
  onModalClose: () => void
  colorCloseWhite: boolean
  children: React.ReactNode | React.ReactNode[]

  modalIndex: number
  modalCount: number
}

export type OptionalGenericModalProps = Partial<GenericModalOwnProps>

const GenericModal = (props: GenericModalOwnProps) => {
  const {
    hideMobile,
    hideDesktop,
    onModalClose,
    colorCloseWhite,
    children,
    modalCount,
    modalIndex,
  } = props

  const [blockContent, setBlockContent] = useState(false)
  const swapElement = useRef<HTMLDivElement>(null)
  const [cardTranslate, setCardTranslate] = useState<number>(0)
  const [touchStartLocation, setTouchStartLocation] = useState(0)
  const { height } = useWindowDimensions()

  const [allModals, setAllModals] = useState<HTMLElement[]>([])

  const modalClose = () => {
    const topModal = allModals[allModals.length - 2]
    if (topModal) {
      topModal.style.minHeight = ``
      topModal.style.maxHeight = ``
      topModal.style.transform = `scale(1)`
    }

    setBlockContent(false)

    setTimeout(() => {
      onModalClose()
    }, 500)
  }

  const touchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (touchStartLocation === 0) {
      setTouchStartLocation(e.touches[0].clientY)
    } else {
      const deltaY = touchStartLocation - e.touches[0].clientY
      setCardTranslate(Math.min(deltaY, 0))
    }
  }

  const touchEnd = () => {
    setTouchStartLocation(0)
    if (cardTranslate <= -200) {
      modalClose()
    } else {
      setCardTranslate(0)
    }
  }

  useEffect(() => {
    setBlockContent(true)
    setAllModals(
      Array.from(document.querySelectorAll(`[data-modal]`) as NodeListOf<HTMLElement>),
    )

  }, [modalCount])

  useEffect(() => {
    const topModal = allModals[allModals.length - 1]
    const modal = allModals[modalIndex]

    if (!topModal || !modal) {
      return
    }

    if (modalIndex === modalCount - 1) {
      modal.style.minHeight = ``
      modal.style.maxHeight = ``
      modal.style.transform = `scale(1)`
    } else {
      if (topModal.children[1].clientHeight < height - 100) {
        modal.style.minHeight = `${topModal.children[1].clientHeight + 40}px`
        modal.style.maxHeight = `${topModal.children[1].clientHeight + 40}px`
      } else {
        modal.style.minHeight = `${height - 50}px`
        modal.style.maxHeight = `${height - 50}px`
      }
      modal.style.transform = `scale(0.96)`
    }
  }, [allModals])

  return (
    <div
      className={`ModalContainer ${hideMobile ? 'hideMobile' : ''} ${
        hideDesktop ? 'hideDesktop' : ''
      } ${blockContent ? 'active' : ''}`}
    >
      <div className="ModalContainerShad deck" onClick={modalClose} />
      <div className="ModalTrack">
        <div className="ModalContainerShad mobil" onClick={modalClose} />
        <div
          className={`d-block TextCenter ${blockContent ? 'active' : ''} ${
            touchStartLocation != 0 ? 'touched' : ''
          }`}
          data-modal={`index-${modalIndex}`}
          style={{ transform: `translateY(${-cardTranslate * 0.9}px)` }}
        >
          <div
            className={'wrapHeaderModal'}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
          >
            <button className="ImgCloseBtn" onClick={modalClose}>
              <Close
                width={12}
                height={12}
                color={colorCloseWhite ? 'white' : undefined}
              />
            </button>
          </div>
          <div ref={swapElement} className={`modalContainer`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenericModal
