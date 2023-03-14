import React from 'react'
import './index.scss'
import { TrajectoryType } from '../../types'
import PercentProgress from '../ui-kit/PercentProgress'
import Chevron, { Turn } from '../../images/icons/chevron'
import {
  LocalStorageInteraction,
  makeAbitUtmFromSlug,
  makeEmptyList,
  withLocalStorage,
} from '../../utils/general'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CourseCard from './CourseCard'

interface ITrajectoryPreview {
  trajectory?: TrajectoryType
}

const TrajectoryPreview = (props: ITrajectoryPreview) => {
  const { trajectory } = props

  const isSkeleton = !trajectory
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const shouldDrawScrollButton = (event: any) => {
    const element = event.target
    if (!element) {
      element.classList.remove('Hidden')
      element.classList.remove('HiddenLeft')
      return
    }

    if (element.scrollLeft + element.clientWidth >= element.scrollWidth - 10) {
      element.classList.add('Hidden')
      return
    }

    if (element.scrollLeft <= 10) {
      element.classList.add('HiddenLeft')
      return
    }

    element.classList.remove('HiddenLeft')
    element.classList.remove('Hidden')
  }

  const trajectoryChosen = (selectedTrajectory: TrajectoryType, course = 1) => {
    withLocalStorage(
      { chosenTrajectoriesIds: searchParams.get('ids') },
      LocalStorageInteraction.save,
    )
    navigate(`/trajectory?id=${selectedTrajectory.id}&course=${course}`)
  }

  const scrollToRight = (event: any) => {
    event.target.parentNode.scrollLeft += Math.min(
      event.target.parentNode.clientWidth,
      460,
    )
  }
  const scrollToLeft = (event: any) => {
    event.target.parentNode.scrollLeft -= Math.min(
      event.target.parentNode.clientWidth,
      460,
    )
  }

  return (
    <div className="TrajectoriesCard mb-3">
      <div className={`TrajectoriesCardHeader ${isSkeleton ? 'MainSkeleton' : ''}`}>
        {!isSkeleton && (
          <>
            <h5
              className="trajectoryHeader mb-0"
              onClick={trajectory && (() => trajectoryChosen(trajectory))}
            >
              {trajectory.educational_plan}
              <span className={'eduDirectionCode'}>
                {trajectory.code.replace(/\.$/, '')}
              </span>
            </h5>
            <div className="d-flex align-items-center TrajectoriesCardProgress">
              {trajectory.is_required ? (
                <div className="recommended">Подходит для профессии</div>
              ) : (
                <>
                  <PercentProgress percent={trajectory.coverage} />
                  {/* <span className="ml-2"> */}
                  {/*   {Math.round(trajectory.coverage * 100)}% совпадений */}
                  {/* </span> */}
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div style={{ position: 'relative' }}>
        <div
          className="pt-3 trajectoryCardWrapper HiddenLeft"
          onScroll={shouldDrawScrollButton}
        >
          {!isSkeleton && (
            <>
              <button className="ScrollBtn Right" onClick={scrollToRight}>
                <Chevron />
              </button>

              <button className="ScrollBtn Left" onClick={scrollToLeft}>
                <Chevron turn={Turn.left} />
              </button>
            </>
          )}

          {!isSkeleton
            ? trajectory.courses.map(course => (
                <CourseCard
                  course={course}
                  key={course.course}
                  onClick={() => trajectoryChosen(trajectory, course.course)}
                />
              ))
            : makeEmptyList(4).map((_i, index) => <CourseCard key={index} />)}
        </div>
      </div>

      <div className="mt-3 justify-content-between">
        <div className="TrajectoriesCardFooter">
          <button
            onClick={trajectory && (() => trajectoryChosen(trajectory))}
            className={`ButtonTrajectory MainButton mr-2 ${
              isSkeleton ? 'MainSkeleton' : ''
            }`}
          >
            Смотреть траекторию
          </button>
          <a
            href={trajectory && makeAbitUtmFromSlug(trajectory.abit_link)}
            target="_blank"
            rel="noreferrer"
            className={`ButtonAbit ${isSkeleton ? 'MainSkeleton' : ''}`}
          >
            Читать больше на abit.itmo.ru
          </a>
        </div>
      </div>
    </div>
  )
}

export default TrajectoryPreview
