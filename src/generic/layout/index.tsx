import React, {useContext, useEffect, useState} from "react";
import './index.scss'
import GenericModal from "../../components/GenericModal";
import Header from "../../components/Header";
import KeywordsModal from "../../components/KeywordsModal";
import BgContext from "Context/Background";
import {Route, Routes} from "react-router-dom";
import BackButtonContext from "../../Context/BackButton";
import KeywordsaModalContext from "Context/KeywordsModal";
import {KeywordType} from "../../types";

// CONSTANTS

// DEFAULT FUNCTIONS

type layoutPropType = {
  // You should declare props like this, delete this if you don't need props
  children: React.ReactElement | React.ReactElement[]
}

const Layout = (props: layoutPropType) => {
  const {children} = props
  const [isKeywordsModalOpen, setKeywordsModalOpen] = useState(false)
  const [keywordsForModal, setKeywordsForModal] = useState<KeywordType[]>([])
  const [backgroundColor, setBackgroundColor] = useState('white')

  const {backButtonHref} = useContext(BackButtonContext)


  const clearKeywordsForModal = () => {
    setKeywordsModalOpen(false)
    setKeywordsForModal([])
  }

  useEffect(() => {
    setKeywordsModalOpen(keywordsForModal.length > 0)
  }, [keywordsForModal])

  return (
    <KeywordsaModalContext.Provider value={{setKeywordsForModal: (keywords)=>setKeywordsForModal(keywords)}}>
      <BgContext.Provider value={{setBg: setBackgroundColor}}>
        <div className="DefaultLayoutContainer" id="scroll-container" style={{backgroundColor: backgroundColor}}>
          <Header left={backButtonHref === '/'}/>
          <div className="Content">
            {children}
            <GenericModal
              modal={isKeywordsModalOpen}
              colorCloseWhite={false}
              hideMobile={false}
              hideDesktop={false}
              onModalClose={clearKeywordsForModal}
            >
              <KeywordsModal keywords={keywordsForModal}/>
            </GenericModal>
          </div>
        </div>
      </BgContext.Provider>
    </KeywordsaModalContext.Provider>
  )
};

export default Layout