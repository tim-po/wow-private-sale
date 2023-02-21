import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  NavigationItem,
  navigationItemKeys,
  navigationItems,
  NavigationItemStatus,
  Path,
} from './NavigationConfig'
import { LocalStorageInteraction, withLocalStorage } from '../../utils/general'

const useNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
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

  const countUnvisitedStepsBefore = (stepIndex: number) => {
    const stepsBeforeIndex = navigationItemKeys.slice(0, stepIndex)
    const unVisitedStepsBeforeIndex = stepsBeforeIndex.filter(
      item => navigationItems[item].isOptional && !passedOptionalSteps.includes(item),
    )

    return unVisitedStepsBeforeIndex.length
  }

  const getStepStatusAndLayoutIndex = (
    step: NavigationItem,
  ): { status: NavigationItemStatus; index: number } => {
    if (!currentLocation.item) {
      return { status: 'notDisplayed', index: 0 }
    }
    const actualIndex = countVisitedStepsBefore(step.index)
    const currentLocationActualIndex = countVisitedStepsBefore(currentLocation.index)

    if (step.isOptional && !passedOptionalSteps.includes(step.path)) {
      return { status: 'notDisplayed', index: actualIndex }
    }

    const transitionForCurrentLocationIndex = currentLocationActualIndex === 0 ? 0 : 1

    if (step.path === currentLocation.item.path) {
      return {
        status: 'current',
        index:
          actualIndex -
          transitionForCurrentLocationIndex +
          countUnvisitedStepsBefore(step.index),
      }
    }

    if (actualIndex === currentLocationActualIndex - 1) {
      return {
        status: 'last',
        index: actualIndex + countUnvisitedStepsBefore(step.index),
      }
    }
    if (actualIndex < currentLocationActualIndex) {
      return {
        status: 'prev',
        index: actualIndex + countUnvisitedStepsBefore(step.index),
      }
    }

    if (actualIndex === currentLocationActualIndex + 1) {
      return {
        status: 'next',
        index:
          actualIndex -
          1 -
          transitionForCurrentLocationIndex +
          countUnvisitedStepsBefore(step.index),
      }
    }
    if (actualIndex > currentLocationActualIndex) {
      return {
        status: 'further',
        index:
          actualIndex -
          1 -
          transitionForCurrentLocationIndex +
          countUnvisitedStepsBefore(step.index),
      }
    }

    return { status: 'notDisplayed', index: 0 }
  }

  const goBack = () => {
    let backHref = `/${navigationItemKeys[currentLocation.index - 1] as string}`
    switch (currentLocation.item.path) {
      case Path.skills:
        const professionId = withLocalStorage(
          { professionId: null },
          LocalStorageInteraction.load,
        ).professionId
        backHref += `/${professionId}`
        break
      case Path.trajectories:
        if (!passedOptionalSteps.includes(Path.keywords)) {
          backHref = '/skills'
        }
        break
      case Path.trajectory:
        const chosenTrajectoriesIds = withLocalStorage(
          { chosenTrajectoriesIds: [] },
          LocalStorageInteraction.load,
        ).chosenTrajectoriesIds
        backHref += `?ids=${chosenTrajectoriesIds}`
        break
      case Path.trajectoryDiploma:
        backHref += window.location.search.replace('course=5', 'course=4')
        break
    }
    navigate(backHref)
  }

  return {
    currentLocation,
    passedOptionalSteps,
    getStepStatusAndLayoutIndex,
    goBack,
  }
}

export default useNavigation
