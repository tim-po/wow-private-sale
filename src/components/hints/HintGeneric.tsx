import React, { useEffect, useState } from "react";
import Arrow from "../../images/icons/Arrow";
import { isMobile } from "react-device-detect";

type GetPositionType = {
  title: string,
  description:string,
  isLocalStorage: string | undefined,
  setIsLocalStorage:  React.Dispatch<React.SetStateAction<string | undefined>>,
  status:string,
  setNumberOpenPage: React.Dispatch<React.SetStateAction<number>>,
  numberOpenPage: number,
  nameRef:string,
  boxRef: React.RefObject<HTMLDivElement>,
  listRef: React.RefObject<HTMLDivElement>[]
}


const HintGeneric = (props:GetPositionType) => {
  const {title,
    description,
    setIsLocalStorage,
    isLocalStorage,
    status,
    setNumberOpenPage,
    numberOpenPage,
    nameRef,
    listRef,
    boxRef} = props

  const [positionTop, setPositionTop] = useState<number | undefined>();
  const [positionLeft, setPositionLeft] = useState<number | undefined>();


  const getPosition = () => {
    // const offsetLeft = boxRef.current?.offsetLeft;
    const offsetLeft = boxRef.current?.getBoundingClientRect().left
    if(offsetLeft) {
        if(!isMobile) {
          setPositionLeft(offsetLeft - 280);
        }else {
          setPositionLeft(0);
        }
    }
    const offsetTop = boxRef.current?.getBoundingClientRect().top
    if(offsetTop)
      setPositionTop(offsetTop + 35);
  };


  useEffect(() => {
    if (nameRef[numberOpenPage])
      window.addEventListener("resize", getPosition);
  }, [numberOpenPage]);

  useEffect(() => {
    getPosition();
  }, [numberOpenPage]);


  useEffect(() => {
    if(isLocalStorage === "false" && listRef[numberOpenPage + 1] ){
      setNumberOpenPage(numberOpenPage + 1)
    }
  }, [isLocalStorage])


  return (
    <div className={`wrapHints ${status}`}  style={{ position: "absolute", top: positionTop, left: positionLeft }}>
      <div className="positionArrow">
        <Arrow color={'#323243'} />
      </div>
      <span className="title">{title}</span>

      <span className="description">{description}</span>
      <div className="closeHintsWrap">
        <button className="closeHints" onClick={
          ()=>{
            setIsLocalStorage('false')
          }
        }>Круто
        </button>
      </div>

    </div>
  )
}

export default HintGeneric;
