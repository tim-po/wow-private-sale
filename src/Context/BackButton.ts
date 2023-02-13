import { createContext } from 'react'

type BackButtonContextType = {
  backButtonText: string
  backButtonHref: string
  setNewBackButtonProps: (text: string, href: string) => void
}

const BackButtonContext = createContext<BackButtonContextType>({
  backButtonText: 'Back',
  backButtonHref: '/',
  setNewBackButtonProps: () => null,
})

export default BackButtonContext
