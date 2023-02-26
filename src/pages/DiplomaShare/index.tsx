import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL, colors } from '../../constants'
import './index.scss'
import { DiplomaShareDataType, KeywordType } from 'types'
import ModalsContext from 'Context/Modal'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Link from 'components/Link'
import Description from 'components/DiplomaGeneral/Description'
import Keywords from 'components/DiplomaGeneral/Keywords'
import { makeKeywordsArray } from 'utils/makeKeywordsArray'
import Card from 'components/DiplomaGeneral/Card'
import Button from 'components/Button'
import Like from 'images/icons/Static/like'
import DisciplinesModal from 'components/Modals/DisciplinesModal'
import { changeBg } from '../../utils/background/background'
import NotFound from '../../components/NotFound'
import Close from '../../images/icons/close'
import { makeEmptyList } from '../../utils/general'
import { randomNumberBetween } from '../../utils/mathUtils'

const DiplomaShare = () => {
  const { displayModal } = useContext(ModalsContext)
  const [desDiplomaClose, setDesDiplomaClose] = useState(false)
  const [diplomaShareData, setDiplomaShareData] = useState<
    DiplomaShareDataType | undefined
  >(undefined)
  const [keywords, setKeywords] = useState<KeywordType[]>([])
  const [error, setError] = useState<unknown>(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // TODO Как альберт добавит id видоса в ответ на запрос на trajectories/${searchParams.get('id')}/share переделать как в в дипломе
  const [videoId, setVideoId] = useState<string>()

  const getDiplomaShareData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}trajectories/${searchParams.get('id')}/share/`,
      )
      setDiplomaShareData(response.data)

      // TODO к задач выше про сделать как в дипломе
      await axios
        .get(`${BASE_URL}trajectories/${searchParams.get('id')}/diploma/`)
        .then(r => setVideoId(r.data.video_id))
    } catch (e) {
      setError(e)
    }
  }

  const getDeclension = (count: number) => {
    count %= 100
    if (count >= 5 && count <= 20) {
      return 'предметов'
    }
    count %= 10
    if (count === 1) {
      return 'предмет'
    }
    if (count >= 2 && count <= 4) {
      return 'предмета'
    }
    return 'предметов'
  }

  useEffect(() => {
    getDiplomaShareData()
    changeBg('var(--bg-color-invert)')
  }, [])

  useEffect(() => {
    if (diplomaShareData && diplomaShareData.main_keywords.length) {
      const keywordsArray = makeKeywordsArray(diplomaShareData.main_keywords)
      setKeywords(keywordsArray)
    }
  }, [diplomaShareData])

  if (error) {
    return <NotFound />
  }

  return (
    <div className="DiplomaPage">
      <div className="justify-content-between mb-0 align-items-center">
        <h5 className="mb-0 titleShare">
          {diplomaShareData ? (
            <>
              Траектория построена для{' '}
              {searchParams.get('name')
                ? searchParams.get('name')
                : 'анонимного будущего студента'}
            </>
          ) : (
            <div
              style={{ width: 600, height: 20, borderRadius: 8, marginBottom: 12 }}
              className="MainSkeleton"
            />
          )}
        </h5>
        <div></div>
      </div>
      <div className="DiplomaContainerShare">
        <div
          style={{ marginBottom: 0 }}
          className={`wrapDescriptionDiploma ${desDiplomaClose && `close`} 
            `}
        >
          <div className={`descriptionDiploma`}>
            <span>
              Этот образовательный маршрут построен с помощью{' '}
              <a href="/" className="TrackLink">
                ITMO.TRACK
              </a>
              .Ты можешь создать свою траекторию вместе с нами!
            </span>
            <button onClick={() => setDesDiplomaClose(true)}>
              <Close width={8.5} height={8.5} />
            </button>
          </div>
        </div>
        <div className="DiplomaCardShareLeft">
          <Description
            iconUrl={'/static/school.svg'}
            title={diplomaShareData ? diplomaShareData.educational_plan : ''}
            youTubeVideoId={videoId}
          />

          <Keywords
            keywords={keywords}
            keywordsCount={keywords?.length}
            isKeywordsButtonHidden={false}
            keywordSkeletonWidthFunc={() => randomNumberBetween(90, 190, true)}
          />
          <div className={`mobileBottomWrapperShare`} id="mobilBottomButton">
            {/* <div className="row"> */}
            <div className="likeIcon">
              <Like />
            </div>
            <div>
              <div className="mb-2 descriptionDiplomaMobile">
                Этот образовательный маршрут построен с помощью{' '}
                <a href="/" className="TrackLink">
                  ITMO.TRACK
                </a>
                .Ты можешь создать свою траекторию вместе с нами!
              </div>
              <div className="buttons-wrapper-share">
                <Button
                  buttonStyle={'secondary'}
                  onClick={() => navigate('/')}
                  isDisabled={false}
                  classNames={['mobile-button maxWidth']}
                >
                  <span>Хочу так же</span>
                </Button>
                <Link
                  href={
                    diplomaShareData
                      ? diplomaShareData.educational_plan.replace('', '+')
                      : ''
                  }
                >
                  Читать больше на abit.itmo.ru
                </Link>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        <div className="MargTopMobil">
          <div className="DiplomaCard mb-4">
            <div className="d-flex flexColumn DiplomaDisciplinesCard">
              <div className="LineImg" />
              {diplomaShareData?.courses.map(course => (
                <div className="flex-grow-1 mr-3 blockShare" key={course.course}>
                  <p className="TextCenter mobilNone diplomaDisciplinesCount">
                    {course.disciplines_count} {getDeclension(course.disciplines_count)}
                  </p>
                  <p className="CourseLabel">{course.course} курс</p>
                  <div className="d-flexMobil">
                    {course.classes.map(item => (
                      <Card
                        key={item.name}
                        onClick={() =>
                          displayModal(
                            <DisciplinesModal
                              discipline={item.disciplines}
                              course={course.course}
                              headerBg={colors[item.name]}
                              name={item.name}
                            />,
                            { colorCloseWhite: true },
                          )
                        }
                        isDiplomaCard={false}
                        name={item.name}
                        title={item.name}
                        subtitle={String(item.disciplines_count)}
                        classNames={['mobile-card-share']}
                      />
                    ))}
                  </div>
                </div>
              ))}
              {!diplomaShareData &&
                makeEmptyList(4).map((i, number) => (
                  <div
                    key={number}
                    className="flex-grow-1 mr-3 blockShare blockShareSkeleton"
                  >
                    <div className="MainSkeleton titleShareSkeleton " />
                    <div className="MainSkeleton courseShareSkeleton" />
                    <div className="d-flexMobil" style={{ width: '100%' }}>
                      <>
                        {makeEmptyList(6).map((a, index) => {
                          return (
                            <div key={index} className="skeletonCardShare MainSkeleton" />
                          )
                        })}
                      </>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiplomaShare
