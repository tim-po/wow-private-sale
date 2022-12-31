import React from "react";
import Arrow from "../../images/icons/Arrow";
import { isMobile } from "react-device-detect";

type GetPositionType = {
  title: string,
  description:string,
  positionTop: number | undefined,
  positionLeft: number | undefined,
  setIsLocalStorage:  React.Dispatch<React.SetStateAction<string | undefined>>
  status:string
  setStateLocal:React.Dispatch<React.SetStateAction<string>>
  pageTitle:string
}


const HintGeneric = (props:GetPositionType) => {
  const {title, description, positionTop, positionLeft, setIsLocalStorage, status, pageTitle} = props

  const openingNewModalWindow = ()=>{
    setIsLocalStorage('false')
    const stateLocal =  localStorage.getItem(pageTitle);
    if(stateLocal ==="true")
      localStorage.setItem(pageTitle, "false");

  }
  return (
    <div className={`wrapHints ${status}`}  style={{ position: "absolute", top: positionTop, left: positionLeft }}>
      <div className="positionArrow">
        <Arrow color={'#323243'} />
      </div>
      <span className="title">{title}</span>

      <span className="description">{description}</span>
      <div className="closeHintsWrap">
        <button className="closeHints" onClick={
          openingNewModalWindow
        }>Круто
        </button>
      </div>
    </div>
  )
}

export default HintGeneric;
