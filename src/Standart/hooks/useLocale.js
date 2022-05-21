import getUserLocale from "get-user-locale";
import {useCookies} from "react-cookie/cjs";
import {useEffect, useState} from "react";

const defaultLocale = "ru"

export const useLocale = () => {
  const userLocale = getUserLocale();
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [locale, setLocaleState] = useState('')

  useEffect(()=>{
    setLocaleState(updateLocale())
  }, [])

  function updateLocale(){
    let newLocale = defaultLocale
        // cookies["locale"] || ''

    const isUserLocaleJA = userLocale.includes("ja") || userLocale.includes("JA") || userLocale[0].includes("ja") || userLocale[0].includes("JA")
    if(newLocale === '' && isUserLocaleJA){
      newLocale = 'ja'
    }
    // @ts-ignore
    if (newLocale === '') {
      newLocale = "en"
    }
    return newLocale
  }

  const setLocale = (newLocale) => {
    setCookie("locale", newLocale)
    setLocaleState(newLocale)
  }

  return {
    setLocale,
    locale,
    updateLocale
  }
}