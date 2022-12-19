import React, {useContext, useEffect, useState} from "react";
import './index.scss'
import SelectedPresets from "../SelectedPresets";
import Preset from "components/Preset";
import {PresetType} from "../../types";
import * as Scroll from "react-scroll";
import Chevron, { Turn } from "../../images/icons/chevron";
import {createStickyBlock, updateStickyBlocks} from "../../utils/stickyHeaders";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type SkillSetsPropType = {
  // You should declare props like this, delete this if you don't need props
  presets: {
    all: PresetType[],
    selected: PresetType[],
    display: PresetType[],
    select: (presetId: string) => void,
    deSelect: (presetId: string) => void,
  }
}

const SkillSets = (props: SkillSetsPropType) => {
  const {presets} = props;
  const [selectedPresetsHidden, setSelectedPresetsHidden] = useState(false);
  const [isTopHidden, setIsTopHidden] = useState(false);

  useEffect(() => {
    let scroll = Scroll.animateScroll
    scroll.scrollToTop();

    const scrollContainer = window.document.getElementById('scroll-container')
    if (!scrollContainer) {
      return;
    }
    scrollContainer.style.scrollSnapType = 'x mandatory'
    scrollContainer.addEventListener('scroll', handleScroll)

    return () => {
      const scrollContainer = window.document.getElementById('scroll-container')
      if (!scrollContainer) {
        return;
      }
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, []);

  const selectedPresetsTrueHidden = () => {
    if (selectedPresetsHidden) {
      return true
    } else return isTopHidden;
  }

  const handleScroll = (e: any) => {
    const bottomTarget = window.document.getElementById('hidePresetsBottomTarget')
    if (!bottomTarget) {
      return
    }
    console.log(bottomTarget.offsetTop - 159 < e.target.scrollTop)
    if (!isTopHidden && !selectedPresetsHidden && bottomTarget.offsetTop - e.target.scrollTop - bottomTarget.clientHeight - 69 < bottomTarget.scrollTop) {
      setSelectedPresetsHidden(true)
      console.log('set selectedPresetsHidden true')
    }
    if (isTopHidden && bottomTarget.offsetTop >= e.target.scrollTop) {
      setSelectedPresetsHidden(false)
      console.log('set selectedPresetsHidden false')
    }
    setIsTopHidden(bottomTarget.offsetTop - e.target.scrollTop - bottomTarget.clientHeight <= e.target.scrollTop)
  }

  useEffect(() => {
    if(!selectedPresetsHidden){
      setTimeout(()=>{
        updateStickyBlocks()
      }, 200)
    }else{
      updateStickyBlocks()
    }
  }, [selectedPresetsHidden]);


  return (
    <div className="skillSets">
      <div className="professionsContainer">
        <div className="flex-block">
          <div className="minTitle top fullWidth" {...createStickyBlock(2)}>
            <div id="blob-1-top-left" className="subheader">
              <span className="subheader-title">Уже в наборе</span>
              {presets.selected.length > 0 &&
                <div className="subheader-counter">
                  +<span key={presets.selected.length} className="rollNumber">
                    {presets.selected.length}
                  </span>
                </div>
              }
            </div>
            <button className="buttonArrow" onClick={() => {
              setSelectedPresetsHidden(!selectedPresetsHidden)

            }}>

              <div className={`mobil ${selectedPresetsHidden ? 'arrowUp' : 'arrowDown'}`}>
                <Chevron color="#1F1F22" turn={Turn.down}/>
              </div>
              <span className="deck">{selectedPresetsHidden ? 'Показать' : 'Скрыть'}</span>
            </button>
          </div>
          <div className="borderBottom" {...createStickyBlock(3)}/>
          <div
            className={`selectedSkillsBlock fullWidth ${selectedPresetsTrueHidden() ? 'stickyPopup' : 'stickyPopup'} `}
            {...createStickyBlock(selectedPresetsHidden ? -1: 5)}
          >
            <SelectedPresets isHidden={false} deletePreset={(presetId: string) => presets.deSelect(presetId)} selectedPresets={presets.selected}/>
          </div>
          <p
            className={`minTitle bottom fullWidth ${selectedPresetsTrueHidden() ? '' : 'stickyPopup'}`}
            id="hidePresetsBottomTarget"
            {...createStickyBlock(selectedPresetsHidden ? 5 : 6)}
          >
            Добавь то, что хочешь изучить
          </p>
          {/*<div className="shadowBottom fullWidth"/>*/}
          <div className="rightBlock">
            <div className="blockPreset">
              {presets.display.map(preset => {
                return (
                  <Preset
                    key={preset.title}
                    preset={preset}
                    displayAdd={true}
                    onClick={() => presets.select(preset.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SkillSets
