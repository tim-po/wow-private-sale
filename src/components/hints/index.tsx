import React, { useEffect, useState } from "react";
import "./index.scss"
import HintGeneric from "./HintGeneric";
import Portal from "./Portal";

type PropsType = {
  boxRef: any,
  pageTitle:string,
  nameRef:string[],
  title:string[],
  description:string[],
}
const Hints = (props:PropsType) => {
  const {boxRef,  nameRef, title, description, pageTitle} = props
  const [isLocalStorage, setIsLocalStorage] = useState<string>();
  const [numberOpenPage, setNumberOpenPage] = useState<number>(0)
  const [stateLocal, setStateLocal] = useState<string>('true')

  useEffect(() => {
    if (localStorage.getItem(nameRef[numberOpenPage]) === null) {
      setTimeout(()=>setIsLocalStorage("true"), 500)
    }
    if (typeof isLocalStorage === "string") {
      localStorage.setItem(nameRef[numberOpenPage], isLocalStorage);
    }

  }, [isLocalStorage, numberOpenPage]);

  useEffect(() => {
    if (localStorage.getItem(nameRef[numberOpenPage]) === "true") {
      setIsLocalStorage("true")
    }else if (localStorage.getItem(nameRef[numberOpenPage]) === 'false') {
      setIsLocalStorage("false")
    }

  }, []);

  return (
    <Portal>
        <HintGeneric
          status={isLocalStorage === 'true' ? '' : 'closeHint'}
          boxRef={boxRef[numberOpenPage]}
          nameRef={nameRef[numberOpenPage]}
          listRef={boxRef}
          setIsLocalStorage={setIsLocalStorage}
          isLocalStorage={isLocalStorage}
          title={title[numberOpenPage]}
          setNumberOpenPage={setNumberOpenPage}
          numberOpenPage={numberOpenPage}
          description={description[numberOpenPage]} />
    </Portal>
  );
};

export default Hints;
