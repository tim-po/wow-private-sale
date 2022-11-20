import {createContext} from "react";

const HeaderContext = createContext({isHeaderAnimated: false, setIsHeaderAnimated: (newValue: boolean) => {}})
export default HeaderContext