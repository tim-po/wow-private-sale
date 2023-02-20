import React, { useEffect, useRef, useState } from 'react'
import SliderStar from 'images/icons/Static/sliderStar'
import './index.scss'
import Arrow from 'images/icons/Arrow'
import CareerJuniorIcon from 'images/icons/Static/careerJuniorIcon'
import CareerMiddleIcon from 'images/icons/Static/careerMiddleIcon'
import CareerSeniorIcon from 'images/icons/Static/careerSeniorIcon'
import { isMobile } from 'react-device-detect'

const professionSalary = {
  junior: 40000,
  middle: 80000,
  senior: 170000,
}

const salaryRange = (salary: typeof professionSalary) => {
  const firstRangeSalary = professionSalary.middle - professionSalary.junior
  const secondRangeSalary = professionSalary.senior - professionSalary.middle

  const firstRangeDelta = Array(15)
    .fill(Math.floor(firstRangeSalary / 15))
    .map((delta, i) => Math.floor(i * delta + professionSalary.junior))

  const secondRangeDelta = Array(15)
    .fill(Math.floor(secondRangeSalary / 15))
    .map((delta, i) => Math.floor(i * delta + professionSalary.middle))

  return [...firstRangeDelta, ...secondRangeDelta, professionSalary.senior]
}

const CareerSlider = () => {
  const sliderStarRef = useRef<HTMLDivElement | null>(null)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const tooltipContentRef = useRef<HTMLDivElement | null>(null)
  const filledLineRef = useRef<HTMLDivElement | null>(null)
  const drum = useRef<HTMLDivElement | null>(null)
  const sliderIconWrapper = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (sliderStarRef.current) {
      sliderStarRef.current.ontouchstart = function (event) {
        if (sliderStarRef.current) {
          event.preventDefault()

          const shiftX =
            event.touches[0].clientX - sliderStarRef.current.getBoundingClientRect().left

          const calcPosition = (moveEvent: TouchEvent) => {
            if (
              sliderRef.current &&
              sliderStarRef.current &&
              tooltipContentRef.current &&
              drum.current
            ) {
              let newLeft =
                moveEvent.touches[0].clientX -
                shiftX -
                sliderRef.current.getBoundingClientRect().left

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
                (newLeft / sliderRef.current.offsetWidth) *
                (drum.current.offsetHeight - 21)

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

          const onMouseMove = (moveEvent: TouchEvent) => {
            const { newLeft, newTooltipArrowPosition, newDrum } = calcPosition(moveEvent)

            if (
              sliderStarRef.current &&
              tooltipContentRef.current &&
              filledLineRef.current &&
              sliderRef.current &&
              drum.current
            ) {
              sliderStarRef.current.style.transition = ''
              filledLineRef.current.style.transition = ''
              sliderStarRef.current.style.left = newLeft + 'px'
              filledLineRef.current.style.right =
                sliderRef.current.offsetWidth - newLeft + 'px'
              tooltipContentRef.current.style.left = -newTooltipArrowPosition + 'px'
              drum.current.style.top = -newDrum + 'px'
            }
          }

          const onMouseUp = (moveEvent: TouchEvent) => {
            document.removeEventListener('touchend', onMouseUp)
            document.removeEventListener('touchmove', onMouseMove)

            const { newLeft, tooltipActiveWidth } = calcPosition(moveEvent)

            if (
              sliderStarRef.current &&
              tooltipContentRef.current &&
              sliderRef.current &&
              filledLineRef.current &&
              drum.current &&
              sliderIconWrapper.current
            ) {
              const startPosition = Math.round(
                Math.floor(newLeft / (sliderRef.current.offsetWidth / 4)) / 2,
              )
              sliderStarRef.current.style.left =
                startPosition * (sliderRef.current.offsetWidth / 2) + 'px'
              sliderStarRef.current.style.transition = 'all .3s'
              filledLineRef.current.style.right =
                sliderRef.current.offsetWidth -
                startPosition * (sliderRef.current.offsetWidth / 2) +
                'px'
              filledLineRef.current.style.transition = 'all .3s'
              tooltipContentRef.current.style.left =
                (startPosition * -tooltipActiveWidth) / 2 - 12 + 'px'
              drum.current.style.top = -startPosition * 15 * 21 + 'px'
              sliderIconWrapper.current.style.left =
                (-sliderIconWrapper.current.offsetWidth / 3) * startPosition + 'px'
              sliderIconWrapper.current.style.transition = 'all .3s'
            }
          }

          document.addEventListener('touchmove', onMouseMove)
          document.addEventListener('touchend', onMouseUp)
        }
      }
    }
  }, [])

  return (
    <div className="sliderWrapper">
      <div className="sliderWrapperIcon">
        <div
          className="sliderWrapperIconItem"
          style={{ position: 'absolute', display: 'flex', left: 0 }}
          ref={sliderIconWrapper}
        >
          <div
            style={{
              width: `${isMobile ? 310 : 220}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CareerJuniorIcon />
          </div>
          <div
            style={{
              width: `${isMobile ? 310 : 220}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CareerMiddleIcon />
          </div>
          <div
            style={{
              width: `${isMobile ? 310 : 220}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CareerSeniorIcon />
          </div>
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
