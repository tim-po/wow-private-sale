import React, {useContext, useEffect, useState} from "react";
import './index.scss'
import GenericModal from "../../components/GenericModal";
import Header from "../../components/Header";
import KeywordsModal from "../../components/Modals/KeywordsModal";
import BgContext from "Context/Background";
import {Route, Routes} from "react-router-dom";
import BackButtonContext from "../../Context/BackButton";
import ModalsContext from "Context/KeywordsModal";
import {KeywordType} from "../../types";
import DisciplinesModal from "../../components/Modals/DisciplinesModal";

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
  const [isDisciplinesModalOpen, setIsDisciplinesModalOpen] = useState(false)
  const [disciplinesForModal, setDisciplinesForModal] = useState<{ course: number | undefined, headerBg: string, item: {}, isControlTypesModal?: boolean, typeOfControlType?: string }>({
    course: undefined,
    headerBg: '',
    item: {},
    isControlTypesModal: false,
    typeOfControlType: ''
  })
  const [backgroundColor, setBackgroundColor] = useState('white')

  const {backButtonHref} = useContext(BackButtonContext)
  
  const clearKeywordsForModal = () => {
    setKeywordsModalOpen(false)
    setIsDisciplinesModalOpen(false)
    setKeywordsForModal([])
    setDisciplinesForModal({
      course: undefined,
      headerBg: '',
      item: {},
      isControlTypesModal: false,
      typeOfControlType: ''
    })
  }

  useEffect(() => {
    setKeywordsModalOpen(keywordsForModal.length > 0)
  }, [keywordsForModal])

  useEffect(() => {
    if (Object.keys(disciplinesForModal.item).length) {
      setIsDisciplinesModalOpen(true)
    } else {
      setIsDisciplinesModalOpen(false)
    }
  }, [disciplinesForModal])

  return (
    <ModalsContext.Provider value={{
      setKeywordsForModal: (keywords)=>setKeywordsForModal(keywords),
      setDisciplinesForModal: (course, headerBg,item, isControlTypesModal,typeOfControlType) => setDisciplinesForModal({course, headerBg, item, isControlTypesModal, typeOfControlType})
    }}>
      <BgContext.Provider value={{setBg: setBackgroundColor}}>
        <div className="DefaultLayoutContainer" id="scroll-container" style={{backgroundColor: backgroundColor}}>
          <Header left={backButtonHref === '/'}/>
          <div className="Content">
            {children}
            <GenericModal
              modal={isKeywordsModalOpen || isDisciplinesModalOpen}
              colorCloseWhite={false}
              hideMobile={false}
              hideDesktop={false}
              onModalClose={clearKeywordsForModal}
            >
              {isKeywordsModalOpen && <KeywordsModal keywords={keywordsForModal}/>}
              {isDisciplinesModalOpen && <DisciplinesModal disciplines={disciplinesForModal} />}
            </GenericModal>
          </div>
        </div>
      </BgContext.Provider>
    </ModalsContext.Provider>
  )
};

export default Layout