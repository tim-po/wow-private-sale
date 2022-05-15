/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, {useEffect} from "react";
import {useWeb3React} from "@web3-react/core";
import {Footer} from "./components/Footer";
import {Header} from "./Standart/components/Header";

import {injected} from "./wallet";
import {Allocation} from "./pages/Allocation";
import {useConnectionCheck} from "./Standart/hooks/useConnectionCheck";
import {useLocale} from "./Standart/hooks/useLocale";
import LocaleContext from "./Standart/LocaleContext";

export const App = () => {
  const {active, activate, networkError} = useWeb3React();
  const {localized, setLocale, locale} = useLocale()
  useConnectionCheck()

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized && !active && !networkError) {
        activate(injected);
      }
    });
  }, [activate, networkError]);

  return (
    <LocaleContext.Provider value={{setLocale, localized, locale}}>
      <div className="w-full overflow-hidden main-gradient"
           style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: "space-between"}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: "flex-start"}}>
          <Header/>
          <Allocation/>
        </div>
        <Footer/>
      </div>
    </LocaleContext.Provider>
  );
};
