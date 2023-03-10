import React, { useEffect } from 'react'
import './index.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useProfession } from '../../Models/useProfession'
import { changeBg } from '../../utils/background/background'
import {
  LocalStorageInteraction,
  makeEmptyList,
  withLocalStorage,
} from '../../utils/general'
import Button from '../../components/ui-kit/Button'
import { RoutesName } from '../../types'
import ProfessionCareer from '../../components/ui-kit/ProfessionCareer'
import { createStickyBlock, updateStickyBlocks } from '../../utils/stickyHeaders'
import { isMobile } from 'react-device-detect'
import NotFound from '../../components/NotFound'
import skeletonText from '../../utils/skeletons/skeletonText'

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
    return <NotFound />
  }

  return (
    <div className="professionDetailsContainer">
      <div className="contentWrapper">
        <div className="headerFlex" {...createStickyBlock(1)} data-margin-top="0">
          <h4 className="currentHeader fontWeightBold" id="scrollToTop">
            {profession ? profession.name : skeletonText(2, 20)}
          </h4>
        </div>
        <div className="professionDescription">
          <span className="professionDescriptionTitle">О профессии</span>
          {profession ? (
            <span className="professionDescriptionText">{profession.description}</span>
          ) : (
            skeletonText(80)
          )}
        </div>
        <div className="actionBlock">
          <span className="actionBlockText">
            Мы уже собрали необходимый набор навыков для твоей профессии, добавляй
            дополнительные знания в свою траекторию, используя карточки навыков!
          </span>
          <div className="buttonWrapper" style={isMobile ? { zIndex: 1 } : undefined}>
            <Button onClick={openSkillSets} buttonStyle={'main'}>
              Добавить навык
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
