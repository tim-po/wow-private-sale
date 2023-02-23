import { createContext } from 'react'

type RandomFeedbackContextType = {
  isOpenRandomFeedback: boolean
  closeRandomFeedback: (newValue: boolean) => void
}

const RandomFeedbackContext = createContext<RandomFeedbackContextType>({
  isOpenRandomFeedback: true,
  closeRandomFeedback: () => null,
})

export default RandomFeedbackContext
