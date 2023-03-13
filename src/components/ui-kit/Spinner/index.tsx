import React from 'react'
import './index.scss'
import Spinners from '../../../images/icons/spinners'

type SpinnerPropType = {
  width: number
}

const Spinner = (props: SpinnerPropType) => {
  const { width } = props

  return (
    <div className="spinner-container">
      <div className="spinner" style={{ width: width, height: width }}>
        <Spinners width={width} height={width} />
      </div>
    </div>
  )
}

export default Spinner
