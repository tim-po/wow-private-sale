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

const Profession = () => {
  const navigate = useNavigate()
  const { profId } = useParams()

  const { profession, error } = useProfession(profId || '')

  // const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    changeBg('white')
    updateStickyBlocks()
  }, [])

  const openSkillSets = async () => {
    if (!profession) {
      return
    }

    withLocalStorage({ professionId: profession.id }, LocalStorageInteraction.save)
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
            {profession && profession.name}
          </h4>
        </div>
        <div className="professionDescription">
          <span className="professionDescriptionTitle">О профессии</span>
          {profession && profession.description && (
            <span className="professionDescriptionText">{profession.description}</span>
          )}
          <div className="professionDescriptionSkeletons">
            {!profession &&
              makeEmptyList(40).map((_, index) => {
                return (
                  <div
                    key={index}
                    className="skeleton"
                    style={{
                      width: Math.floor(Math.random() * (100 - 30 + 1)) + 30 + 'px',
                      height: '10px',
                    }}
                  />
                )
              })}
          </div>
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
        <ProfessionCareer salaries={profession?.salaries} />
      </div>
    </div>
  )
}

export default Profession
