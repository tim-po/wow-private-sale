import React, { useState } from 'react'
import './stylesheets/index.css'
import './stylesheets/vars.css'
import './stylesheets/skeleton.scss'

import Layout from 'generic/layout'
import HeaderContext from 'Context/Header'
import { Route, Routes } from 'react-router-dom'
import Start from 'pages/Start'
import ProfessionDetails from 'pages/ProfessionDetails'
import DiplomaShare from 'pages/DiplomaShare'
import Trajectories from './pages/Trajectories'
import Trajectory from './pages/Trajectory'
import NotFound from './components/NotFound'
import Profession from './pages/ProfessionDetails/Profession'
import Professions from './pages/Professions'
import SkillSets from './pages/ProfessionDetails/SkillSets'
import Keywords from './pages/ProfessionDetails/Keywords'

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
      <Layout>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/professions/*" element={<Professions />} />
          {/*  TODO удалить роут professionDetails после окончания работы надо новой */}
          {/* навигацией */}
          <Route path="/professionDetails*" element={<ProfessionDetails />} />
          {/*  */}
          <Route path="profession/:profId" element={<Profession />} />

          <Route path="skills" element={<SkillSets />} />
          <Route path="keywords" element={<Keywords />} />

          <Route path="/diplomaShare*" element={<DiplomaShare />} />
          <Route path="/trajectory*" element={<Trajectory />} />
          <Route path="/trajectories*" element={<Trajectories />} />
          <Route path={'/*'} element={<NotFound />} />
        </Routes>
      </Layout>
    </HeaderContext.Provider>
  )
}
