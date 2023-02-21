import React, { useEffect, useRef } from 'react'
import SliderStar from 'images/icons/Static/sliderStar'
import './index.scss'
import Arrow from 'images/icons/Arrow'
import CareerJuniorIcon from 'images/icons/Static/careerJuniorIcon'
import CareerMiddleIcon from 'images/icons/Static/careerMiddleIcon'
import CareerSeniorIcon from 'images/icons/Static/careerSeniorIcon'
import { isMobile } from 'react-device-detect'

// TODO не уверен, что так можно делать, но работает

// Массив иконок по уровням
const careerIcons: JSX.Element[] = [
  CareerJuniorIcon(),
  CareerMiddleIcon(),
  CareerSeniorIcon(),
]

const professionSalary = {
  junior: 40000,
  middle: 80000,
  senior: 170000,
}

// Функция расчета промежутков по зп
const salaryRange = (salary: typeof professionSalary) => {
  const firstRangeSalary = salary.middle - salary.junior
  const secondRangeSalary = salary.senior - salary.middle

  const firstRangeDelta = Array(15)
    .fill(Math.floor(firstRangeSalary / 15))
    .map((delta, i) => Math.floor(i * delta + salary.junior))

  const secondRangeDelta = Array(15)
    .fill(Math.floor(secondRangeSalary / 15))
    .map((delta, i) => Math.floor(i * delta + salary.middle))

  return [...firstRangeDelta, ...secondRangeDelta, salary.senior]
}

const detectCurrentEvent = (currentEvent: MouseEvent | TouchEvent) => {
  if (currentEvent instanceof MouseEvent) {
    return currentEvent
  } else {
    return currentEvent.changedTouches[0]
  }
}

