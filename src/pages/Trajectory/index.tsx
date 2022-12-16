import React, {useContext, useEffect, useState} from "react";
import {ClassType, CourseType, TrajectoryType} from "../../types";
import Diploma from "../Diploma";
import {useNavigate, useSearchParams} from "react-router-dom";
import {isMobile} from "react-device-detect";
import CourseSelector from "../../components/trajectory/CourseSelector";
import BackButtonContext from "../../Context/BackButton";
import BgContext from "../../Context/Background";
import axios from "axios";
import {BASE_URL} from "../../constants";
import LoadingScreen from "../../components/LoadingScreen";
import * as Scroll from "react-scroll";
import ModalContext from "../../Context/Modal";
import TrajectoryStats from "../../components/trajectory/TrajectoryStats";
import Card from "../../components/trajectory/Card";
import './index.scss'
import {LocalStorageInteraction, withLocalStorage} from "../../utils/general";
import RandomFeedback from "../../components/Modals/feedback/randomFeedback";
import FeedbackGroupIdContext from "../../Context/IdGroup";

// CONSTANTS
const randomFeedbackSelectOptions = [
  'Поиск ключевых слов 🔎️',
  'Добавление/ удаление слов 🗑',
  'Все сложно  🤯', 'Все понятно 👌'
]
// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make a new page

type TrajectoryPropType = {
  somePropWithDefaultOption?: string
}

const TrajectoryDefaultProps = {
  somePropWithDefaultOption: 'default value'
}

const Trajectory = (props: TrajectoryPropType) => {
  const { group_id } = useContext<any>(FeedbackGroupIdContext);
  const [searchParams] = useSearchParams()
  const {displayModal} = useContext(ModalContext)
  const navigate = useNavigate()
  const {setBg} = useContext(BgContext)
  const {setNewBackButtonProps} = useContext(BackButtonContext)
  const [selectorLeftOffset, setSelectorLeftOffset] = useState('0px');
  const [trajectory, setTrajectory] = useState<TrajectoryType | undefined>(undefined);
  const [selectedSphere, setSelectedSphere] = useState<string | undefined>(undefined);

  const courseQuery = +(searchParams.get('course') || '1')

  useEffect(() => {
    const courseNumber = searchParams.get('course')
    let widthOfCourceLabel = 80
    if (isMobile) {
      widthOfCourceLabel = 44
    }
    if (courseNumber === '5') {
      console.log(2)
      setSelectorLeftOffset("calc(100% - 80px)")
    } else
    setSelectorLeftOffset(`${(widthOfCourceLabel * (courseQuery - 1))}px`)
  }, [isMobile, searchParams.get('course')]);

  useEffect(() => {
    setNewBackButtonProps("Все траектории", `trajectories?ids=${withLocalStorage({chosenTrajectoriesIds: []}, LocalStorageInteraction.load).chosenTrajectoriesIds}`)
    getTrajectory()
    setBg('white')
    // setTimeout(() => this.isDisplayTool = true, 1500)

    let scroll = Scroll.animateScroll
    scroll.scrollToTop();

    // const localStore = localStorage.getItem("ModelWindow") + 1
    // localStorage.setItem("ModelWindow", localStore);
    // if (localStore !== 1) {
    //   this.isModalPromptActiv = false
    //   localStorage.setItem("ModelWindow", false);
    // }
  }, [])

  const getTrajectory = () => {
    axios.get(`${BASE_URL}trajectories/${searchParams.get('id')}/`).then((response) => {
      if (response.status === 200) {
        setTrajectory(response.data)
      }
    })
  }
  if (!trajectory) {
    return <LoadingScreen isLoading={true} header={'Траектория загружается'}/>
  }

  const navigateToCourse = (course: number) => {
    if (courseQuery !== course) {
      navigate(`/trajectory?id=${trajectory.id}&course=${course}`)
      if (course === 5) {
        setBg('#F1F2F8')

      } else {
        setBg('white')
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
    displayModal(<TrajectoryStats  className="Desktop"  course={trajectory.courses.find(course => course.course === courseQuery)} />)
  }

  const openDisciplineModal = () => {
    // displayModal(<TrajectoryDisciplineModal/>)
  }

  return (
    <div className="TrajectoryPage">
      <div className="titleNameDiscipline"  style={courseQuery === 5 ? {borderBottom: '2px solid white', backgroundColor:'rgb(241, 242, 248)' } : {borderBottom: '2px solid var(--gray-100)', }}>
        <h5 className="mb-0 StileText" id="scrollToTop">{trajectory.educational_plan}</h5>
        <div className="CoursesRow">
          <CourseSelector
            bgColor={searchParams.get('course') === '5' ? '#FFFFFF' : '#F3F3F8'}
            leftOffset={selectorLeftOffset}
          />
          <div className="CoursesRowFirstFlex">
            {trajectory.courses.map((course) => {
              return (
                <button
                  className={`CourseButton ${course.course === courseQuery ? 'CourseButtonActive' : ''}`}
                  key="number"
                  onClick={() => navigateToCourse(course.course)}
                >
                  <div
                    className={`Course ${course.course === courseQuery ? 'CourseButtonActive' : ''}`}
                  >
                    {course.course} Курс
                  </div>
                </button>
              )
            })}
          </div>
          <button
            className="CourseButtonDiploma"
            onClick={() => navigateToCourse(5)}
          >
            Результат
          </button>
        </div>
      </div>
      {/*<hr className="HeaderDivider"*/}
      {/*    style={courseQuery === 5 ? {backgroundColor: '#FFFFFF'} : {backgroundColor: 'var(--gray-100)'}}/>*/}
      {courseQuery !== 5 &&
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
                className="flex-column flex-block TrajectorySmallHeader mt-3"
                id="!checkMobi() && 'blob-0-top-left'"
                style={{flexGrow: 2}}
              >
                Осенний семестр
              </p>
              <p
                className="flex-column flex-block TrajectorySmallHeader mt-3"
                id="!checkMobi() && 'blob-1-top-left'"
                style={{flexGrow: 2}}
              >
                Весенний семестр
              </p>
            </div>

            {trajectory.courses.find(course => course.course === courseQuery)?.classes.map(sphere => {
              return (
                <Card
                  key={sphere.name}
                  selectSelf={() => selectNewSphere(sphere.name)}
                  sphere={sphere}
                  selectedSphere={selectedSphere}
                  // blockDisclosure="blockDisclosure"
                  // isDisplayStateTool="isDisplayTool"
                />
              )
            })
            }
          </div>
        </div>
      }
      {courseQuery === 5 &&
        <Diploma/>
      }

      {/*   <div className="isModalPromptActiv? '':'ModalNone'">*/}
      {/*       <ModalTooltip*/}
      {/*         v-if="isDisplayTool && +this.$route.query.course !== 5"*/}
      {/*         handelClick="hideTooltip"*/}
      {/*         countOfElement="isFirstTooltip ? [0]  [1]"*/}
      {/*         position="isFirstTooltip ? 'rightTop'  'leftTop'"*/}
      {/*         text="isFirstTooltip ? 'Здесь ты можешь увидеть все предметы 1 семестра )'*/}
      {/*'А тут 2 семестра )'"*/}
      {/*       />*/}
      {/*   </div>*/}
      <RandomFeedback displayForGroup={4} />
      <RandomFeedback displayForGroup={5} />
    </div>
  )
};

Trajectory.defaultProps = TrajectoryDefaultProps

export default Trajectory

