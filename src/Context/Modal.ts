import React from "react";
import { OptionalGenericModalProps } from "../components/GenericModal";

export type ModalContext = {
  displayModal: (
    component: React.ReactNode,
    genericProps?: OptionalGenericModalProps
  ) => void;
  closeModal: () => void;
};

const ModalContext = React.createContext<ModalContext>({
  displayModal: (
    component: React.ReactNode,
    genericProps?: OptionalGenericModalProps
  ) => null,
  closeModal: () => null,
});

export default ModalContext;
