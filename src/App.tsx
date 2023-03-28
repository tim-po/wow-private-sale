import React, { createContext, useState } from 'react'
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
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { CssVars } from './stylesheets/StyledVars/Vars'
import { globalMainSkeletonStyles, globalStyles } from './stylesheets/StyledVars/global'

export const StyleContext = createContext<{
  style: typeof CssVars
  setStyle: React.Dispatch<React.SetStateAction<typeof CssVars>>
}>({ style: CssVars, setStyle: () => null })

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
            onError={console.log}
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

  const [style, setStyle] = useState<typeof CssVars>(CssVars)

  const Global = createGlobalStyle`
  :root{
    ${Object.entries(style)
      .map(item => {
        let newItem = item[0].replace(/([a-z0-9])([A-Z0-9])/g, '$1-$2').toLowerCase()

        if (newItem.match(/([0-9])([a-z])/g)) {
          newItem = newItem.replace(/([0-9])([a-z])/g, '$1-$2').toLowerCase()
        }

        return `--${newItem}: ${item[1]}`
      })
      .join(';')}
  }
  
  ${globalStyles}
  ${globalMainSkeletonStyles}
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
        <ThemeProvider theme={style}>
          <RouterProvider router={rou} />
        </ThemeProvider>
      </StyleContext.Provider>
    </HeaderContext.Provider>
  )
}
