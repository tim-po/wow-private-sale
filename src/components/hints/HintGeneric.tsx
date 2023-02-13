import React, { useEffect, useState } from 'react'
import Arrow from '../../images/icons/Arrow'
import { isMobile } from 'react-device-detect'
import {
  LocalStorageInteraction,
  makeEmptyList,
  withLocalStorage,
} from '../../utils/general'
type GetPositionType = {
  title: string
  description: string
  isLocalDataHint: boolean | undefined
  setIsLocalDataHint: (isLocalStorage: boolean | undefined) => void
  status: string
  setNumberOpenPage:(numberOpenPage: number) => void
  numberOpenPage: number
  nameRef: string
  boxRef: React.RefObject<HTMLButtonElement>
  listRef: React.RefObject<HTMLButtonElement>[]
}

const HintGeneric = (props: GetPositionType) => {
  const {
    title,
    description,
    setIsLocalDataHint,
    isLocalDataHint,
    status,
    setNumberOpenPage,
    numberOpenPage,
    nameRef,
    listRef,
    boxRef,
  } = props

  const [positionTop, setPositionTop] = useState<number | undefined>()
  const [positionLeft, setPositionLeft] = useState<number | undefined>()
  const [arrowPosition, setArrowPosition] = useState<number | undefined>()

  function getPosition() {
    if (boxRef.current) {
      const offsetLeft = boxRef.current.getBoundingClientRect().left
      const offsetTop = boxRef.current.getBoundingClientRect().top
      const elementHeight = boxRef.current.getBoundingClientRect().height
      const elementWidth = boxRef.current.getBoundingClientRect().width
      setPositionTop(offsetTop + window.scrollY + elementHeight + 10)
      if (isMobile) {
        setPositionLeft(0)
        setArrowPosition(offsetLeft)
      } else {
        setPositionLeft(offsetLeft - 240)
      }
    }
  }

  useEffect(() => {
    if (nameRef[numberOpenPage]) window.addEventListener('resize', getPosition)
    return () => window.removeEventListener('resize', getPosition)
  })

  useEffect(() => {
    function closeEnter(e: KeyboardEvent) {
      if (e.keyCode === 13) {
        e.preventDefault()
        setIsLocalDataHint(false)
      }
    }

    window.addEventListener('keypress', closeEnter)
    return () => window.removeEventListener('keypress', closeEnter)
  })
  useEffect(() => {
    getPosition()
  }, [
    numberOpenPage,
    boxRef.current?.getBoundingClientRect().top,
    boxRef.current?.getBoundingClientRect().top,
  ])

  useEffect(() => {
    if (isLocalDataHint === false && listRef[numberOpenPage + 1]) {
      setNumberOpenPage(numberOpenPage + 1)
    }
  }, [isLocalDataHint])

  return (
    <div
      className={`wrapHints ${status}`}
      style={{
        position: 'absolute',
        top: positionTop,
        left: positionLeft,
        zIndex: nameRef === 'hintSemesterChoice' ? '100000' : '',
      }}
    >
      <div className="positionArrow" style={isMobile ? { left: arrowPosition } : {}}>
        <Arrow color={'#323243'} />
      </div>
      <span className="title">{title}</span>

      <span className="description">{description}</span>
      <div className="closeHintsWrap">
        <button
          className="closeHints"
          onClick={() => {
            setIsLocalDataHint(false)
          }}
        >
          Круто
        </button>
      </div>
    </div>
  )
}

export default HintGeneric