const CareerSlider = () => {
  const sliderStarRef = useRef<HTMLDivElement | null>(null)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const tooltipContentRef = useRef<HTMLDivElement | null>(null)
  const filledLineRef = useRef<HTMLDivElement | null>(null)
  const drum = useRef<HTMLDivElement | null>(null)
  const sliderIconWrapper = useRef<HTMLDivElement | null>(null)

  const sliderAnimation = (event: MouseEvent | TouchEvent) => {
    const currentTypeStartAnimation = isMobile ? 'touchmove' : 'mousemove'
    const currentTypeEndAnimation = isMobile ? 'touchend' : 'mouseup'

    if (sliderStarRef.current) {
      event.preventDefault()
      const shiftX =
        detectCurrentEvent(event).clientX -
        sliderStarRef.current.getBoundingClientRect().left

      // Рачет позиции для всех движущихся частей

      const calcPosition = (moveEvent: TouchEvent | MouseEvent) => {
        if (
          sliderRef.current &&
          sliderStarRef.current &&
          tooltipContentRef.current &&
          drum.current
        ) {
          const currentClientX = detectCurrentEvent(moveEvent).clientX

          let newLeft =
            currentClientX - shiftX - sliderRef.current.getBoundingClientRect().left
          if (newLeft < 0) {
            newLeft = 0
          }

          if (newLeft > sliderRef.current.offsetWidth) {
            newLeft = sliderRef.current.offsetWidth
          }

          const tooltipActiveWidth = tooltipContentRef.current.offsetWidth - 45
          const newTooltipArrowPosition =
            (newLeft / sliderRef.current.offsetWidth) * tooltipActiveWidth + 12

          const newDrum =
            (newLeft / sliderRef.current.offsetWidth) * (drum.current.offsetHeight - 21)

          return {
            newLeft,
            newTooltipArrowPosition,
            tooltipActiveWidth,
            newDrum,
          }
        } else {
          return {
            newLeft: 0,
            newTooltipArrowPosition: 0,
            tooltipActiveWidth: 0,
            newDrum: 0,
          }
        }
      }

      const onMouseMove = (moveEvent: TouchEvent | MouseEvent) => {
        const { newLeft, newTooltipArrowPosition, newDrum } = calcPosition(moveEvent)

        if (
          sliderStarRef.current &&
          tooltipContentRef.current &&
          filledLineRef.current &&
          sliderRef.current &&
          drum.current
        ) {
          // Сброс анимаций для ползунка и  заполнения
          sliderStarRef.current.style.transition = ''
          filledLineRef.current.style.transition = ''

          // Установка позиции для ползунка, заполнения, стрелочки тултипа и барабана счетчика
          console.log(newLeft / sliderRef.current.offsetWidth)
          sliderStarRef.current.style.left =
            (100 * newLeft) / sliderRef.current.offsetWidth + '%'
          filledLineRef.current.style.right =
            sliderRef.current.offsetWidth - newLeft + 'px'
          tooltipContentRef.current.style.left = -newTooltipArrowPosition + 'px'
          drum.current.style.top = -newDrum + 'px'
        }
      }

      const onMouseUp = (moveEvent: TouchEvent | MouseEvent) => {
        document.removeEventListener(currentTypeEndAnimation, onMouseUp)
        document.removeEventListener(currentTypeStartAnimation, onMouseMove)

        if (
          sliderStarRef.current &&
          tooltipContentRef.current &&
          sliderRef.current &&
          filledLineRef.current &&
          drum.current &&
          sliderIconWrapper.current
        ) {
          const { newLeft, tooltipActiveWidth } = calcPosition(moveEvent)

          // Расчет позиции к которой должен притянутся ползунок после отпускания курсора (0/1/2)
          const startPosition = Math.round(
            Math.floor(newLeft / (sliderRef.current.offsetWidth / 4)) / 2,
          )

          // Стили для ползунка
          sliderStarRef.current.style.left = startPosition * 50 + '%'
          sliderStarRef.current.style.transition = 'all .3s'

          // Стиль для заполнения
          filledLineRef.current.style.right = 100 - startPosition * 50 + '%'
          filledLineRef.current.style.transition = 'all .3s'

          // Стиль для позиции стрелочки тултипа
          tooltipContentRef.current.style.left =
            (startPosition * -tooltipActiveWidth) / 2 - 12 + 'px'

          // Стиль для позиции барабана счетчика
          drum.current.style.top = -startPosition * 15 * 21 + 'px'

          // Стили для иконок
          sliderIconWrapper.current.style.top =
            (-sliderIconWrapper.current.offsetHeight / 3) * startPosition + 'px'
          sliderIconWrapper.current.style.transition = 'all .3s'
        }
      }

      document.addEventListener(currentTypeStartAnimation, onMouseMove)
      document.addEventListener(currentTypeEndAnimation, onMouseUp)
    }
  }

  useEffect(() => {
    if (sliderStarRef.current) {
      if (isMobile) {
        sliderStarRef.current.ontouchstart = sliderAnimation
      }

      if (!isMobile) {
        sliderStarRef.current.onmousedown = sliderAnimation
      }
    }
  }, [isMobile])

  return (
    <div className="sliderWrapper">
      <div className="sliderWrapperIcon">
        <div className="sliderWrapperIconsWrapper" ref={sliderIconWrapper}>
          {careerIcons.map((icon, i) => (
            <div
              className={'IconWrapper'}
              key={i}
              style={{ width: `${isMobile ? 310 : 220}px` }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
      <div className="sliderLineWrapper">
        <div className="sliderLine" ref={sliderRef}>
          <div className="sliderLineFill" ref={filledLineRef} />
          <div className="sliderLineStar" ref={sliderStarRef}>
            <div className="tooltipWrapper">
              <div className="tooltipContent" ref={tooltipContentRef}>
                <span className="tooltipContentText">от</span>
                <div className="drumWrapper">
                  <div ref={drum} className="drumItem">
                    {salaryRange(professionSalary).map(degree => (
                      <div key={degree} className="drumItemText">
                        {degree}
                      </div>
                    ))}
                  </div>
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
