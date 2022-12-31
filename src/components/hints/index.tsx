import React, { useEffect, useState } from "react";
import "./index.scss"
import Arrow from "../../images/icons/Arrow";
import { isBoolean } from "lodash";
import getPosition from "./HintGeneric";
import HintGeneric from "./HintGeneric";
import { isMobile } from "react-device-detect";


type PropsType = {
  boxRef: React.RefObject<HTMLDivElement>
  pageTitle:string
  numberPages:number
  nameRef:string
  title:string
  description:string
}
const Hints = (props:PropsType) => {
  const {boxRef,  nameRef, title, description, pageTitle, numberPages} = props
  const [isLocalStorage, setIsLocalStorage] = useState<string>();
  const [positionLeft, setPositionLeft] = useState<number | undefined>();
  const [numberOpenPage, setNumberOpenPage] = useState<boolean>(true)
  const [stateLocal, setStateLocal] = useState<string>('true')
  const [positionTop, setPositionTop] = useState<number | undefined>();

  const getPosition = () => {
    const positionLeft = boxRef.current?.offsetLeft;
    if(positionLeft)
    setPositionLeft(positionLeft - 280);

    const positionTop = boxRef.current?.offsetTop;
    if(positionTop)
    setPositionTop(positionTop + 35);
  };



  useEffect(() => {

    if (localStorage.getItem(nameRef) === null) {
      setIsLocalStorage("true")
    }
    if (typeof isLocalStorage === "string") {
      localStorage.setItem(nameRef, isLocalStorage);
    }
  }, [isLocalStorage]);


  useEffect(() => {
    window.addEventListener("resize", getPosition);
    if (localStorage.getItem(nameRef) === "true") {
      setIsLocalStorage("true")
    }
  }, []);

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() =>{
    localStorage.setItem(pageTitle, String(stateLocal));
  },[stateLocal])
  return (
    <div>
      {stateLocal === 'true' ?
        <HintGeneric
          status={isLocalStorage === 'true' && numberPages===1? '' : 'closeHint'}
          setIsLocalStorage={setIsLocalStorage}
          title={title}
          setStateLocal={setStateLocal}
          positionTop={positionTop}
          pageTitle={pageTitle}
          positionLeft={positionLeft}
          description={description} />
        :
        <HintGeneric
          status={isLocalStorage === 'true' && numberPages===2? '' : 'closeHint'}
          setIsLocalStorage={setIsLocalStorage}
          title={title}
          setStateLocal={setStateLocal}
          positionTop={positionTop}
          pageTitle={pageTitle}
          positionLeft={positionLeft}
          description={description} />
      }

    </div>
  );
};

export default Hints;
