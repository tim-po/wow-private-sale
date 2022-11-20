import {createContext} from "react";

const BgContext = createContext({setBg: (newValue: string) => {}})
export default BgContext