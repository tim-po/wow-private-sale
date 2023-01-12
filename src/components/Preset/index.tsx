import React, { MouseEventHandler, useContext, useState } from "react";
import "./index.scss";
import { PresetType } from "../../types";
import ModalsContext from "../../Context/Modal";
import PresetIcon from "../PresetIcon";
import Pluse from "images/icons/plus";

// CONSTANTS
// DEFAULT FUNCTIONS
import KeywordsModal from "../Modals/KeywordsModal";
import Keyword from "../Keyword";

type PresetPropType = {
  preset: PresetType
  onClick?: () => void
  disabled?: boolean
  displayAdd?: boolean
}

const PresetDefaultProps = {
  somePropWithDefaultOption: 'default value'
}

const Preset = (props: PresetPropType) => {
  const {displayModal} = useContext(ModalsContext)
  const [hidden, setHidden] = useState(false);
  const [declined, setDeclined] = useState(false);


  const {displayAdd, preset, onClick, disabled} = props;

  const openKeywordsModal = () => {
   displayModal(<KeywordsModal keywords={preset.keywords} />)
  }

  const clickSelf:MouseEventHandler<HTMLButtonElement> = () => {
    if(onClick){
      setHidden(true);
      setTimeout(() => {
        onClick()
        setHidden(false);
      }, 200)
    }
    if(disabled){
      setDeclined(true);
      setTimeout(() => {
        setDeclined(false);
      }, 500)
    }
  }

  if (!preset) {
    return null;
  }
  return (
    <div className={`preset ${hidden ? 'hidePreset': ''} ${onClick ? 'iteractable showPreset': ''}  ${disabled ? 'disabled' : ''} ${declined ? 'declineAnimate' : ''}`}>
      <div className="presetTopRow">
        <div className="presetIconFlex">
          <PresetIcon presetClass={preset.category}/>
          {preset.category}
        </div>
        {onClick != undefined &&
          <button
            className="actionButton"
            onClick={clickSelf}
          >
            <div style={displayAdd ? {} : {transform: 'rotate(45deg)'}}>
            <Pluse/>
            </div>
          </button>
        }
      </div>
      <div className="presetTitle">
        {preset.title}
      </div>
      <div className="keywordsContainer">
        {preset.keywords.slice(0, 5).map(keyword => {
          return (
            <Keyword key={keyword.id} keyword={keyword} bgColor="#D8D7FE" />
          )
        })}
        {preset.keywords.length > 5 &&
          <button onClick={openKeywordsModal} className="openKeywordsModalButton">
            +{preset.keywords.length - 5}
          </button>
        }
      </div>
      <button className="clickArea" onClick={clickSelf}/>
    </div>
  )
};

Preset.defaultProps = PresetDefaultProps

export default Preset
