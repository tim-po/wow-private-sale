/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, {useState} from "react";
import Layout from "generic/layout";
import HeaderContext from "Context/Header"
import BackButtonContext from "Context/BackButton"
import './index.css'
import {Route, Routes} from "react-router-dom";
import Start from "pages/Start";
import Professions from "pages/Professions";
import ProfessionDetails from "pages/ProfessionDetails";
import DiplomaShare from "pages/DiplomaShare";
import Diploma from "pages/Diploma";
import Trajectories from "./pages/Trajectories";

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
            <Route path="/diplomaShare*" element={<DiplomaShare />}/>
            <Route path="/trajectory*" element={<Diploma />}/>
            <Route path="/trajectories*" element={<Trajectories />}/>
          </Routes>
        </Layout>
      </BackButtonContext.Provider>
    </HeaderContext.Provider>
  );
};
