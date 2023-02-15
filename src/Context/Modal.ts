import React, { ReactNode } from 'react'

type ModalContextType = {
  displayModal: (component: ReactNode) => void
  closeModal: () => void
}

const ModalContext = React.createContext<ModalContextType>({
  displayModal: () => null,
  closeModal: () => null,
})

export default ModalContext
