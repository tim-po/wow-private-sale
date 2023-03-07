import React, { useState } from 'react'
import './index.scss'
import Button from 'components/ui-kit/Button'
import { makeEmptyList } from 'utils/general'

const TrajectoryOnboardingModal = () => {
  const [activeStep, setActiveStep] = useState(0)

  const goToNextStep = () => {
    setActiveStep(activeStep + 1)
  }

  return (
    <div className={'ModalWrapper'}>
      {activeStep === 0 && (
        <>
          <img
            src={'/static/FirstStepTrajectoryOnboarding.svg'}
            alt="First Step"
            className={'OnboardingImage'}
          />
          <span className={'Title'}>Дисциплины по семестрам</span>
          <span className={'Subtitle'}>
            На каждом курсе ты можешь посмотреть дисциплины осеннего и весеннего семестров
            обучения.
          </span>
        </>
      )}
      {activeStep === 1 && (
        <>
          <img
            src={'/static/SecondStepTrajectoryOnboarding.svg'}
            alt="Second Step"
            className={'OnboardingImage'}
          />
          <span className={'Title'}>Информация о дисциплине</span>
          <span className={'Subtitle'}>
            Смотри подробную информацию о каждой дисциплине.
          </span>
        </>
      )}
      {activeStep === 2 && (
        <>
          <img
            src={'/static/ThirdStepTrajectoryOnboarding.svg'}
            alt="Third Step"
            className={'OnboardingImage'}
          />
          <span className={'Title'}>Можно посмотреть альтернативу</span>
          <span className={'Subtitle'}>
            Алгоритм ITMO.TRACK построил оптимальную траекторию с самыми подходящими тебе
            дисциплинами. Также ты можешь посмотреть что мы не выбрали для тебя и почему.
          </span>
        </>
      )}
      <div className={'DotsWrapper'}>
        {makeEmptyList(3).map((dot, index) => (
          <div key={index} className={`Dot ${index <= activeStep ? 'Active' : ''}`} />
        ))}
      </div>
      <div className="ButtonsWrapper">
        <Button
          buttonStyle={'secondary'}
          classNames={['Button', 'SkipButton']}
          isDisabled={false}
        >
          Пропустить
        </Button>
        <Button
          buttonStyle={'main'}
          classNames={['Button', 'ContinueButton']}
          onClick={goToNextStep}
          isDisabled={activeStep === 2}
        >
          Продолжить
        </Button>
      </div>
    </div>
  )
}

export default TrajectoryOnboardingModal
