import React, { useState } from 'react'
import './stylesheets/index.scss'
import './stylesheets/vars.css'
import './stylesheets/skeleton.scss'

import Layout from 'generic/layout'
import HeaderContext from 'Context/Header'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Start from 'pages/Start'
import DiplomaShare from 'pages/DiplomaShare'
import Trajectories from './pages/Trajectories'
import Trajectory from './pages/Trajectory'
import Profession from './pages/Profession'
import Professions from './pages/Professions'
import SkillSets from './pages/SkillSets'
import Keywords from './pages/Keywords'
import { RoutesName } from './types'
import ErrorPage from './pages/ErrorPage'

// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')

const rou = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={'/'}
      element={<Layout />}
      errorElement={
        <Layout>
          <ErrorPage />
        </Layout>
      }
    >
      <Route path={RoutesName.START} element={<Start />} />
      <Route path={RoutesName.PROFESSIONS} element={<Professions />} />
      <Route path={RoutesName.PROFESSION} element={<Profession />} />
      <Route path={RoutesName.SKILLS} element={<SkillSets />} />
      <Route path={RoutesName.KEYWORDS} element={<Keywords />} />
      <Route path={RoutesName.DIPLOMA_SHARE} element={<DiplomaShare />} />
      <Route path={RoutesName.TRAJECTORY} element={<Trajectory />} />
      <Route path={RoutesName.TRAJECTORIES} element={<Trajectories />} />
      <Route path={RoutesName.NOT_FOUND} element={<ErrorPage />} />
      <Route path={RoutesName.TRAJECTORY_DIPLOMA} element={<Trajectory />} />
    </Route>,
  ),
)

export const App = () => {
  const [isHeaderAnimated, setHeaderAnimated] = useState(false)

  return (
    <HeaderContext.Provider
      value={{
        isHeaderAnimated: isHeaderAnimated,
        setIsHeaderAnimated: setHeaderAnimated,
      }}
    >
      <RouterProvider router={rou} />
    </HeaderContext.Provider>
  )
}
