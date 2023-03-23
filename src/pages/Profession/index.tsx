import React, { useEffect } from 'react'
import './index.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useProfession } from '../../Models/useProfession'
import { changeBg } from '../../utils/background/background'
import { LocalStorageInteraction, withLocalStorage } from '../../utils/general'
import { RoutesName } from '../../types'
import { createStickyBlock, updateStickyBlocks } from '../../utils/stickyHeaders'
import { isMobile } from 'react-device-detect'
import ProfessionCareer from '../../components/ProfessionCareer'
import SkeletonText from '../../ui-kit/standard/SkeletonText/SkeletonText'
import Button from '../../ui-kit/standard/Button'
import ErrorPage from '../ErrorPage'

const Profession = () => {
  const navigate = useNavigate()
  const { profId } = useParams()

  const { profession, error } = useProfession(profId || '')

  useEffect(() => {
    changeBg('white')
    updateStickyBlocks()
  }, [])

  const openSkillSets = async () => {
    withLocalStorage({ professionId: profession?.id }, LocalStorageInteraction.save)
    navigate(RoutesName.SKILLS)
  }

  if (error) {
    return <ErrorPage />
  }

  return (
    <div className="professionDetailsContainer">
      <div className="contentWrapper">
        <div className="headerFlex" {...createStickyBlock(1)} data-margin-top="0">
          <h4 className="currentHeader fontWeightBold" id="scrollToTop">
            {profession ? profession.name : <SkeletonText wordCount={2} height={20} />}
          </h4>
        </div>
        <div className="professionDescription">
          <span className="professionDescriptionTitle">О профессии</span>
          {profession ? (
            <span className="professionDescriptionText">{profession.description}</span>
          ) : (
            <SkeletonText wordCount={80} />
          )}
        </div>
        <div className="actionBlock">
          <span className="actionBlockText">
            Мы уже собрали необходимый набор навыков для твоей профессии, добавляй
            дополнительные знания в свою траекторию, используя карточки навыков!
          </span>
          <div className="buttonWrapper" style={isMobile ? { zIndex: 1 } : undefined}>
            <Button onClick={openSkillSets} buttonStyle={'main'}>
              Дальше
            </Button>
          </div>
        </div>
        <ProfessionCareer
          responsibilities={profession?.responsibilities}
          salaries={profession?.salaries}
        />
      </div>
    </div>
  )
}

export default Profession
