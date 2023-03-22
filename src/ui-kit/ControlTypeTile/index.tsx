import React, { useContext } from 'react'
import ControlTypeModal from '../../components/Modals/ControlTypeModal'
import ModalContext from '../../Context/Modal'
import { CountType } from '../../types'
import styled, { css } from 'styled-components'

const activeCourseControlCard = css`
  background: white;
  color: #1F1F22;
`

const disabledCourseControlCard = css`
  background: #F3F3F8;
  color: #6E6D79;
  pointer-events: none;
`

const CourseControlCard = styled.button<{ isActive: boolean }>`
  text-align: left;
  flex-grow: 2;
  border: 1px solid #E7E8EE;
  font-weight: 500;
  font-size: 12px;
  padding: 12px 11px;
  border-radius: 12px;
  min-width: 94px;
  box-shadow: none;
  
  ${({ isActive }) => (isActive ? activeCourseControlCard : disabledCourseControlCard)};
  
  @media screen and (max-width: 1000px){
  min-width: 100px;
  height: 66px;
  text-align: left;
 }
`

const ControlTypeName = styled.span`
  width: 62px;

  @media screen and (max-width: 1000px){
    font-family: 'Inter', serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`

const ControlTypeCount = styled.span`
  font-size: 18px;
  font-weight: 600;
  
  @media screen and (max-width: 1000px){
    font-size: 14px;
    line-height: 20px;
  }
`

type ControlTypeTilePropType = {
  controlType: CountType & { disciplines?: CountType[] }
  additionalClassnames?: string
}

const ControlTypeTile = ({
  controlType,
  additionalClassnames = '',
}: ControlTypeTilePropType) => {
  const { displayModal } = useContext(ModalContext)

  const openModal = () => {
    if (controlType.disciplines && controlType.disciplines.length) {
      displayModal(<ControlTypeModal controlType={controlType} />)
    }
  }

  return (
    <CourseControlCard
      isActive={controlType.count > 0}
      onClick={openModal}
      className={additionalClassnames}
    >
      <ControlTypeName className={'ControlTypeName'}>
        {controlType.name
          .replace('Дифференцированный', 'Диф.')
          .replace('Курсовая работа', 'Курсовая')}
      </ControlTypeName>
      <br />
      <ControlTypeCount>{controlType.count}</ControlTypeCount>
    </CourseControlCard>
  )
}

export default ControlTypeTile
