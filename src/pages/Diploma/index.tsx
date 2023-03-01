import React, { useContext, useEffect, useState } from 'react'
import './index.scss'
import Description from 'components/DiplomaGeneral/Description'
import Keywords from 'components/DiplomaGeneral/Keywords'
import axios from 'axios'
import { BASE_URL, colors } from '../../constants'
import { makeKeywordsArray } from 'utils/makeKeywordsArray'
import { CountType, DiplomaDataType, KeywordType } from 'types'
import ModalsContext from 'Context/Modal'
import Card from 'components/DiplomaGeneral/Card'
import ShareModal from 'components/Modals/ShareModal'
import Button from 'components/Button'
import { useSearchParams } from 'react-router-dom'
import ControlTypeModal from '../../components/Modals/ControlTypeModal'
import DisciplinesModal from '../../components/Modals/DisciplinesModal'
import Share from '../../images/icons/share'
import RandomFeedback from '../../components/Modals/feedback/randomFeedback'
import FeedbackGroupIdContext from '../../Context/IdGroup'
import { refactorName } from '../../components/refactorName'
import { changeBg } from '../../utils/background/background'
import Close from '../../images/icons/close'
import { makeAbitUtmFromlSlug, makeEmptyList } from '../../utils/general'
import { randomNumberBetween } from '../../utils/mathUtils'

const Diploma = () => {
  const { displayModal } = useContext(ModalsContext)

  const [diplomaData, setDiplomaData] = useState<DiplomaDataType | undefined>(undefined)
  const [keywords, setKeywords] = useState<KeywordType[]>([])
  const [linkAbit, setLinkAbit] = useState('https://abit.itmo.ru/programs/bachelor')
  const { groupId } = useContext(FeedbackGroupIdContext)
  const [desDiplomaClose, setDesDiplomaClose] = useState(false)
  const [searchParams] = useSearchParams()
  const getDiplomaData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}trajectories/${searchParams.get('id')}/diploma/`,
      )
      setDiplomaData(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    changeBg('var(--bg-color-invert)')
    getDiplomaData()
  }, [])

  useEffect(() => {
    if (diplomaData && diplomaData.main_keywords.length) {
      const keywordsArray = makeKeywordsArray(diplomaData.main_keywords)
      setKeywords(keywordsArray)
      setLinkAbit(makeAbitUtmFromlSlug(diplomaData.abit_link))
    }
  }, [diplomaData])

  return (
    <>
      <div className="diploma-container">
        <div
          className={`wrapDescriptionDiploma ${desDiplomaClose && `close`} 
            `}
        >
          <div className={'descriptionDiploma'}>
            <span>
              Это твоя траектория в Университете ИТМО! Поступай к нам чтобы изучать то,
              что нравится.
            </span>
            <button onClick={() => setDesDiplomaClose(true)}>
              <Close width={8.5} height={8.5} />
            </button>
          </div>
        </div>
        <div className="tiles-wrapper">
          <div className="left-tiles">
            <Description
              iconUrl={'/static/star.svg'}
              title={'Высшее образование'}
              youTubeVideoId={diplomaData?.video_id ?? null}
            />
            <Keywords
              keywords={keywords}
              keywordsCount={keywords?.length}
              isKeywordsButtonHidden
              keywordSkeletonWidthFunc={() => randomNumberBetween(90, 190, true)}
            />
            <div className={`mobileBottomWrapper`} id="mobilBottomButton">
              <span className="marginText descriptionDiplomaMobile">
                Это твоя траектория в университете ИТМО!
                <br />
                Поступай к нам чтобы изучать то, что нравится.
              </span>
              <div className="buttons-wrapper">
                <Button
                  buttonStyle={'main'}
                  isDisabled={false}
                  onClick={() =>
                    setTimeout(() => {
                      window.open(linkAbit, '_blank')
                    })
                  }
                  classNames={['mobile-button maxWidth']}
                >
                  <span className={'button-text'}>Поступить в ИТМО</span>
                </Button>
                <Button
                  buttonStyle={'secondary'}
                  onClick={() => displayModal(<ShareModal />)}
                  isDisabled={false}
                  classNames={['mobile-button']}
                >
                  <span className={'button-text share'}>Поделиться</span>
                  <div className="share-button-content">
                    <div className={'share-icon'}>
                      <Share />
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          <div className="right-tiles">
            <div className="white-tile-wrapper disciplines-tile">
              {diplomaData?.total_disciplines ? (
                <h6 className="tileHeader">
                  Изучу {diplomaData?.total_disciplines} дисциплины
                </h6>
              ) : (
                <div
                  style={{ width: 200, height: 20, borderRadius: 8, marginBottom: 12 }}
                  className="MainSkeleton"
                />
              )}
              <div className="disciplines-wrapper">
                {!diplomaData?.classes_count && (
                  <>
                    {makeEmptyList(9).map((a, index) => {
                      return <div key={index} className="skeletonCard MainSkeleton" />
                    })}
                  </>
                )}
                {diplomaData?.classes_count.map(discipline => (
                  <Card
                    onClick={() =>
                      displayModal(
                        <DisciplinesModal
                          discipline={discipline.disciplines}
                          headerBg={colors[discipline.name]}
                          name={discipline.name}
                        />,
                        { colorCloseWhite: true },
                      )
                    }
                    key={discipline.name}
                    name={discipline.name}
                    title={discipline.count}
                    subtitle={discipline.name}
                    isDiplomaCard
                    classNames={['mobile-card']}
                  />
                ))}
              </div>
            </div>
            <div className="white-tile-wrapper control-types-tile">
              {diplomaData?.control_types_count ? (
                <h6 className="tileHeader">Сдам</h6>
              ) : (
                <div
                  style={{ width: 50, height: 20, borderRadius: 8, marginBottom: 12 }}
                  className="MainSkeleton"
                />
              )}
              <div className="control-types-wrapper">
                {!diplomaData?.control_types_count && (
                  <>
                    {makeEmptyList(4).map((a, index) => {
                      return <div key={index} className="skeletonCard MainSkeleton" />
                    })}
                  </>
                )}
                {diplomaData?.control_types_count.map(
                  (controlType: CountType & { disciplines: CountType[] }) => (
                    <Card
                      onClick={() =>
                        displayModal(<ControlTypeModal controlType={controlType} />)
                      }
                      key={controlType.name}
                      name={controlType.name}
                      title={controlType.count}
                      subtitle={refactorName(controlType.count, controlType.name)}
                      isDiplomaCard
                      isControlTypeCard
                      classNames={['mobile-card', 'control-type-card-mobile']}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
        <RandomFeedback displayForGroup={6} />
        <RandomFeedback displayForGroup={7} />
      </div>
    </>
  )
}

export default Diploma
