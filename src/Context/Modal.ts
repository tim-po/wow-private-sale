import React, { ReactNode } from "react";

const ModalContext = React.createContext({
  displayModal: (component: React.ReactNode) => {},
  closeModal: () => {},
});

export default ModalContext;
