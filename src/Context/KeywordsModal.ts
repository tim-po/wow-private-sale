import {createContext} from "react";
import {KeywordType} from "../types";

const ModalsContext = createContext({
    setKeywordsForModal: (newValue: KeywordType[]) => {},
    setDisciplinesForModal: (course: any, headerBg: string, item: any, isControlTypesModal?: boolean, typeOfControlType?: string) => {}
  }
)
export default ModalsContext