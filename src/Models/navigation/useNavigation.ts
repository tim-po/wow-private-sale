import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  NavigationItem,
  navigationItemKeys,
  navigationItems,
  NavigationItemStatus,
} from './NavigationConfig'
import BackButtonContext from '../../Context/BackButton'
import { LocalStorageInteraction, withLocalStorage } from '../../utils/general'

const useNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { backButtonHref } = useContext(BackButtonContext)
  const currentPathnameStart = location.pathname.split('/')[1]
  const [passedOptionalSteps, setPassedOptionalSteps] = useState<string[]>(
    withLocalStorage({ 'passedOptionalSteps': [] }, LocalStorageInteraction.load)[
      'passedOptionalSteps'
    ],
  )

  const currentLocation = {
    item: navigationItems[currentPathnameStart],
    index: navigationItemKeys.indexOf(currentPathnameStart),
  }

  useEffect(() => {
    if (!currentLocation.item) {
      return
    }
    const newPassedOptionalSteps = [
      ...passedOptionalSteps.filter(
        step => navigationItemKeys.indexOf(step) < currentLocation.index,
      ),
      currentLocation.item.path,
    ]
    setPassedOptionalSteps(newPassedOptionalSteps)
    withLocalStorage(
      { 'passedOptionalSteps': newPassedOptionalSteps },
      LocalStorageInteraction.save,
    )
  }, [currentLocation.item])

  const countVisitedStepsBefore = (stepIndex: number) => {
    const stepsBeforeIndex = navigationItemKeys.slice(0, stepIndex)
    const visitedStepsBeforeIndex = stepsBeforeIndex.filter(
      item =>
        (navigationItems[item].isOptional && passedOptionalSteps.includes(item)) ||
        !navigationItems[item].isOptional,
    )

    return visitedStepsBeforeIndex.length
  }

  const getStepStatusAndLayoutIndex = (
    step: NavigationItem,
  ): { status: NavigationItemStatus; index: number } => {
    const actualIndex = countVisitedStepsBefore(step.index)
    const currentLocationActualIndex = countVisitedStepsBefore(currentLocation.index)

    if (step.isOptional && !passedOptionalSteps.includes(step.path)) {
      return { status: 'notDisplayed', index: currentLocationActualIndex - 1 }
    }

    if (step.path === currentLocation.item.path) {
      return { status: 'current', index: currentLocationActualIndex - 1 }
    }

    if (actualIndex === currentLocationActualIndex - 1) {
      return { status: 'last', index: actualIndex }
    }
    if (actualIndex < currentLocationActualIndex) {
      return { status: 'prev', index: actualIndex }
    }

    if (actualIndex === currentLocationActualIndex + 1) {
      return { status: 'next', index: actualIndex - 2 }
    }
    if (actualIndex > currentLocationActualIndex) {
      return { status: 'further', index: actualIndex - 2 }
    }

    return { status: 'notDisplayed', index: 0 }
  }

  const goBack = () => {
    navigate(backButtonHref)
  }

  return {
    currentLocation,
    passedOptionalSteps,
    getStepStatusAndLayoutIndex,
    goBack,
  }
}

export default useNavigation
