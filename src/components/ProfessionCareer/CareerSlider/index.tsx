import React, { useRef, useState } from 'react'
import SliderStar from 'images/icons/Static/sliderStar'
import './index.scss'
import Arrow from 'images/icons/Arrow'
import CareerJuniorIcon from 'images/icons/Static/careerJuniorIcon'
import CareerMiddleIcon from 'images/icons/Static/careerMiddleIcon'
import CareerSeniorIcon from 'images/icons/Static/careerSeniorIcon'
import { isMobile } from 'react-device-detect'

const careerIcons: JSX.Element[] = [
  CareerJuniorIcon(),
  CareerMiddleIcon(),
  CareerSeniorIcon(),
]

const professionSalary = [40000, 80000, 170000]

const detectCurrentEvent = (
  currentEvent: React.MouseEvent | React.TouchEvent,
): { clientX: number } => {
  if (currentEvent.nativeEvent instanceof MouseEvent) {
    return currentEvent.nativeEvent
  } else {
    return currentEvent.nativeEvent.changedTouches[0]
  }
}

const TOOLTIP_WIDTH = 122
const TWO_THIRDS = 0.666

const CareerSlider = () => {
  const sliderStarRef = useRef<HTMLDivElement | null>(null)
  const sliderLineRef = useRef<HTMLDivElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const sliderIconsWrapper = useRef<HTMLDivElement | null>(null)

  const [currentSalary, setCurrentSalary] = useState(professionSalary[0])

  const [pointerPositionInPercent, setPointerPositionInPercent] = useState(0)
  const [isMoving, setIsMoving] = useState(false)
  const [isAnimated, setIsAnimated] = useState(true)

  const sliderStartAnimation = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault()
    if (sliderStarRef.current && sliderLineRef.current) {
      const deltaY =
        detectCurrentEvent(event).clientX -
        sliderLineRef.current.getBoundingClientRect().left

      const newPointerPositionInPercent =
        deltaY / sliderLineRef.current.getBoundingClientRect().width
      setPointerPositionInPercent(newPointerPositionInPercent)

      setIsMoving(true)
      setTimeout(() => {
        setIsAnimated(false)
      }, 200)
    }
  }

  const sliderMoveAnimation = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault()

    if (sliderStarRef.current && sliderLineRef.current && isMoving) {
      const deltaY =
        detectCurrentEvent(event).clientX -
        sliderLineRef.current.getBoundingClientRect().left
      const lineWidth = sliderLineRef.current?.getBoundingClientRect().width

      const newPointerPositionInPercent = deltaY / lineWidth

      const newPointerPositionInPercentValidated = Math.min(
        Math.max(newPointerPositionInPercent, 0),
        1,
      )
      setPointerPositionInPercent(newPointerPositionInPercentValidated)

      const currentInterval = Math.round(pointerPositionInPercent / lineWidth)
      const minSalary = professionSalary[currentInterval]
      const maxSalary = professionSalary[currentInterval + 1]
      const intervalPercentage = newPointerPositionInPercent * 2 - currentInterval
      const salaryDelta = maxSalary - minSalary

      setCurrentSalary(minSalary + Math.floor(salaryDelta * intervalPercentage))
    }
  }

  const sliderEndAnimation = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault()
    if (sliderStarRef.current && sliderLineRef.current && sliderIconsWrapper.current) {
      const currentInterval = Math.round(pointerPositionInPercent * 2)
      const rubierBandPoint = currentInterval / 2

      sliderIconsWrapper.current.style.top = `${
        -sliderIconsWrapper.current.getBoundingClientRect().height *
        TWO_THIRDS *
        rubierBandPoint
      }px`

      setPointerPositionInPercent(rubierBandPoint)
      setCurrentSalary(professionSalary[currentInterval])
    }
    setIsAnimated(true)
    setIsMoving(false)
  }

  return (
    <div className="sliderWrapper">
      <div className="sliderWrapperIcon">
        <div className="sliderWrapperIconsWrapper" ref={sliderIconsWrapper}>
          {careerIcons.map((icon, i) => (
            <div
              className={'IconWrapper'}
              key={i}
              style={{ width: `${isMobile ? 260 : 220}px` }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
      <div
        className="sliderLineWrapper"
        onMouseDown={sliderStartAnimation}
        onMouseMove={sliderMoveAnimation}
        onMouseUp={sliderEndAnimation}
        onMouseLeave={sliderEndAnimation}
        onTouchStart={sliderStartAnimation}
        onTouchMove={sliderMoveAnimation}
        onTouchEnd={sliderEndAnimation}
        onTouchCancel={sliderEndAnimation}
        ref={sliderLineRef}
      >
        <div className="sliderLine">
          <div
            className={`sliderLineFill ${!isAnimated ? 'moving' : ''}`}
            style={{ width: `${pointerPositionInPercent * 100}%` }}
          />
          <div
            className={`sliderLineStar ${!isAnimated ? 'moving' : ''}`}
            style={{ left: `${pointerPositionInPercent * 100}%` }}
            ref={sliderStarRef}
          >
            <div className="tooltipWrapper">
              <div
                className="tooltipContent"
                style={{
                  left: -TOOLTIP_WIDTH * 0.6 * pointerPositionInPercent - 10,
                }}
                ref={tooltipRef}
              >
                <span className="tooltipContentText">от</span>
                <div className="drumWrapper">
                  <span className="numberInDrum" key={currentSalary}>
                    {currentSalary}
                  </span>
                  &nbsp;
                </div>
                <span className="tooltipContentText">руб</span>
              </div>
              <Arrow color={'#323243'} angle={180} />
            </div>
            <SliderStar />
          </div>
        </div>
        <div className="linePointsText">
          <div className="pointItemFirst">
            <span className="pointTitle">Junior</span>
            <span className="pointText">опыт 1-2 года</span>
          </div>
          <div className="pointItemSecond">
            <span className="pointTitle">Middle</span>
            <span className="pointText">опыт 2-5 года</span>
          </div>
          <div className="pointItemThird">
            <span className="pointTitle">Senior</span>
            <span className="pointText">опыт от 5 лет</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerSlider
