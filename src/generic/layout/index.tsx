import React, {useContext, useEffect, useState} from "react";
import './index.scss'
import GenericModal from "components/GenericModal";
import Header from "components/Header";
import BgContext from "Context/Background";
import BackButtonContext from "Context/BackButton";
import ModalsContext from "Context/Modal";

import {YMInitializer} from 'react-yandex-metrika';
import {useCookies} from "react-cookie";
import axios from "axios";
import {BASE_URL} from "../../constants";
import FeedbackGroupIdContext from "../../Context/IdGroup";
import {calculateTotalStickyHeight, updateStickyBlocks} from "../../utils/stickyHeaders";
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

  const [cookie] = useCookies(['_ym_uid']);

  const [groupId, setGroupId] = useState<number>(0)

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
        setGroupId(res.data.group_id)
      })

    updateStickyBlocks()
  }, [])

  useEffect(() => {
    if(shouldDisplayModal){
      window.document.body.classList.add("no-scroll")
    }else{
      window.document.body.classList.remove("no-scroll")
    }
  }, [shouldDisplayModal]);


  return (
    <ModalsContext.Provider value={{displayModal, closeModal}}>
      <FeedbackGroupIdContext.Provider value={{groupId}}>
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
      </FeedbackGroupIdContext.Provider>
    </ModalsContext.Provider>
  )
};

export default Layout
