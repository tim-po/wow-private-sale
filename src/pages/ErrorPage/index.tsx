import React, { useEffect } from 'react'
import { useRouteError } from 'react-router-dom'
import { changeBg } from '../../utils/background/background'
import { AxiosError } from 'axios'
import NotFound from './NotFound/NotFound'
import UnknownError from './UnknownError/UnknownError'

// CONSTANTS

// DEFAULT FUNCTIONS

const ErrorPage = () => {
  const err = useRouteError()

  useEffect(() => {
    changeBg('var(--bg-color-invert)')
  })

  if (err instanceof AxiosError) {
    return <NotFound />
  }

  return <UnknownError />
}

export default ErrorPage
