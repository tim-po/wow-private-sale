import React, { useEffect, useState } from 'react'
import './index.scss'
import SelectedPresets from '../SelectedPresets'
import Preset from 'components/Preset'
import { PresetType } from '../../types'
import * as Scroll from 'react-scroll'
import Chevron, { Turn } from '../../images/icons/chevron'
import { createStickyBlock, updateStickyBlocks } from '../../utils/stickyHeaders'
import { scrollToElement } from '../../utils/scrollToElement'
import InfoIcon from '../../images/icons/Static/InfoIcon'
import { useInView } from 'react-intersection-observer'
import WarningCard from '../WarningCard'

// CONSTANTS

// DEFAULT FUNCTIONS

type SkillSetsPropType = {
  presets: {
    all: PresetType[]
    selected: PresetType[]
    display: PresetType[]
    select: (presetId: string) => void
    deSelect: (presetId: string) => void
  }
}

const SkillSets = (props: SkillSetsPropType) => {
  const { presets } = props
  const [selectedPresetsHidden, setSelectedPresetsHidden] = useState(false)
  const [isNoteOpen, setIsNoteOpen] = useState(true)
  const { ref, inView } = useInView({ threshold: 1, initialInView: true })

  const handleScroll = () => {
    if (window.scrollY < 200) {
      setSelectedPresetsHidden(true)
    }
  }

  useEffect(() => {
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

  return (
    <div className="skillSets">
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
            contentClassName={'PresetsInfoCard'}
            onCrossClick={() => setIsNoteOpen(false)}
          >
            <InfoIcon />
            <div>
              <span>
                Ты не можешь добавить больше <b>5 наборов навыков</b>,
              </span>
              <br />
              так как траектория может построиться неточно.
            </div>

            {/* <button */}
            {/*   className="border-0 pr-0 py-0 hideButton" */}
            {/*   onClick={() => { */}
            {/*     setIsNoteOpen(false) */}
            {/*   }} */}
            {/* > */}
            {/*   <Close width={10} height={10} /> */}
            {/* </button> */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillSets
