import React, { memo } from 'react'
import './index.scss'
import { navigationItems } from '../../../Models/navigation/NavigationConfig'
import useNavigation from '../../../Models/navigation/useNavigation'
import useWindowDimensions from '../../../utils/useWindowDimensions'

interface NavigationStepProps {
  stepPath: string
}

const NavigationStep = (props: NavigationStepProps) => {
  const { stepPath } = props
  const { width } = useWindowDimensions()
  const { goBack, getStepStatusAndLayoutIndex, currentLocation } = useNavigation()

  const stepsOverlapInPx = -20

  const step = navigationItems[stepPath]
  const stepLayoutConfig = getStepStatusAndLayoutIndex(step)

  let translate = stepsOverlapInPx * stepLayoutConfig.index
  let zIndex = 100 - Math.abs(currentLocation.index - step.index)
  const hasIcon = ['last', 'current', 'next'].includes(stepLayoutConfig.status)
  const disabled = !hasIcon

  if (stepLayoutConfig.status === 'notDisplayed') {
    // return null
    zIndex = currentLocation.index - 1
  }

  const onClick = () => {
    if (stepLayoutConfig.status === 'last') {
      goBack()
    }
    return
  }

  if (width < 450) {
    translate = translate * 1.5
  }

  return (
    <button
      key={step.path}
      disabled={disabled}
      className={`NavItem ${stepLayoutConfig.status} ${
        step.isOptional ? 'optional' : ''
      }`}
      onClick={onClick}
      style={{
        transform: `translateX(${translate}px)`,
        zIndex: zIndex,
      }}
    >
      <div className={`Icon ${hasIcon ? 'withIcon' : ''}`}>{<step.icon />}</div>
      <span className={'StepTitle'}>{step.title}</span>
    </button>
  )
}

export default memo(NavigationStep)
