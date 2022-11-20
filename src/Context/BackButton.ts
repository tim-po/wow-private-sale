import {createContext} from "react";

const BackButtonContext = createContext({backButtonText: 'Back', backButtonHref: '/', setNewBackButtonProps: (text: string, href: string) => {}})
export default BackButtonContext