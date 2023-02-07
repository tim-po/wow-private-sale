import React, { useContext } from 'react'
import './index.scss'
import ModalContext from '../../Context/Modal'
import ControlTypeModal from '../Modals/ControlTypeModal'
import { CountType } from '../../types'

// CONSTANTS

// DEFAULT FUNCTIONS

type ControlTypeTilePropType = {
  // You should declare props like this, delete this if you don't need props
  controlType: CountType & { disciplines?: CountType[] }
  additionalClassnames?: string
}

const ControlTypeTileDefaultProps = {
  // You should declare default props like this, delete this if you don't need props
  additionalClassnames: '',
}

const ControlTypeTile = (props: ControlTypeTilePropType) => {
  const { controlType, additionalClassnames } = props

  const { displayModal } = useContext(ModalContext)

  const openModal = () => {
    if (controlType.disciplines && controlType.disciplines.length) {
      displayModal(<ControlTypeModal controlType={controlType} />)
    }
  }

  return (
    <button
      className={`CourseCardControlCard ${additionalClassnames} ${
        controlType.count > 0 ? '' : 'notActive'
      }`}
      onClick={openModal}
    >
      <span className={'ControlTypeName'}>
        {controlType.name
          .replace('Дифференцированный', 'Диф.')
          .replace('Курсовая работа', 'Курсовая')}
      </span>
      <br />
      <b style={{ fontSize: '18px', fontWeight: '600' }}>{controlType.count}</b>
    </button>
  )
}

ControlTypeTile.defaultProps = ControlTypeTileDefaultProps

export default ControlTypeTile
