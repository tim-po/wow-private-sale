import React, {useContext} from "react";
import './index.scss'
import {PresetType} from "../../types";
import ModalsContext from "../../Context/Modal";
import PresetIcon from "../PresetIcon";
import Pluse from "static/icons/Pluse";

// CONSTANTS

// DEFAULT FUNCTIONS
import KeywordsModal from "../Modals/KeywordsModal";
import Keyword from "../Keyword";

type PresetPropType = {
  displayAdd?: boolean
  preset: PresetType
  onClick?: () => void
}

const PresetDefaultProps = {
  somePropWithDefaultOption: 'default value'
}

const Preset = (props: PresetPropType) => {
  const {displayModal} = useContext(ModalsContext)

  const {displayAdd, preset, onClick} = props;

  const selectSelf = () => {
    if (displayAdd) {
      alert('Please select a preset')
    } else {
      alert('Please unselect a preset')
    }
  }
  const openKeywordsModal = () => {
   displayModal(<KeywordsModal keywords={preset.keywords} />)
  }

  if (!preset) {
    return null;
  }
  return (
    <div className={`flexPreset`}>
      <div className={'preset'}>
        <div className="presetTitleImg">
          <div className="presetFlex">
            <div
              className="presetIconFlex"
            >
              <PresetIcon presetClass={preset.category}/>
              {preset.category}
            </div>
            <div className="tag mobil">
              {preset.tag}
            </div>
          </div>
          <div>
            {displayAdd &&
              <button
                className="pluse deck activ"
                onClick={selectSelf}
              >
                <Pluse/>
              </button>
            }
          </div>
        </div>
        <div className="presetTitle">
          {preset.title}
        </div>
        <div className="keywordsContainer">
          {preset.keywords.slice(0, 5).map(keyword => {
            return (
              <Keyword keyword={keyword} bgColor="#D8D7FE" />
            )
          })}
          {preset.keywords.length > 5 &&
            <button onClick={openKeywordsModal} className="modalKeywords">
              +{preset.keywords.length - 5}
            </button>
          }
        </div>
        <button className="clickArea" onClick={onClick}/>
      </div>
    </div>
  )
};

Preset.defaultProps = PresetDefaultProps

export default Preset
