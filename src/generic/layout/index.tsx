import React, { ReactNode, useEffect, useState } from 'react'
import './index.scss'
import GenericModal, { OptionalGenericModalProps } from 'components/GenericModal'
import Header from 'components/Header'
import ModalsContext from 'Context/Modal'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { BASE_URL } from '../../constants'
import FeedbackGroupIdContext from '../../Context/IdGroup'
import { updateStickyBlocks } from '../../utils/stickyHeaders'

type layoutPropType = {
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

  const [cookie] = useCookies(['_ym_uid'])

  const [groupId, setGroupId] = useState<number>(0)

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
        <div className="DefaultLayoutContainer" id="scroll-container">
          <Header />
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
      </FeedbackGroupIdContext.Provider>
    </ModalsContext.Provider>
  )
}

export default Layout
