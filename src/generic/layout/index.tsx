import React, {useContext, useEffect, useState} from "react";
import './index.scss'
import GenericModal from "components/GenericModal";
import Header from "components/Header";
import IdGroup from "../../Context/IdGroup";
import KeywordsModal from "components/Modals/KeywordsModal";
import BgContext from "Context/Background";
import {Route, Routes} from "react-router-dom";
import BackButtonContext from "Context/BackButton";
import ModalsContext from "Context/Modal";
import {KeywordType} from "types";
import DisciplinesModal from "components/Modals/DisciplinesModal";
import modal from "Context/Modal";

import { YMInitializer } from 'react-yandex-metrika';
import { useCookies } from "react-cookie";
import axios from "axios";
import { BASE_URL } from "../../constants";
import IdGroupContext from "../../Context/IdGroup";
// CONSTANTS

// DEFAULT FUNCTIONS

type layoutPropType = {
  // You should declare props like this, delete this if you don't need props
  children: React.ReactElement | React.ReactElement[]
}

const Layout = (props: layoutPropType) => {
  const {children} = props

  const [shouldDisplayModal, setShouldDisplayModal] = useState<boolean>(false)
  const [modalComponent, setModalComponent] = useState<React.ReactNode | undefined>(undefined)
  const [backgroundColor, setBackgroundColor] = useState('white')

  const {backButtonHref} = useContext(BackButtonContext)

  const  [ cookie ,  setCookie ,  removeCookie ]  =  useCookies ( [ '_ym_uid' ]) ;

  const [idGroup, setIdGroup] = useState<any>()

  const displayModal = (component: React.ReactNode) => {
    setModalComponent(component)
    setShouldDisplayModal(true)
  }

  const closeModal = () => {
    setModalComponent(undefined)
    setShouldDisplayModal(false)
  }

  useEffect(() => {
    axios.get(`${BASE_URL}feedback/split_group?group_id=${cookie._ym_uid}`)
      .then(res => {
        setIdGroup(res.data)
      })
  },[])


  return (
    <ModalsContext.Provider value={{ displayModal }}>
      <YMInitializer accounts={[90901854]} options={{webvisor: true}} />
      <IdGroupContext.Provider value={{group_id: idGroup}}>
      <BgContext.Provider value={{setBg: setBackgroundColor}}>
        <div className="DefaultLayoutContainer" id="scroll-container" style={{backgroundColor: backgroundColor}}>
          <Header left={backButtonHref === '/'}/>
          <div className="Content">
            {children}
            <GenericModal
              modal={shouldDisplayModal}
              colorCloseWhite={false}
              hideMobile={false}
              hideDesktop={false}
              onModalClose={closeModal}
            >
              {modalComponent}
            </GenericModal>
          </div>
        </div>
      </BgContext.Provider>
      </IdGroupContext.Provider>
    </ModalsContext.Provider>
  )
};

export default Layout
