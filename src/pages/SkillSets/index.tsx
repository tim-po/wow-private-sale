import React, { useEffect, useState } from 'react'
import './index.scss'
import SelectedPresets from '../../components/SelectedPresets'
import Preset from 'components/Preset'
import * as Scroll from 'react-scroll'
import Chevron, { Turn } from '../../images/icons/chevron'
import { createStickyBlock, updateStickyBlocks } from '../../utils/stickyHeaders'
import { scrollToElement } from '../../utils/scrollToElement'
import InfoIcon from '../../images/icons/Static/InfoIcon'
import { useInView } from 'react-intersection-observer'
import { LocalStorageInteraction, withLocalStorage } from '../../utils/general'
import { useProfession } from '../../Models/useProfession'
import { changeBg } from '../../utils/background/background'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import WarningCard from '../../components/WarningCard'

// CONSTANTS

// DEFAULT FUNCTIONS

const SkillSets = () => {
  const professionId = withLocalStorage(
    { professionId: null },
    LocalStorageInteraction.load,
  ).professionId

  const navigate = useNavigate()
  const { presets, profession } = useProfession(professionId)

  const [selectedPresetsHidden, setSelectedPresetsHidden] = useState(false)
  const [isNoteOpen, setIsNoteOpen] = useState(true)
  const { ref, inView } = useInView({ threshold: 1, initialInView: true })

  const handleScroll = () => {
    if (window.scrollY < 200) {
      setSelectedPresetsHidden(true)
    }
  }

  useEffect(() => {
    changeBg('white')

    const scroll = Scroll.animateScroll
    scroll.scrollToTop()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (selectedPresetsHidden) {
      setTimeout(() => {
        updateStickyBlocks()
      }, 200)
    } else {
      updateStickyBlocks()
    }
  }, [selectedPresetsHidden, presets.display])

  const openTrajectoryChoice = () => {
    if (!profession) {
      return
    }

    navigate(`/trajectories`)
  }

  return (
    <div className="skillSets">
      <div className="headerFlex" {...createStickyBlock(1)} data-margin-top="0">
        <h4 className="currentHeader fontWeightBold" id="scrollToTop">
          Наборы навыков
        </h4>

        <div className="bottomLeftContainer">
          <button
            className={`clear ${presets.selected.length < 1 ? 'disabled' : ''}`}
            onClick={() => presets.clear()}
          >
            Очистить выбор
          </button>
          <button className="save" onClick={openTrajectoryChoice}>
            Построить траекторию
          </button>
        </div>
      </div>

      <div className="professionsContainer">
        <div className="flex-block">
          <div
            className={`minTitle top ${inView ? '' : 'hideBorder'}`}
            {...createStickyBlock(2)}
          >
            <div id="blob-1-top-left" className="subheader">
              <span className="subheader-title">Уже в наборе</span>
              {presets.selected.length > 0 && (
                <div className="subheader-counter">
                  +
                  <span key={presets.selected.length} className="rollNumber">
                    {presets.selected.length}
                  </span>
                </div>
              )}
            </div>
            <button
              className="buttonArrow"
              onClick={() => {
                if (selectedPresetsHidden) {
                  if (window.scrollY < 200) {
                    return scrollToElement('hidePresetsBottomTarget')
                  }
                  setSelectedPresetsHidden(false)
                } else {
                  setSelectedPresetsHidden(!selectedPresetsHidden)
                }
              }}
            >
              <div className={`mobil ${!inView ? 'arrowUp' : 'arrowDown'}`}>
                <Chevron color="#1F1F22" turn={Turn.down} />
              </div>
              <span className="deck">{!inView ? 'Показать' : 'Скрыть'}</span>
            </button>
          </div>

          <WarningCard
            wrapClassName={`${
              presets.selected.length >= 5 && isNoteOpen ? 'showNote' : 'hideNote'
            }`}
            contentClassName="PresetsInfoCard"
            onCrossClick={() => setIsNoteOpen(false)}
          >
            <InfoIcon />
            <div>
              Ты не можешь добавить больше &nbsp;
              <b>5&nbsp;наборов навыков</b>, так как траектория может построиться неточно.
            </div>
          </WarningCard>
          <div
            ref={ref}
            className={`selectedSkillsBlock`}
            {...createStickyBlock(selectedPresetsHidden ? -1 : 5)}
          >
            <div />
            <SelectedPresets
              isHidden={false}
              deletePreset={(presetId: string) => presets.deSelect(presetId)}
              selectedPresets={presets.selected}
            />
          </div>

          <p
            className={`minTitle bottom`}
            id="hidePresetsBottomTarget"
            {...createStickyBlock(selectedPresetsHidden ? 5 : 6)}
          >
            {presets.selected.length < 5
              ? 'Добавь то, что хочешь изучить'
              : 'Максимальное количсетво пресетов – 5'}
          </p>
          {/* <div className="shadowBottom fullWidth"/> */}
          <div className="rightBlock">
            <div className="blockPreset">
              {presets.display.map(preset => {
                return (
                  <Preset
                    key={preset.title}
                    preset={preset}
                    disabled={presets.selected.length >= 5}
                    displayAdd={presets.selected.length < 5}
                    onClick={() => {
                      setIsNoteOpen(true)
                      presets.select(preset.id)
                    }}
                  />
                )
              })}

              <div className="preset keywordHint">
                <span className={'keywordHintTitle'}>Мне ничего не подошло :(</span>
                <span className={'keywordHintText'}>
                  Не беда, ты можешь редактировать профессию с помощью ключевых слов — это
                  теги из которых состоят навыки траектории
                </span>
                <Button
                  buttonStyle={'secondary'}
                  classNames={['keywordHintBtn']}
                  onClick={() => navigate('/keywords')}
                >
                  Редактировать
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillSets
