import { createContext } from 'react'

type HeaderContextType = {
  isHeaderAnimated: boolean
  setIsHeaderAnimated: (newValue: boolean) => void
}

const HeaderContext = createContext<HeaderContextType>({
  isHeaderAnimated: false,
  setIsHeaderAnimated: () => null,
})
export default HeaderContext
