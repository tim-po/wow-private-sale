import React, { ReactNode } from "react";

const RandomFeedbackContext = React.createContext({
  isOpenRandomFeedback: true,
  closeRandomFeedback: (newValue: boolean) => {},
});

export default RandomFeedbackContext;
