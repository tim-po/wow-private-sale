import React from 'react'
import './index.scss'

// CONSTANTS

// DEFAULT FUNCTIONS

interface ISnippetComponentProp {
  // You should declare props like this, delete this if you don't need props
  prop: string
}

const SnippetComponent = (props: ISnippetComponentProp) => {
  return <div className={'some-classname'}>{String(props)}</div>
}

export default SnippetComponent
