import React, { useContext, useState } from 'react'
import './index.scss'
import { CountType, CourseType } from '../../../types'
import { hierarchy, pack } from 'd3-hierarchy'
import { allControllTypes, colors } from '../../../constants'
import ControlTypeTile from '../../ui-kit/ControlTypeTile'
import ModalContext from '../../../Context/Modal'
import ControlTypeModal from '../../Modals/ControlTypeModal'
import { scrollToElement } from '../../../utils/scrollToElement'
import { makeAbitUtmFromSlug, makeEmptyList } from '../../../utils/general'
import ApplyAndShareBlock from '../ApplyAndShareBlock'
import useWindowDimensions from '../../../utils/useWindowDimensions'

const skeletonCircles = [
  { D: 120, top: 32, left: 26 },
  { D: 120, top: 12, left: 187 },
  { D: 100, top: 159, left: 12 },
  { D: 140, top: 122, left: 117 },
  { D: 120, top: 165, left: 262 },
  { D: 100, top: 262, left: 68 },
  { D: 100, top: 272, left: 178 },
]
const focusedCircleRadius = 90

type TrajectoryStatsPropType = {
  course?: CourseType
  className: string
  loading?: boolean
  setSelectedSphere?: (value: string) => void
  abitLink?: string
}

const TrajectoryStats = (props: TrajectoryStatsPropType) => {
  const { course, className = 'Mobile', setSelectedSphere, loading, abitLink } = props
  const { width } = useWindowDimensions()

  const [focusedCircleLoading] = useState(false)
  const [focusedCircle, setFocusedCircle] = useState<any>(undefined)
  const [isTooltipActive, setIsTooltipActive] = useState(false)
  const { displayModal, closeModal } = useContext(ModalContext)

  const isFocusedOnCircleOf = (klass: any) => {
    return focusedCircle && focusedCircle.data.name === klass.data.name
  }

  const amount = () => {
    const amountReturn: { name: string; amount: number }[] = []

    if (course !== undefined) {
      course.classes_count.forEach(klass => {
        amountReturn.push({
          name: klass['name'],
          amount: klass['count'],
        })
      })
    }

    return amountReturn
  }

  const transformedClassData = () => {
    return {
      name: 'Top Level',
      children: amount().map(klass => ({
        ...klass,
        size: klass.amount,
        parent: 'Top Level',
      })),
    }
  }

  const getNecessityCount = () => {
    const necessityCount: { [key: string]: number } = { necessary: 0, chosen: 0 }
    if (course) {
      course.necessity_count.forEach(type => {
        necessityCount[type.name] = type.count
      })
    }

    return necessityCount
  }

  const layoutData = () => {
    // Generate a D3 hierarchy
    const rootHierarchy = hierarchy(transformedClassData())
      .sum(d => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return d.size
      })
      .sort((a, b) => {
        return (b.value as number) - (a.value as number)
      })
    return pack().size([400, 400]).padding(8)(rootHierarchy)
  }

  const getCircleTextOf = (klass: any) => {
    if (
      klass.data.name.length < klass.r / 3.2 ||
      (!focusedCircleLoading && isFocusedOnCircleOf(klass)) ||
      klass.r > focusedCircleRadius
    ) {
      return klass.data.name
    }
    return `${klass.data.name.substring(0, klass.r / 4.2)}...`
  }

  const getTransitionOf = (klass: any) => {
    let xTrans = klass.x - klass.r
    let yTrans = klass.y - klass.r

    if (focusedCircle === undefined || focusedCircle.r > focusedCircleRadius) {
      return { x: xTrans, y: yTrans }
    }

    let focusCircleXtrans = focusedCircle.x - focusedCircleRadius
    let focusCircleYtrans = focusedCircle.y - focusedCircleRadius

    if (focusedCircle.x - focusedCircleRadius < 0) {
      focusCircleXtrans = 4
    }
    if (focusedCircle.y - focusedCircleRadius < 0) {
      focusCircleYtrans = 4
    }

    if (focusedCircle.x + focusedCircleRadius > 400) {
      focusCircleXtrans = 400 - focusedCircleRadius * 2
    }
    if (focusedCircle.y + focusedCircleRadius > 400) {
      focusCircleYtrans = 400 - focusedCircleRadius * 2
    }

    if (isFocusedOnCircleOf(klass)) {
      return { x: focusCircleXtrans, y: focusCircleYtrans }
    }

    const rDiff = focusedCircleRadius - focusedCircle.r
    const xDiff = klass.x - focusedCircle.x
    const yDiff = klass.y - focusedCircle.y

    xTrans += ((xDiff / 2) * (rDiff / Math.abs(xDiff)) * Math.sqrt(400 - xDiff)) / 20
    yTrans += ((yDiff / 2) * (rDiff / Math.abs(yDiff)) * Math.sqrt(400 - yDiff)) / 20

    return { x: xTrans, y: yTrans }
  }

  const openNecessaryDisciplinesModal = () => {
    if (course) {
      const necessaryDiscipline: CountType & { disciplines?: string[] } =
        course.necessity_count.filter(discipline => discipline.name === 'necessary')[0]
      displayModal(<ControlTypeModal controlType={necessaryDiscipline} />)
    }
  }

  const openChosenDisciplinesModal = () => {
    if (course) {
      const chosenDiscipline: CountType & { disciplines?: string[] } =
        course.necessity_count.filter(discipline => discipline.name === 'chosen')[0]
      displayModal(<ControlTypeModal controlType={chosenDiscipline} />)
    }
  }

  const onCircleClick = (name: string) => {
    scrollToElement(name)
    if (setSelectedSphere) {
      // setIsModalTrajectory(false)
      setSelectedSphere(name)
      setTimeout(() => {
        closeModal()
      }, 300)
    }
  }

  return (
    <div className={`StatsContainer ${className}`}>
      <div className="MainHeader">
        {' '}
        {loading ? (
          <div
            style={{ width: 131, height: 24, borderRadius: 4 }}
            className="MainSkeleton"
          />
        ) : (
          'Статистика'
        )}
      </div>
      <div className="TrajectoryCard" style={{ padding: 0 }}>
        <div className="StatsCircles">
          {layoutData().children?.map((klass: any) => {
            return (
              <div
                onClick={() => {
                  onCircleClick(klass.data.name)
                }}
                className={`Circle ${
                  focusedCircle && focusedCircle.data.name === klass.data.name
                    ? 'Focused'
                    : ''
                }`}
                key={klass.data.name}
                onMouseEnter={() => {
                  setFocusedCircle(klass)
                }}
                onMouseLeave={() => {
                  if (focusedCircle.data.name === klass.data.name) {
                    setFocusedCircle(undefined)
                  }
                }}
                style={{
                  background: `${
                    isFocusedOnCircleOf(klass) ? colors[klass.data.name] : '#F3F3F4'
                  }`,
                  left: `${getTransitionOf(klass).x}px`,
                  top: `${getTransitionOf(klass).y}px`,
                  width: `${klass.r * 2}px`,
                  height: `${klass.r * 2}px`,
                  minWidth: `${klass.r * 2}px`,
                  minHeight: `${klass.r * 2}px`,
                }}
              >
                <div className="CircleValue">{klass.data.amount}</div>
                <div className="CircleText">{getCircleTextOf(klass)}</div>
              </div>
            )
          })}
          {loading && (
            <div>
              {skeletonCircles.map((item, i) => (
                <div
                  key={i}
                  style={{
                    width: item.D,
                    height: item.D,
                    top: item.top,
                    left: item.left,
                  }}
                  className={'SkeletonCircle MainSkeleton'}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="scroll">
        <div className="rowContent">
          {loading &&
            makeEmptyList(4).map((a, index) => {
              return (
                <div
                  key={index}
                  style={{ minWidth: 94, height: 71, borderRadius: 12 }}
                  className="MainSkeleton"
                />
              )
            })}
          {allControllTypes.map((controlTypeName, index) => {
            if (!course) {
              return null
            }
            return (
              <ControlTypeTile
                key={index}
                additionalClassnames={'hoverTech'}
                controlType={
                  course.control_type_count.find(
                    controlType => controlType.name === controlTypeName,
                  ) || { name: controlTypeName, count: 0 }
                }
              />
            )
          })}
        </div>
      </div>
      <div className="descriptionTypeDisciplines">
        <h6 className="disciplines">
          {loading ? (
            <div
              style={{ minWidth: 131, height: 24, borderRadius: 4 }}
              className="MainSkeleton"
            />
          ) : (
            'Дисциплины'
          )}
        </h6>
        <button
          className="questionСircle"
          onMouseEnter={() => setIsTooltipActive(true)}
          onMouseLeave={() => setIsTooltipActive(false)}
        >
          {isTooltipActive && <div className="Prompt">Учебные предметы</div>}
        </button>
      </div>
      <div className="DisciplinesNecessityCol TrajectoryCard mt-1 marginMobil">
        <button
          className={'DisciplinesNecessityFlex hoverTech'}
          disabled={!getNecessityCount().necessary}
          onClick={openNecessaryDisciplinesModal}
        >
          <span>
            {loading ? (
              <div
                style={{ minWidth: 131, height: 24, borderRadius: 4 }}
                className="MainSkeleton"
              />
            ) : (
              'Обязательные'
            )}
          </span>
          <span>{!loading && getNecessityCount().necessary}</span>
        </button>

        <button
          className={'DisciplinesNecessityFlex hoverTech'}
          disabled={!getNecessityCount().chosen}
          onClick={openChosenDisciplinesModal}
        >
          <span>
            {loading ? (
              <div
                style={{ minWidth: 131, height: 24, borderRadius: 4 }}
                className="MainSkeleton"
              />
            ) : (
              'По выбору'
            )}
          </span>
          <span>{!loading && getNecessityCount().chosen}</span>
        </button>
      </div>

      {width > 1000 && (
        <ApplyAndShareBlock linkAbit={makeAbitUtmFromSlug(abitLink || '')} />
      )}
    </div>
  )
}

export default TrajectoryStats
