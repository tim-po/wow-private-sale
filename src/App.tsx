import React, { createContext, useState } from 'react'
import './stylesheets/index.scss'
import './stylesheets/vars.css'
import './stylesheets/skeleton.scss'

import Layout from 'generic/layout'
import HeaderContext from 'Context/Header'
import {
  createBrowserRouter,
  createRoutesFromChildren,
  createRoutesFromElements,
  matchRoutes,
  Route,
  RouterProvider,
  useLocation,
  useNavigationType,
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
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import { createGlobalStyle } from 'styled-components'

export const StyleContext = createContext<{
  style: {
    bb: string
    cc: string
    tt: string
  }
  setStyle: React.Dispatch<React.SetStateAction<{ bb: string; cc: string; tt: string }>>
}>({ style: { bb: '', cc: '', tt: '' }, setStyle: () => null })

Sentry.init({
  dsn: 'https://f9eb5a8703064e23a3a2753218a12d6e@o4504910296383488.ingest.sentry.io/4504910298218496',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
  ],
  tracesSampleRate: 1.0,
})

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter)

const rou = sentryCreateBrowserRouter(
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
      <Route
        path={RoutesName.PROFESSIONS}
        element={
          <Sentry.ErrorBoundary
            fallback={({ error }) => {
              console.log(error)
              return <ErrorPage />
            }}
            showDialog
          >
            <Professions />
          </Sentry.ErrorBoundary>
        }
      />
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

  const [style, setStyle] = useState({ bb: 'red', cc: 'black', tt: 'black' })

  const Global = createGlobalStyle`
  :root{
    ${Object.entries(style)
      .map(item => {
        return `--${item[0]}: ${item[1]}`
      })
      .join(';')}
  }
  `

  return (
    <HeaderContext.Provider
      value={{
        isHeaderAnimated: isHeaderAnimated,
        setIsHeaderAnimated: setHeaderAnimated,
      }}
    >
      <StyleContext.Provider value={{ style: style, setStyle: setStyle }}>
        <Global />
        <RouterProvider router={rou} />
      </StyleContext.Provider>
    </HeaderContext.Provider>
  )
}
