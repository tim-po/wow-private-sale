import React from 'react'
import './index.scss'
import Spinners from '../../../images/icons/spinners'

type SpinnerPropType = {
  width: string
}

const Spinner = (props: SpinnerPropType) => {
  const { width } = props

  return (
    <div className="spinner-container">
      <div className="spinner">
        <Spinners width={Number(width)} />
      </div>
    </div>
  )
}

export default Spinner
