import React, { useContext, useEffect, useRef, useState } from 'react'
import { TrajectoryType } from '../../types'
import Diploma from '../Diploma'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CourseSelector from '../../components/trajectory/CourseSelector'
import axios from 'axios'
import { BASE_URL } from '../../constants'
import * as Scroll from 'react-scroll'
import ModalContext from '../../Context/Modal'
import TrajectoryStats from '../../components/trajectory/TrajectoryStats'
import Card from '../../components/trajectory/Card'
import './index.scss'
import { makeEmptyList } from '../../utils/general'
import RandomFeedback from '../../components/Modals/feedback/randomFeedback'
import Hints from '../../components/hints'
import { changeBg } from '../../utils/background/background'
import NotFound from '../../components/NotFound'
import useWindowDimensions from '../../utils/useWindowDimensions'

const Trajectory = () => {
  const [searchParams] = useSearchParams()
  const { displayModal } = useContext(ModalContext)
  const navigate = useNavigate()
  const hintSemester = useRef<HTMLDivElement>(null)
  const hintDiscipline = useRef<HTMLDivElement>(null)
  const [selectorLeftOffset, setSelectorLeftOffset] = useState('0px')
  const [trajectory, setTrajectory] = useState<TrajectoryType | undefined>(undefined)
  const [selectedSphere, setSelectedSphere] = useState<string | undefined>(undefined)
  const { width } = useWindowDimensions()
  const [loading, setLoading] = useState(true)
  const [responseError, setResponseError] = useState<number>()

  const stileTextRef = useRef<HTMLDivElement>(null)
  const titleNameDiscipline = useRef<HTMLDivElement>(null)

  const courseQuery = +(searchParams.get('course') || '1')

  const [transferCoursesRow, setTransferCoursesRow] = useState(false)

  const getTrajectory = () => {
    axios
      .get(`${BASE_URL}trajectories/${searchParams.get('id')}/`)
      .then(response => {
        if (response.status === 200) {
          setTrajectory(response.data)
          setLoading(false)
        }
      })
      .catch(e => {
        setResponseError(e.response.status)
      })
  }

  useEffect(() => {
    function adaptiveCourse() {
      const widthTitle = stileTextRef.current?.offsetWidth
      const widthContainer = titleNameDiscipline.current?.offsetWidth

      if (widthContainer && widthTitle) {
        if (widthContainer < widthTitle + 470) {
          setTransferCoursesRow(true)
        } else {
          setTransferCoursesRow(false)
        }
      }
    }

    window.addEventListener('resize', adaptiveCourse)

    return () => {
      window.removeEventListener('resize', adaptiveCourse)
    }
  }, [])

  useEffect(() => {
    const courseNumber = searchParams.get('course')
    let widthOfCourceLabel = 80
    if (width < 1000) {
      widthOfCourceLabel = 44
    }
    if (courseNumber === '5') {
      setSelectorLeftOffset('calc(100% - 80px)')
    } else setSelectorLeftOffset(`${widthOfCourceLabel * (courseQuery - 1)}px`)
  }, [width, searchParams.get('course')])

  useEffect(() => {
    getTrajectory()
    changeBg('var(--bg-color-base)')

    const scroll = Scroll.animateScroll
    scroll.scrollToTop()
  }, [])

  useEffect(() => {
    if (courseQuery === 5) {
      changeBg('#F1F2F8')
    } else {
      changeBg('white')
    }
  }, [courseQuery])

  if (
    courseQuery > 5 ||
    courseQuery < 1 ||
    responseError === 404 ||
    !+(searchParams.get('course') ?? '')
  ) {
    return <NotFound />
  }

  const navigateToCourse = (course: number) => {
    if (courseQuery !== course) {
      if (course === 5) {
        navigate(`/trajectoryDiploma?id=${trajectory?.id}&course=${course}`)
        changeBg('var(--bg-color-invert)')
      } else {
        navigate(`/trajectory?id=${trajectory?.id}&course=${course}`)
        changeBg('var(--bg-color-base)')
      }
    }
  }

  const selectNewSphere = (newSphereName: string) => {
    if (selectedSphere === newSphereName) {
      setSelectedSphere(undefined)
    } else {
      setSelectedSphere(newSphereName)
    }
  }

  const openStatsModal = () => {
    displayModal(
      <TrajectoryStats
        setSelectedSphere={setSelectedSphere}
        className="Desktop"
        course={trajectory?.courses.find(course => course.course === courseQuery)}
      />,
    )
  }

  return (
    <div className="TrajectoryPage">
      <div
        ref={titleNameDiscipline}
        className="titleNameDiscipline"
        style={
          courseQuery === 5
            ? { borderBottom: '2px solid white' }
            : { borderBottom: '2px solid var(--gray-100)' }
        }
      >
        <h5 ref={stileTextRef} className="StileText" id="scrollToTop">
          {/* {trajectory?.educational_plan} */}
          {loading ? (
            <div
              style={{ minWidth: 300, height: 20, borderRadius: 4 }}
              className=" MainSkeleton"
            />
          ) : (
            trajectory?.educational_plan
          )}
        </h5>

        <div style={transferCoursesRow ? { width: '100%' } : {}} className="CoursesRow">
          <CourseSelector
            bgColor={
              searchParams.get('course') === '5'
                ? 'var(--bg-color-base)'
                : 'var(--bg-color-invert)'
            }
            leftOffset={selectorLeftOffset}
          />
          <div className="CoursesRowFirstFlex">
            {trajectory?.courses.map(course => {
              return (
                <button
                  className={`CourseButton ${
                    course.course === courseQuery ? 'CourseButtonActive' : ''
                  }`}
                  key={course.course}
                  onClick={() => navigateToCourse(course.course)}
                >
                  <div
                    className={`Course ${
                      course.course === courseQuery ? 'CourseButtonActive' : ''
                    }`}
                  >
                    {course.course} Курс
                  </div>
                </button>
              )
            })}
          </div>
          <button className="CourseButtonDiploma" onClick={() => navigateToCourse(5)}>
            Итог
          </button>
        </div>
      </div>
      {courseQuery !== 5 && (
        <div className="MainTrajectoryFlex flex-row flex-block">
          <TrajectoryStats
            className="Mobile"
            loading={loading}
            course={trajectory?.courses.find(course => course.course === courseQuery)}
          />
          <div className="MobileBlock">
            {/* {loading && ( */}
              <div className={`mobileBottomWrapper`} id="mobilBottomButton">
                <div className="BottomButtonsCurs">
                  <button className="buttonCourse" onClick={openStatsModal}>
                    Статистика по курсу
                  </button>
                </div>
              </div>
            {/* )} */}

            <div className="flex-row flex-block pl-5 semesterSeason">
              <p
                ref={width < 1000 ? undefined : hintSemester}
                className="flex-column flex-block TrajectorySmallHeader mt-3"
                id="blob-0-top-left"
                style={{ flexGrow: 2 }}
              >
                {loading ? (
                  <div
                    style={{ maxWidth: 106, borderRadius: 4, height: 20 }}
                    className=" MainSkeleton"
                  />
                ) : (
                  <span> Осенний семестр</span>
                )}
              </p>
              <p
                className="flex-column flex-block TrajectorySmallHeader mt-3"
                id="blob-1-top-left"
                style={{ flexGrow: 2 }}
              >
                {loading ? (
                  <div
                    style={{ maxWidth: 106, height: 20, borderRadius: 4 }}
                    className=" MainSkeleton"
                  />
                ) : (
                  <span> Осенний семестр</span>
                )}
              </p>
            </div>
            {loading && (
              <>
                {makeEmptyList(4).map((a, index) => {
                  return (
                    <div key={index} className="TrajectoryCardSkeleton MainSkeleton" />
                  )
                })}
              </>
            )}
            {trajectory?.courses
              .find(course => course.course === courseQuery)
              ?.classes.map((sphere, index) => {
                return (
                  <Card
                    hintDiscipline={index === 0 ? hintDiscipline : undefined}
                    key={sphere.name}
                    hintSemester={index === 0 ? hintSemester : undefined}
                    selectSelf={() => selectNewSphere(sphere.name)}
                    sphere={sphere}
                    setSelectedSphere={setSelectedSphere}
                    selectedSphere={selectedSphere}
                  />
                )
              })}
          </div>
        </div>
      )}
      {courseQuery === 5 && <Diploma />}

      {courseQuery !== 5 && (
        <Hints
          boxRef={[hintSemester, hintDiscipline]}
          pageTitle="trajectoryCard"
          nameRef={['hintSemester', 'hintDiscipline']}
          description={[
            'На каждом курсе ты можешь посмотреть дисциплины осеннего и весеннего семестров обучения.',
            'Нажимай и смотри подробную информацию о каждой дисциплине',
          ]}
          title={['Дисциплины по семестрам', 'Информация о дисциплине']}
        />
      )}
      <RandomFeedback displayForGroup={4} />
      <RandomFeedback displayForGroup={5} />
    </div>
  )
}

export default Trajectory
