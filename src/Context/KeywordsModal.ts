import {createContext} from "react";
import {KeywordType} from "../types";

const KeywordsaModalContext = createContext({setKeywordsForModal: (newValue: KeywordType[]) => {}})
export default KeywordsaModalContext