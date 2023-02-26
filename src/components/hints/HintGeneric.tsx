import React, { RefObject, useEffect, useState } from 'react'
import Arrow from '../../images/icons/Arrow'
import useWindowDimensions from '../../utils/useWindowDimensions'
type GetPositionType = {
  title: string
  description: string
  isLocalDataHint: boolean | undefined
  setIsLocalDataHint: (isLocalStorage: boolean | undefined) => void
  status: string
  setNumberOpenPage: (numberOpenPage: number) => void
  numberOpenPage: number
  nameRef: string
  boxRef: RefObject<HTMLElement>
  listRef: RefObject<HTMLElement>[]
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
  const { width } = useWindowDimensions()

  function getPosition() {
    if (boxRef.current) {
      const offsetLeft = boxRef.current.getBoundingClientRect().left
      const offsetTop = boxRef.current.getBoundingClientRect().top
      const elementHeight = boxRef.current.getBoundingClientRect().height
      setPositionTop(offsetTop + window.scrollY + elementHeight + 10)
      const left = Math.max(offsetLeft - 240, 0)
      setPositionLeft(left)
      setArrowPosition(offsetLeft - left)
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
          console.log("sss")
          setIsLocalDataHint(false)
      }
    }

    window.addEventListener('keypress', closeEnter)
    return () => window.removeEventListener('keypress', closeEnter)
  })
  useEffect(() => {
    getPosition()
  }, [numberOpenPage, boxRef.current?.getBoundingClientRect().top])

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
        left: (positionLeft || 0) + 16,
        zIndex: nameRef === 'hintSemesterChoice' ? '100000' : '',
      }}
    >
      <div className="positionArrow" style={width < 1000 ? { left: arrowPosition } : {}}>
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
