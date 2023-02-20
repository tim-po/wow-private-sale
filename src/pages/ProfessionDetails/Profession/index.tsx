import React, { useContext, useEffect } from 'react'
import './index.scss'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import BackButtonContext from '../../../Context/BackButton'
import { useProfession } from '../../../Models/useProfession'
import { changeBg } from '../../../utils/background/background'
import { createStickyBlock } from '../../../utils/stickyHeaders'
import {
  LocalStorageInteraction,
  makeEmptyList,
  withLocalStorage,
} from '../../../utils/general'
import ProfessionLamsIcon from '../../../images/icons/Static/lightBulbs'
import FingerLike from '../../../images/icons/Static/fingerLike'

// CONSTANTS
type ProfessionContextType = ReturnType<typeof useProfession>

// DEFAULT FUNCTIONS

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
    navigate('/skills')
  }

  return (
    <div className="professionDetails">
      <div className="keywordsCustomisationFlex">
        <div className="professionContainer">
          <div className="professionDescription">
            {/* Описание профессии */}
            <p className="subheader subheader-mobile" {...createStickyBlock(2)}>
              О профессии
            </p>
            <div className="keywords__card">
              <div className="profession-data">
                {profession ? (
                  <p className="mb-0">{profession.description ?? ''}</p>
                ) : (
                  makeEmptyList(40).map((_, index) => {
                    return (
                      <div
                        key={index}
                        className="skeleton"
                        style={{
                          width: Math.floor(Math.random() * (100 - 30 + 1)) + 30 + 'px',
                          height: '12px',
                        }}
                      />
                    )
                  })
                )}
              </div>
            </div>

            {/* Блок действий */}

            <div className="blockDescription">
              <div className="professionDescriptionText">
                {presets.selected.length === 0 && (
                  <span className="build-trajectory-text">
                    Мы уже собрали для тебя готовый набор ключевых слов. Этого будет
                    достаточно чтобы построить траекторию.
                    <br />
                    Ты можешь продолжить без изменений или добавить то, что хочешь изучить
                    дополнительно.
                  </span>
                )}
                {presets.selected.length > 0 && (
                  <span>
                    Вау, ты добавил новые навыки! Теперь можно строить траекторию
                  </span>
                )}
                <div className="blockDescriptionMobil">
                  <button className="button-primary" onClick={openSkillSets}>
                    Выбрать навыки
                  </button>
                </div>
              </div>
              {presets.selected.length === 0 && (
                <div className="lamp-icon">
                  <ProfessionLamsIcon />
                </div>
              )}
              {presets.selected.length > 0 && (
                <div className="like">
                  <FingerLike />
                </div>
              )}
            </div>
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
