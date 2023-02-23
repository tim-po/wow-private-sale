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

const professionSalary = {
  junior: 40000,
  middle: 80000,
  senior: 170000,
}

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
  const sliderLineRef = useRef<HTMLDivElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const filledLineRef = useRef<HTMLDivElement | null>(null)
  const drum = useRef<HTMLDivElement | null>(null)
  const sliderIconsWrapper = useRef<HTMLDivElement | null>(null)

  const currentTypeStartAnimation = isMobile ? 'touchmove' : 'mousemove'
  const currentTypeEndAnimation = isMobile ? 'touchend' : 'mouseup'

  const [currentSalary, setCurrentSalary] = useState(professionSalary.junior)

  let renderTimer: NodeJS.Timer

  const setNewSalaryByPosition = (newPosition: number) => {
    clearInterval(renderTimer)

    let salaryInterval = professionSalary.senior - professionSalary.junior
    let targetSalary = Math.round(newPosition * salaryInterval + professionSalary.junior)
    if (newPosition <= 0.5) {
      salaryInterval = professionSalary.middle - professionSalary.junior
      targetSalary = Math.round(
        2 * newPosition * salaryInterval + professionSalary.junior,
      )
    }

    if (newPosition > 0.5) {
      salaryInterval = professionSalary.senior - professionSalary.middle
      targetSalary = Math.round(
        2 * (newPosition - 0.5) * salaryInterval + professionSalary.middle,
      )
    }

    let newCurrentSalary = 0

    setCurrentSalary(prevState => {
      newCurrentSalary = prevState
      return prevState
    })

    let step = 1
    const salaryDiff = Math.abs(targetSalary - newCurrentSalary)

    if (salaryDiff < 200) {
      step = 1
    }

    if (salaryDiff >= 200 && salaryDiff < 1000) {
      step = 25
    }

    if (salaryDiff >= 1000 && salaryDiff < 10000) {
      step = 125
    }

    if (salaryDiff >= 10000 && salaryDiff < 100000) {
      step = 250
    }

    if (salaryDiff >= 100000) {
      step = 500
    }

    let salaryDir = 0

    if (targetSalary < newCurrentSalary) {
      salaryDir = -1
    } else if (targetSalary > newCurrentSalary) {
      salaryDir = 1
    }

    renderTimer = setInterval(() => {
      let tg = 0
      setCurrentSalary(prevState => {
        tg = prevState + salaryDir * step
        return prevState + salaryDir * step
      })

      if (tg <= targetSalary && salaryDir < 0) {
        setCurrentSalary(targetSalary)
        clearInterval(renderTimer)
      }

      if (tg >= targetSalary && salaryDir > 0) {
        setCurrentSalary(targetSalary)
        clearInterval(renderTimer)
      }

      if (salaryDir === 0) {
        setCurrentSalary(targetSalary)
        clearInterval(renderTimer)
      }
    }, 1)
  }

  const calcPosition = (moveEvent: TouchEvent | MouseEvent, shiftX: number) => {
    if (
      sliderLineRef.current &&
      sliderStarRef.current &&
      tooltipRef.current &&
      drum.current
    ) {
      const currentClientX = detectCurrentEvent(moveEvent).clientX

      let starPosition =
        currentClientX - shiftX - sliderLineRef.current.getBoundingClientRect().left
      if (starPosition < 0) {
        starPosition = 0
      }

      if (starPosition > sliderLineRef.current.offsetWidth) {
        starPosition = sliderLineRef.current.offsetWidth
      }

      const tooltipWidth = tooltipRef.current.offsetWidth - 45
      const tooltipPosition =
        (starPosition / sliderLineRef.current.offsetWidth) * tooltipWidth + 12

      const newDrumOffset =
        (starPosition / sliderLineRef.current.offsetWidth) *
        (drum.current.offsetHeight - 21)

      return {
        starPosition,
        tooltipPosition,
        tooltipWidth,
        newDrumOffset,
      }
    } else {
      return {
        starPosition: 0,
        tooltipPosition: 0,
        tooltipWidth: 0,
        newDrumOffset: 0,
      }
    }
  }

  const setPositions = (
    positions: ReturnType<typeof calcPosition>,
    type: 'up' | 'move',
  ) => {
    if (
      sliderStarRef.current &&
      tooltipRef.current &&
      filledLineRef.current &&
      sliderLineRef.current &&
      drum.current
    ) {
      const { starPosition, tooltipPosition, tooltipWidth, newDrumOffset } = positions

      const startStarPosition = Math.round(
        Math.floor(starPosition / (sliderLineRef.current.offsetWidth / 4)) / 2,
      )

      const transition = (() => {
        switch (type) {
          case 'move':
            return ''
          case 'up':
            return 'all .3s'
        }
      })()

      sliderStarRef.current.style.transition = transition
      filledLineRef.current.style.transition = transition
      tooltipRef.current.style.transition = transition

      if (type === 'move') {
        sliderStarRef.current.style.left =
          (100 * starPosition) / sliderLineRef.current.offsetWidth + '%'

        filledLineRef.current.style.right =
          sliderLineRef.current.offsetWidth - starPosition + 'px'

        tooltipRef.current.style.left = -tooltipPosition + 'px'

        drum.current.style.top = -newDrumOffset + 'px'

        setNewSalaryByPosition(starPosition / sliderLineRef.current.offsetWidth)
      }

      if (type === 'up') {
        sliderStarRef.current.style.left = startStarPosition * 50 + '%'

        setNewSalaryByPosition((startStarPosition * 50) / 100)

        filledLineRef.current.style.right = 100 - startStarPosition * 50 + '%'

        tooltipRef.current.style.left =
          (startStarPosition * -tooltipWidth) / 2 - 12 + 'px'

        drum.current.style.top = -startStarPosition * 15 * 21 + 'px'
      }

      if (sliderIconsWrapper.current && type === 'up') {
        sliderIconsWrapper.current.style.top =
          (-sliderIconsWrapper.current.offsetHeight / 3) * startStarPosition + 'px'
      }
    }
  }

  const sliderAnimation = (event: MouseEvent | TouchEvent) => {
    event.preventDefault()

    if (sliderStarRef.current) {
      // Расстояние между началом звезды и кликом
      const shiftX =
        detectCurrentEvent(event).clientX -
        sliderStarRef.current.getBoundingClientRect().left

      const onMouseMove = (moveEvent: TouchEvent | MouseEvent) => {
        setPositions(calcPosition(moveEvent, shiftX), 'move')
      }

      const onMouseUp = (moveEvent: TouchEvent | MouseEvent) => {
        document.removeEventListener(currentTypeEndAnimation, onMouseUp)
        document.removeEventListener(currentTypeStartAnimation, onMouseMove)

        setPositions(calcPosition(moveEvent, shiftX), 'up')
      }

      document.addEventListener(currentTypeStartAnimation, onMouseMove)
      document.addEventListener(currentTypeEndAnimation, onMouseUp)
    }
  }

  useEffect(() => {
    if (sliderStarRef.current && sliderLineRef.current) {
      sliderLineRef.current.onclick = event => {
        setPositions(calcPosition(event, 0), 'up')
      }

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
      <div className="sliderLineWrapper">
        <div className="sliderLine" ref={sliderLineRef}>
          <div className="sliderLineFill" ref={filledLineRef} />
          <div className="sliderLineStar" ref={sliderStarRef}>
            <div className="tooltipWrapper">
              <div className="tooltipContent" ref={tooltipRef}>
                <span className="tooltipContentText">от</span>
                <div className="drumWrapper">
                  {currentSalary}
                  <div ref={drum} className="drumItem">
                    {/*   {salaryRange(professionSalary).map(degree => ( */}
                    {/*     <div key={degree} className="drumItemText"> */}
                    {/*       {degree} */}
                    {/*     </div> */}
                    {/*   ))} */}
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
