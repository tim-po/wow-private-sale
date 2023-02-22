import React, { useContext, useEffect, useRef, useState } from 'react'
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
import SwapModal from 'components/Modals/SwapModal'
import ControlTypeModal from '../../components/Modals/ControlTypeModal'
import DisciplinesModal from '../../components/Modals/DisciplinesModal'
import Share from '../../images/icons/share'
import RandomFeedback from '../../components/Modals/feedback/randomFeedback'
import FeedbackGroupIdContext from '../../Context/IdGroup'
import { refactorName } from '../../components/refactorName'
import { changeBg } from '../../utils/background/background'

const Diploma = () => {
  const { displayModal } = useContext(ModalsContext)

  const cardRef = useRef<HTMLDivElement>(null)

  const [diplomaData, setDiplomaData] = useState<DiplomaDataType | undefined>(undefined)
  const [keywords, setKeywords] = useState<KeywordType[]>([])
  const [linkAbit, setLinkAbit] = useState('https://abit.itmo.ru/programs/bachelor')
  const { groupId } = useContext(FeedbackGroupIdContext)

  const [searchParams] = useSearchParams()

  const getDiplomaData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}trajectories/${searchParams.get('id')}/diploma/`,
      )
      setDiplomaData(response.data)
      console.log(response.data)
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
      setLinkAbit(
        `https://abit.itmo.ru/programs/bachelor?title=${diplomaData?.educational_plan.replace(
          '',
          '+',
        )}`,
      )
    }
  }, [diplomaData])

  return (
    <>
      <div className="diploma-container">
        <div className="tiles-wrapper">
          <div className="left-tiles">
            <Description
              iconUrl={'/static/star.svg'}
              title={'Высшее образование'}
              youTubeVideoId={diplomaData?.video_id}
            />
            <Keywords
              keywords={keywords}
              keywordsCount={keywords?.length}
              isKeywordsButtonHidden
            />
            <SwapModal
              modalHeight={250}
              elementRef={cardRef}
              classes={['white-tile-wrapper']}
            >
              <span className="marginText">
                Это твоя траектория в университете ИТМО!
                <br />
                Поступай к нам чтобы изучать то, что нравится.
              </span>
              <div className="buttons-wrapper">
                <Button
                  buttonStyle={'main'}
                  isDisabled={false}
                  // onClick={window.open(`https://abit.itmo.ru/en/programs/bachelor?title=${diplomaData?.educational_plan.replace('', '+')}`, '_blank')}
                  onClick={() =>
                    setTimeout(() => {
                      window.open(linkAbit, '_blank')
                    })
                  }
                  classNames={['mobile-button']}
                >
                  <span className={'button-text'}>Поступить в ИТМО</span>
                </Button>
                <Button
                  buttonStyle={'secondary'}
                  onClick={() => displayModal(<ShareModal />)}
                  isDisabled={false}
                  classNames={['mobile-button']}
                >
                  <div className="share-button-content">
                    <span className={'button-text'}>Поделиться</span>
                    <div className={'share-icon'}>
                      <Share />
                    </div>
                  </div>
                </Button>
              </div>
            </SwapModal>
          </div>
          <div className="right-tiles">
            <div className="white-tile-wrapper disciplines-tile">
              <h6 className="tileHeader">
                Изучу {diplomaData?.total_disciplines} дисциплины
              </h6>
              <div className="disciplines-wrapper">
                {diplomaData?.classes_count.map(discipline => (
                  <Card
                    onClick={() =>
                      displayModal(
                        <DisciplinesModal
                          discipline={discipline.disciplines}
                          headerBg={colors[discipline.name]}
                          name={discipline.name}
                        />,
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
              <h6 className="tileHeader">Сдам</h6>
              <div className="control-types-wrapper">
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
