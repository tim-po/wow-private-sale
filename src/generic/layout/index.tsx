import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import './index.scss'
import GenericModal, { OptionalGenericModalProps } from 'components/GenericModal'
import Header from 'components/Header'
import BackButtonContext from 'Context/BackButton'
import ModalsContext from 'Context/Modal'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { BASE_URL } from '../../constants'
import FeedbackGroupIdContext from '../../Context/IdGroup'
import { updateStickyBlocks } from '../../utils/stickyHeaders'
// CONSTANTS

// DEFAULT FUNCTIONS

type layoutPropType = {
  // You should declare props like this, delete this if you don't need props
  children: React.ReactElement | React.ReactElement[]
}

const Layout = (props: layoutPropType) => {
  const { children } = props

  const [shouldDisplayModal, setShouldDisplayModal] = useState<boolean>(false)
  const [modalComponents, setModalComponents] = useState<
    {
      component: ReactNode | undefined
      props?: OptionalGenericModalProps
    }[]
  >([])

  const { backButtonHref } = useContext(BackButtonContext)
  const [cookie] = useCookies(['_ym_uid'])

  const [groupId, setGroupId] = useState<number>(0)
  const refLastModals = useRef<HTMLDivElement>(null)

  const displayModal = (
    component: React.ReactNode,
    genericProps?: OptionalGenericModalProps,
  ) => {
    setModalComponents(prevState => [
      ...prevState,
      {
        component: component,
        props: genericProps,
      },
    ])
    setShouldDisplayModal(true)
  }

  const closeModal = () => {
    setModalComponents(modalComponents.slice(0, -1))
  }

  useEffect(() => {
    axios.get(`${BASE_URL}feedback/split_group?group_id=${cookie._ym_uid}`).then(res => {
      setGroupId(res.data.group_id)
    })

    updateStickyBlocks()
  }, [])

  // useEffect(() => {
  //   if (shouldDisplayModal) {
  //     window.document.body.classList.add("no-scroll");
  //   } else {
  //     window.document.body.classList.remove("no-scroll");
  //   }
  // }, [shouldDisplayModal]);

  useEffect(() => {
    if (modalComponents.length > 0) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [modalComponents])

  return (
    <ModalsContext.Provider value={{ displayModal, closeModal }}>
      <FeedbackGroupIdContext.Provider value={{ groupId }}>
        {/* <BgContext.Provider value={{setBg: setBackgroundColor}}>*/}
        <div className="DefaultLayoutContainer" id="scroll-container">
          <Header left={backButtonHref === '/'} />
          <div className="Content">
            {children}
            {modalComponents.map((item, index) => (
              <GenericModal
                key={index}
                modalCount={modalComponents.length}
                modalIndex={index}
                colorCloseWhite={false}
                hideMobile={false}
                hideDesktop={false}
                onModalClose={closeModal}
                {...item.props}
              >
                {item.component}
              </GenericModal>
            ))}
          </div>
        </div>
        {/* </BgContext.Provider>*/}
      </FeedbackGroupIdContext.Provider>
    </ModalsContext.Provider>
  )
}

export default Layout
