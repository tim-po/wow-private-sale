import React, { useContext, useEffect } from 'react'
import './index.scss'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import BackButtonContext from '../../Context/BackButton'
import { useProfession } from '../../Models/useProfession'
import { changeBg } from '../../utils/background/background'
import {
  LocalStorageInteraction,
  makeEmptyList,
  withLocalStorage,
} from '../../utils/general'
import Button from '../../components/Button'
import { RoutesName } from '../../types'

type ProfessionContextType = ReturnType<typeof useProfession>

const Profession = () => {
  const navigate = useNavigate()
  const { setNewBackButtonProps } = useContext(BackButtonContext)

  const { profId } = useParams()

  const { profession, presets } = useProfession(profId || '')

  // const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    changeBg('white')
    setNewBackButtonProps('Все профессии', '/professions')
  }, [])

  const openSkillSets = async () => {
    if (!profession) {
      return
    }

    withLocalStorage({ professionId: profession.id }, LocalStorageInteraction.save)
    navigate(RoutesName.SKILLS)
  }

  return (
    <div className="professionDetailsContainer">
      <div className="contentWrapper">
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
          <div className="buttonWrapper">
            <Button onClick={openSkillSets} buttonStyle={'main'}>
              Добавить навык
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profession

export function useContextProfession() {
  return useOutletContext<ProfessionContextType>()
}
