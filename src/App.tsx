/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, {useState} from "react";
import Layout from "./generic/layout";
import HeaderContext from "./Context/Header"
import BackButtonContext from "./Context/BackButton"
import './index.css'
import {Route, Routes} from "react-router-dom";
import Start from "./pages/Start";
import Professions from "./pages/Professions";
import ProfessionDetails from "./pages/ProfessionDetails";

export const App = () => {
  const [isHeaderAnimated, setHeaderAnimated] = useState(false)
  const [backButtonProps, setBackButtonProps] = useState({backButtonText: "Back", backButtonHref: '/'})

  return (
    <HeaderContext.Provider value={{isHeaderAnimated: isHeaderAnimated, setIsHeaderAnimated: setHeaderAnimated}}>
      <BackButtonContext.Provider value={{
        ...backButtonProps,
        setNewBackButtonProps:
          (text: string, href: string) =>
            setBackButtonProps({backButtonText: text, backButtonHref: href})
      }}
      >
        <Layout>
          <Routes>
            <Route path="/" element={<Start />}/>
            <Route path="/professions" element={<Professions />}/>
            <Route path="/professionDetails*" element={<ProfessionDetails />}/>
          </Routes>
        </Layout>
      </BackButtonContext.Provider>
    </HeaderContext.Provider>
  );
};
