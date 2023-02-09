import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import Close from '../../images/icons/close'
import { isMobile } from 'react-device-detect'

// CONSTANTS

// DEFAULT FUNCTIONS

export type GenericModalOwnProps = {
  hideMobile: boolean
  hideDesktop: boolean
  maxHeight?: boolean
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
    maxHeight,
    onModalClose,
    colorCloseWhite,
    children,
    modalCount,
    modalIndex,
  } = props

  const [blockContent, setBlockContent] = useState(false)
  const [height, setHeight] = useState<number>()
  const swapElement = useRef<HTMLDivElement>(null)
  const [cardHeight, setCardHeight] = useState<number>(0)
  const [deltaY, setDeltaY] = useState(0)
  const [prevMovementY, setPrevMovementY] = useState(0)
  const [isTouched, setIsTouched] = useState(false)

  const touchStart = (e: any) => {
    if (!isTouched) {
      // @ts-ignore
      setCardHeight(swapElement?.current?.offsetHeight)
      setIsTouched(true)
      setPrevMovementY(e.touches[0].clientY)
    }
  }

  const modalClose = () => {
    setBlockContent(false)
    setTimeout(() => {
      // setIsOpen(false)
    }, 400)
    setTimeout(() => {
      onModalClose()
    }, 500)
  }

  const touchMove = (e: any) => {
    if (isTouched) {
      const deltaY = prevMovementY - e.touches[0].clientY
      setDeltaY(deltaY)

      setCardHeight(cardHeight + deltaY)

      if (deltaY >= 150) {
        setCardHeight(window.screen.height - 80)
        setIsTouched(false)
      }

      if (deltaY <= -150) {
        setCardHeight(0)
        setIsTouched(false)
        modalClose()
      }

      setPrevMovementY(e.touches[0].clientY)
    }
  }

  const touchEnd = () => {
    if (isTouched) {
      setIsTouched(false)
      setPrevMovementY(0)

      if (deltaY > 0) {
        setCardHeight(250)
      }

      if (deltaY < 0) {
        setCardHeight(0)
        modalClose()
      }
    }
  }

  useEffect(() => {
    setBlockContent(true)
    const allModals = Array.from(
      document.querySelectorAll(`[data-modal]`) as NodeListOf<HTMLElement>,
    )
    const topModal = allModals[allModals.length - 1]
    const modal = allModals[modalIndex]

    if (modalIndex === modalCount - 1) {
      modal.style.minHeight = ``
      modal.style.maxHeight = ``
    } else {
      if (topModal.children[1].clientHeight > -80)
        modal.style.minHeight = `${topModal.children[1].clientHeight + 20}px`
      modal.style.maxHeight = `${topModal.children[1].clientHeight + 20}px`
    }
  }, [modalCount])

  return (
    <div
      className={`ModalContainer ${hideMobile ? 'hideMobile' : ''} ${
        hideDesktop ? 'hideDesktop' : ''
      } active`}
    >
      <div className="ModalContainerShad deck" onClick={modalClose} />
      <div className="ModalTrack">
        <div className="ModalContainerShad mobil" onClick={modalClose} />
        <div
          className={`d-block TextCenter ${blockContent ? 'active' : ''}`}
          data-modal={`index-${modalIndex}`}
          // style={isAnimationModal()}
        >
          <div
            className={'wrapHeaderModal'}
            onTouchStart={touchStart}
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
