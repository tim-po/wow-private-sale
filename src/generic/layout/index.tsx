import React, {useContext, useEffect, useState} from "react";
import './index.scss'
import GenericModal from "components/GenericModal";
import Header from "components/Header";
import KeywordsModal from "components/Modals/KeywordsModal";
import BgContext from "Context/Background";
import {Route, Routes} from "react-router-dom";
import BackButtonContext from "Context/BackButton";
import ModalsContext from "Context/Modal";
import {KeywordType} from "types";
import DisciplinesModal from "components/Modals/DisciplinesModal";
import modal from "Context/Modal";

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

  const displayModal = (component: React.ReactNode) => {
    setModalComponent(component)
    setShouldDisplayModal(true)
  }

  const closeModal = () => {
    setModalComponent(undefined)
    setShouldDisplayModal(false)
  }


  return (
    <ModalsContext.Provider value={{ displayModal }}>
      <BgContext.Provider value={{setBg: setBackgroundColor}}>
        <div className="DefaultLayoutContainer" id="scroll-container" style={{backgroundColor: backgroundColor}}>
          <Header left={backButtonHref === '/'} style={{backgroundColor: backgroundColor}}/>
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
    </ModalsContext.Provider>
  )
};

export default Layout