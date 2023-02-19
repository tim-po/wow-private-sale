import React, { useState } from 'react'
import './stylesheets/index.css'
import './stylesheets/vars.css'
import './stylesheets/skeleton.scss'

import Layout from 'generic/layout'
import HeaderContext from 'Context/Header'
import BackButtonContext from 'Context/BackButton'
import { Route, Routes } from 'react-router-dom'
import Start from 'pages/Start'
import DiplomaShare from 'pages/DiplomaShare'
import Trajectories from './pages/Trajectories'
import Trajectory from './pages/Trajectory'
import NotFound from './components/NotFound'
import Profession from './pages/Profession'
import Professions from './pages/Professions'
import SkillSets from './pages/SkillSets'
import Keywords from './pages/Keywords'
import { RoutesName } from './types'

export const App = () => {
  const [isHeaderAnimated, setHeaderAnimated] = useState(false)
  const [backButtonProps, setBackButtonProps] = useState({
    backButtonText: 'Back',
    backButtonHref: '/',
  })

  return (
    <HeaderContext.Provider
      value={{
        isHeaderAnimated: isHeaderAnimated,
        setIsHeaderAnimated: setHeaderAnimated,
      }}
    >
      <BackButtonContext.Provider
        value={{
          ...backButtonProps,
          setNewBackButtonProps: (text: string, href: string) =>
            setBackButtonProps({ backButtonText: text, backButtonHref: href }),
        }}
      >
        <Layout>
          <Routes>
            <Route path={RoutesName.START} element={<Start />} />
            <Route path={RoutesName.PROFESSIONS} element={<Professions />} />
            <Route path={RoutesName.PROFESSION} element={<Profession />} />
            <Route path={RoutesName.SKILLS} element={<SkillSets />} />
            <Route path={RoutesName.KEYWORDS} element={<Keywords />} />
            <Route path={RoutesName.DIPLOMA_SHARE} element={<DiplomaShare />} />
            <Route path={RoutesName.TRAJECTORY} element={<Trajectory />} />
            <Route path={RoutesName.TRAJECTORIES} element={<Trajectories />} />
            <Route path={RoutesName.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </Layout>
      </BackButtonContext.Provider>
    </HeaderContext.Provider>
  )
}
