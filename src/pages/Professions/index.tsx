import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderContext from '../../Context/Header'
import { BASE_URL } from '../../constants'
import axios from 'axios'
import { Profession } from '../../types'
import ProfessionCard from 'components/ProfessionCard'
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
import WarningCard from '../../components/WarningCard'

// CONSTANTS

// DEFAULT FUNCTIONS

const Professions = () => {
  const { setIsHeaderAnimated } = useContext(HeaderContext)
  const navigate = useNavigate()
  const [professionsWithCustomSvg, setProfessionsWithCustomSvg] = useState<Profession[]>(
    [],
  )
  const [isProfessionsLoading, setIsProfessionsLoading] = useState(true)
  const [isFeedbackPopupVisible, setIsFeedbackPopupVisible] = useState(false)

  const { displayModal } = useContext(ModalContext)
  const professionChosen = (profession: Profession) => {
    setIsHeaderAnimated(true)
    withLocalStorage({ selectedPresetIds: [] }, LocalStorageInteraction.save)
    withLocalStorage({ addedKeywords: [] }, LocalStorageInteraction.save)

    navigate(`/professionDetails?id=${profession.id}&view=main`)
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

  const getProfessions = async () => {
    setIsProfessionsLoading(true)
    const response = await axios.get(`${BASE_URL}professions/`)
    const professions: Profession[] = response.data

    setProfessionsWithCustomSvg(professions)
    const newProfessionsWithCustomSvg: Profession[] = []
    for (let i = 0; i < professions.length; i++) {
      const profession = professions[i]
      await fetch(`${BASE_URL}professions/${profession.id}/svg/`)
        .then(res => res.json())
        .then(res => {
          newProfessionsWithCustomSvg[i] = { ...profession, svg: res.svg }
        })
    }
    await setProfessionsWithCustomSvg(newProfessionsWithCustomSvg)
    setIsProfessionsLoading(false)
  }

  useEffect(() => {
    changeBg('var(--bg-color-base)')
    getProfessions().then(() => {
      setTimeout(() => setIsFeedbackPopupVisible(true), 2000)
    })
    updateStickyBlocks()
  }, [])

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
          {professionsWithCustomSvg.map(profession => {
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
          wrapClassName={`ProfessionModalBottom ${
            isFeedbackPopupVisible ? '' : 'ProfessionModalBottomNon'
          }`}
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
