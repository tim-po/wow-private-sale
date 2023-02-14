import React, { useContext, useEffect, useRef, useState } from 'react'
import { TrajectoryType } from '../../types'
import Diploma from '../Diploma'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import CourseSelector from '../../components/trajectory/CourseSelector'
import BackButtonContext from '../../Context/BackButton'
import axios from 'axios'
import { BASE_URL } from '../../constants'
import LoadingScreen from '../../components/LoadingScreen'
import * as Scroll from 'react-scroll'
import ModalContext from '../../Context/Modal'
import TrajectoryStats from '../../components/trajectory/TrajectoryStats'
import Card from '../../components/trajectory/Card'
import './index.scss'
import { LocalStorageInteraction, withLocalStorage } from '../../utils/general'
import RandomFeedback from '../../components/Modals/feedback/randomFeedback'
import Hints from '../../components/hints'
import { changeBg } from '../../utils/background/background'
import NotFound from '../../components/NotFound'

const Trajectory = () => {
  const { group_id } = useContext<any>(FeedbackGroupIdContext)
  const [searchParams] = useSearchParams()
  const { displayModal } = useContext(ModalContext)
  const navigate = useNavigate()
  const hintSemester = useRef<HTMLDivElement>(null)
  const hintDiscipline = useRef<HTMLDivElement>(null)
  const { setNewBackButtonProps } = useContext(BackButtonContext)
  const [selectorLeftOffset, setSelectorLeftOffset] = useState('0px')
  const [trajectory, setTrajectory] = useState<TrajectoryType | undefined>(undefined)
  const [selectedSphere, setSelectedSphere] = useState<string | undefined>(undefined)
  const [isModalTrajectory, setIsModalTrajectory] = useState<boolean>(true)

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
        }
      })
      .catch(e => {
        setResponseError(e.response.status)
      })
  }
  useEffect(()=>{
    function adaptiveCourse(){
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

    window.addEventListener("resize", adaptiveCourse);
    return () => {
      window.removeEventListener("resize", adaptiveCourse);
    };
  })
  useEffect(() => {
    const courseNumber = searchParams.get('course')
    let widthOfCourceLabel = 80
    if (isMobile) {
      widthOfCourceLabel = 44
    }
    if (courseNumber === '5') {
      setSelectorLeftOffset('calc(100% - 80px)')
    } else setSelectorLeftOffset(`${widthOfCourceLabel * (courseQuery - 1)}px`)
  }, [isMobile, searchParams.get('course')])



  useEffect(() => {
    setNewBackButtonProps(
      'Все траектории',
      `trajectories?ids=${
        withLocalStorage({ chosenTrajectoriesIds: [] }, LocalStorageInteraction.load)
          .chosenTrajectoriesIds
      }`,
    )
    getTrajectory()
    changeBg('white')

    const scroll = Scroll.animateScroll
    scroll.scrollToTop()
  }, [])

  if (
    courseQuery > 5 ||
    courseQuery < 1 ||
    responseError === 404 ||
    !+(searchParams.get('course') ?? '')
  ) {
    return <NotFound />
  }

  if (!trajectory) {
    return <LoadingScreen isLoading={true} header={'Траектория загружается'} />
  }

  const navigateToCourse = (course: number) => {
    if (courseQuery !== course) {
      navigate(`/trajectory?id=${trajectory.id}&course=${course}`)
      if (course === 5) {
        changeBg('#F1F2F8')
      } else {
        changeBg('white')
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
        setIsModalTrajectory={setIsModalTrajectory}
        setSelectedSphere={setSelectedSphere}
        className="Desktop"
        course={trajectory.courses.find(course => course.course === courseQuery)}
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
          {trajectory.educational_plan}
        </h5>
        <div style={transferCoursesRow? {width:'100%'}: {} } className="CoursesRow">
          <CourseSelector
            bgColor={searchParams.get('course') === '5' ? '#FFFFFF' : '#F3F3F8'}
            leftOffset={selectorLeftOffset}
          />
          <div className="CoursesRowFirstFlex">
            {trajectory.courses.map(course => {
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
            Результат
          </button>
        </div>
      </div>
      {courseQuery !== 5 && (
        <div className="MainTrajectoryFlex flex-row flex-block">
          <TrajectoryStats
            className="Mobile"
            course={trajectory.courses.find(course => course.course === courseQuery)}
          />
          <div className="MobileBlock">
            <div className={`mobileBottomWrapper`}>
              <div className="BottomButtonsCurs">
                <button className="buttonCourse" onClick={openStatsModal}>
                  Статистика по курсу
                </button>
              </div>
            </div>
            <div className="flex-row flex-block pl-5 semesterSeason">
              <p
                ref={isMobile ? undefined : hintSemester}
                className="flex-column flex-block TrajectorySmallHeader mt-3"
                id="blob-0-top-left"
                style={{ flexGrow: 2 }}
              >
                Осенний семестр
              </p>
              <p
                className="flex-column flex-block TrajectorySmallHeader mt-3"
                id="blob-1-top-left"
                style={{ flexGrow: 2 }}
              >
                Весенний семестр
              </p>
            </div>

            {trajectory.courses
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
