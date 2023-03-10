import React, { useEffect, useRef, useState } from 'react'
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

// const professionSalary = [40000, 80000, 170000]

const detectCurrentEvent = (
  currentEvent: React.MouseEvent | React.TouchEvent,
): { clientX: number } => {
  if (currentEvent.nativeEvent instanceof MouseEvent) {
    return currentEvent.nativeEvent
  } else {
    return currentEvent.nativeEvent.changedTouches[0]
  }
}

// const TOOLTIP_WIDTH = 122
const TWO_THIRDS = 0.666

export type CareerSliderProps = {
  salaries?: number[]
  responsibilities?: string[]
}

const CareerSlider = ({ salaries }: CareerSliderProps) => {
  const sliderStarRef = useRef<HTMLDivElement | null>(null)
  const sliderLineRef = useRef<HTMLDivElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const sliderIconsWrapper = useRef<HTMLDivElement | null>(null)

  const [currentSalary, setCurrentSalary] = useState(0)
  // const [professionSalary, setProfessionSalaries] = use

  const [pointerPositionInPercent, setPointerPositionInPercent] = useState(0)
  const [isMoving, setIsMoving] = useState(false)
  const [isAnimated, setIsAnimated] = useState(true)

  const isSliderActive = salaries && salaries.length === 3

  useEffect(() => {
    if (salaries && salaries.length) setCurrentSalary(salaries[0])
  }, [salaries])
  const sliderStartAnimation = (event: React.MouseEvent | React.TouchEvent) => {
    if (event instanceof MouseEvent) event.preventDefault()

    if (sliderStarRef.current && sliderLineRef.current && isSliderActive) {
      const deltaY =
        detectCurrentEvent(event).clientX -
        sliderLineRef.current.getBoundingClientRect().left

      const newPointerPositionInPercent =
        deltaY / sliderLineRef.current.getBoundingClientRect().width
      setPointerPositionInPercent(newPointerPositionInPercent)

      if (tooltipRef.current) {
        tooltipRef.current.style.transitionProperty = ''
      }

      setIsMoving(true)
      setTimeout(() => {
        setIsAnimated(false)
      }, 200)

      const currentInterval = Math.round(pointerPositionInPercent)
      const minSalary = salaries[currentInterval]
      const maxSalary = salaries[currentInterval + 1]
      const intervalPercentage = newPointerPositionInPercent * 2 - currentInterval
      const salaryDelta = maxSalary - minSalary

      let newSalary = minSalary + Math.floor(salaryDelta * intervalPercentage)

      if (newSalary < minSalary) {
        newSalary = minSalary
      }
      if (newSalary > maxSalary) {
        newSalary = maxSalary
      }

      setCurrentSalary(newSalary)
    }
  }

  const sliderMoveAnimation = (event: React.MouseEvent | React.TouchEvent) => {
    if (event instanceof MouseEvent) event.preventDefault()

    if (sliderStarRef.current && sliderLineRef.current && isMoving && isSliderActive) {
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

      if (tooltipRef.current) {
        tooltipRef.current.style.transitionProperty = ''
      }

      const currentInterval = Math.round(pointerPositionInPercent)
      const minSalary = salaries[currentInterval]
      const maxSalary = salaries[currentInterval + 1]
      const intervalPercentage = newPointerPositionInPercent * 2 - currentInterval
      const salaryDelta = maxSalary - minSalary

      let newSalary = minSalary + Math.floor(salaryDelta * intervalPercentage)

      if (newSalary < minSalary) {
        newSalary = minSalary
      }
      if (newSalary > maxSalary) {
        newSalary = maxSalary
      }

      setCurrentSalary(newSalary)
    }
  }

  const sliderEndAnimation = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault()
    if (
      sliderStarRef.current &&
      sliderLineRef.current &&
      sliderIconsWrapper.current &&
      isSliderActive
    ) {
      const currentInterval = Math.round(pointerPositionInPercent * 2)
      const rubierBandPoint = currentInterval / 2

      sliderIconsWrapper.current.style.top = `${
        -sliderIconsWrapper.current.getBoundingClientRect().height *
        TWO_THIRDS *
        rubierBandPoint
      }px`

      if (tooltipRef.current) {
        tooltipRef.current.style.transitionProperty += 'left'
      }

      setPointerPositionInPercent(rubierBandPoint)
      setCurrentSalary(salaries[currentInterval])
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
        onMouseMove={sliderMoveAnimation}
        onMouseUp={sliderEndAnimation}
        onMouseLeave={sliderEndAnimation}
        onTouchMove={sliderMoveAnimation}
        onTouchEnd={sliderEndAnimation}
        onTouchCancel={sliderEndAnimation}
        ref={sliderLineRef}
      >
        <div
          className="sliderLine"
          onMouseDown={sliderStartAnimation}
          onTouchStart={sliderStartAnimation}
        >
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
                style={
                  tooltipRef.current
                    ? {
                        left:
                          -(tooltipRef.current.offsetWidth - 20 - 21) *
                            pointerPositionInPercent -
                          10,
                      }
                    : { left: '10px' }
                }
                ref={tooltipRef}
              >
                <span>от</span>
                <div
                  className="numberInDrum"
                  key={currentSalary}
                  style={{
                    width: `${currentSalary.toString().length * 10}px`,
                  }}
                >
                  {currentSalary}
                </div>

                <span>руб</span>
              </div>
              <Arrow color={'#323243'} angle={180} />
            </div>
            <SliderStar />
          </div>
        </div>

        {isSliderActive ? (
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
        ) : (
          <div className="disabledLinePointsText">
            <div className="disabledItemFirst">Начальный уровень</div>
            <div className="disabledItemLast">
              Дальнейший заработок будет зависеть от выбранного технологического блока,
              опыта и компании
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CareerSlider