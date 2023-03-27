import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderContext from '../../Context/Header'
import { BASE_URL } from '../../constants'
import axios from 'axios'
import { Profession } from '../../types'
import './index.scss'
import {
  LocalStorageInteraction,
  makeEmptyList,
  withLocalStorage,
} from '../../utils/general'
import FeedbackStatic from '../../components/Modals/feedback/feedbackStatic'
import { updateStickyBlocks } from '../../utils/stickyHeaders'
import { changeBg } from '../../utils/background/background'
import ModalContext from '../../Context/Modal'
import * as Scroll from 'react-scroll'
import WarningCard from '../../components/WarningCard'
import ProfessionCard from '../../components/ProfessionCard'

const Professions = () => {
  const { setIsHeaderAnimated } = useContext(HeaderContext)
  const navigate = useNavigate()
  const [professionsWithCustomSvg, setProfessionsWithCustomSvg] = useState<Profession[]>(
    [],
  )
  const [isProfessionsLoading, setIsProfessionsLoading] = useState(true)
  const [isFeedbackPopupVisible, setIsFeedbackPopupVisible] = useState(false)

  const [professions, setProfessions] = useState<Profession[] | undefined>(undefined)

  const { displayModal } = useContext(ModalContext)
  const professionChosen = (profession: Profession) => {
    setIsHeaderAnimated(true)
    withLocalStorage({ selectedPresetIds: [] }, LocalStorageInteraction.save)
    withLocalStorage({ addedKeywords: [] }, LocalStorageInteraction.save)

    navigate(`/profession/${profession.id}`)
  }

  const openFeedbackStatic = () => {
    displayModal(
      <FeedbackStatic
        onFeedbackSend={() => {
          setIsFeedbackPopupVisible(false)
        }}
      />,
    )
  }

  async function getProfessions() {
    setIsProfessionsLoading(true)
    axios
      .get<Profession[]>(`${BASE_URL}professions`)
      .then(({ data }) => setProfessions(data))
  }

  const fetchProfessionsSvg = (professions: Profession[]) => {
    const professionsWithCustomSvg: Profession[] = []
    const request = professions.map((profession: Profession) => {
      return axios
        .get(profession.icon, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then(response => {
          professionsWithCustomSvg.push({
            ...profession,
            svg: response.data,
          })
        })
        .catch(error => {
          console.log(error)
        })
    })
    return Promise.all(request).then(() => {
      setProfessionsWithCustomSvg(professionsWithCustomSvg)
      setIsProfessionsLoading(false)
    })
  }

  useEffect(() => {
    getProfessions()

    changeBg('var(--bg-color-base)')
    const scroll = Scroll.animateScroll
    scroll.scrollToTop()
    updateStickyBlocks()
  }, [])

  // throw new Error('lhg')

  useEffect(() => {
    if (professions?.length) {
      fetchProfessionsSvg(professions).then(() => {
        setTimeout(() => setIsFeedbackPopupVisible(true), 2000)
      })
    }
  }, [professions, professions?.length])

  return (
    <div className="ProfessionsPageContainer">
      <div className="ProfessionsContainer">
        <div className="d-flex justify-content-between CardHeaderWidth align-items-center">
          <h3 className="ProfessionTitle CardHeaderWidth">Выбери профессию</h3>
        </div>
        <div className="ProfessionContainer">
          {isProfessionsLoading &&
            makeEmptyList(12).map((number, index) => {
              return <div className="professionCarSkeleton MainSkeleton" key={index} />
            })}
          {!isProfessionsLoading &&
            professionsWithCustomSvg.map(profession => {
              return (
                <button
                  style={{ opacity: isProfessionsLoading ? 0 : 1 }}
                  className="ProfessionCardButton"
                  key={profession.id}
                  onClick={() => professionChosen(profession)}
                >
                  <ProfessionCard profession={profession} />
                </button>
              )
            })}
        </div>

        <WarningCard
          wrapClassName={`professionFeedback`}
          isAnimated={isFeedbackPopupVisible}
          animationName={'side'}
          onCrossClick={() => setIsFeedbackPopupVisible(false)}
        >
          <span className="Text">
            Сервис работает в тестовом режиме, список профессий будет дополняться.&#160;
            <button className="LinkText" onClick={openFeedbackStatic}>
              Расскажи, какой профессии тебе не хватает?
            </button>
          </span>
        </WarningCard>
      </div>
    </div>
  )
}

export default Professions
