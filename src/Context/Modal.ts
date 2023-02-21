import React, { ReactNode } from 'react'
import { OptionalGenericModalProps } from '../components/GenericModal'

type ModalContextType = {
  displayModal: (component: ReactNode, genericProps?: OptionalGenericModalProps) => void
  closeModal: () => void
}

const ModalContext = React.createContext<ModalContextType>({
  displayModal: () => null,
  closeModal: () => null,
})

export default ModalContext
