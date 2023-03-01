import useWindowDimensions from '../../../utils/useWindowDimensions'
import React, { useContext, useEffect, useState } from 'react'
import './index.scss'
import { ClassType } from '../../../types'
import { colors } from '../../../constants'
import TrajectoryDisciplineModal from '../../Modals/TrajectoryDisciplineModal'
import ModalContext from '../../../Context/Modal'

type CardPropType = {
  selectedSphere: string | undefined
  sphere: ClassType
  hintSemester?: React.RefObject<HTMLDivElement> | undefined
  selectSelf: () => void
  hintDiscipline?: React.RefObject<HTMLDivElement>
  setSelectedSphere: React.Dispatch<React.SetStateAction<string | undefined>>
}

const CardDefaultProps = {}

const semesterDiscipline: (
  | 'first_semesters_disciplines'
  | 'second_semesters_disciplines'
)[] = ['first_semesters_disciplines', 'second_semesters_disciplines']

const Card = (props: CardPropType) => {
  const { displayModal } = useContext(ModalContext)
  const { width } = useWindowDimensions()

  const {
    selectSelf,
    selectedSphere,
    sphere,
    hintDiscipline,
    hintSemester,
    setSelectedSphere,
  } = props

  const getArrowDisciplineNames = (disciplineSphere: ClassType) => {
    const disciplinesWithArrows: string[] = []
    disciplineSphere['first_semesters_disciplines'].forEach(discipline => {
      if (discipline.next_disciplines.length > 0) {
        disciplinesWithArrows.push(discipline.name)
      }
    })
    return disciplinesWithArrows
  }
  const [activeSemesterIndex, setActiveSemesterIndex] = useState(
    'first_semesters_disciplines',
  )
  const getDisciplines = (
    disciplineSphere: ClassType,
    index: 'first_semesters_disciplines' | 'second_semesters_disciplines',
  ) => {
    return [...disciplineSphere[index]].sort((dis1, dis2) => {
      const discsWithArrows = getArrowDisciplineNames(disciplineSphere)
      const dis1InclusionNumber = discsWithArrows.includes(dis1.name) ? 1 : -1
      const dis2InclusionNumber = discsWithArrows.includes(dis2.name) ? 1 : -1
      return (
        (dis2InclusionNumber - dis1InclusionNumber) * 10 +
        (dis2.name > dis1.name ? 1 : -1)
      )
    })
  }

  const switchSemesters = () => {
    if (activeSemesterIndex === 'second_semesters_disciplines') {
      setActiveSemesterIndex('first_semesters_disciplines')
    } else if (activeSemesterIndex === 'first_semesters_disciplines') {
      setActiveSemesterIndex('second_semesters_disciplines')
    }
  }

  useEffect(() => {
    if (width < 1000 && hintDiscipline) {
      setSelectedSphere(sphere.name)
      switchSemesters()
    }
  }, [])

  return (
    <div
      className={`ClassCard ${selectedSphere === sphere.name ? 'open' : ''} ${
        selectedSphere === sphere.name && width > 1000 ? 'scale' : ''
      }`}
      key={sphere.name}
      id={sphere.name}
      style={{ background: colors[sphere.name] }}
    >
      <div className="ClassHeader" onClick={selectSelf}>
        <div className="ClassHeaderText">{sphere.name}</div>
        <button className="ClassOpenButton">
          <img
            alt={'Стрелка'}
            src="/static/arrowDown.svg"
            className={`Arrow ${selectedSphere === sphere.name ? 'open' : ''}`}
          />
        </button>
      </div>
      <div className="bodyCard">
        <div className="Semester" ref={width < 1000 ? hintSemester : undefined}>
          <p className="TrajectorySmallHeader">Осень</p>
          <p className="TrajectorySmallHeader">Весна</p>
        </div>
        <div className="SemestersRow">
          {semesterDiscipline.map(index => {
            return (
              <div
                className={`SemesterCol ${
                  index === activeSemesterIndex ? 'On' : 'Off'
                }  ${index}`}
                key={index}
              >
                <div className="SemesterSeparator" />
                <button
                  className={`BottomDisclosure ${
                    index === activeSemesterIndex ? 'On' : 'Off'
                  }`}
                  onClick={index === activeSemesterIndex ? undefined : switchSemesters}
                >
                  {getDisciplines(sphere, index).map(discipline => {
                    return (
                      <div className="ModalCardButton" key={discipline.id}>
                        <div
                          className="DisciplineCardWrapper"
                          ref={hintDiscipline}
                          onClick={
                            index === activeSemesterIndex || !(width < 1000)
                              ? () =>
                                  displayModal(
                                    <TrajectoryDisciplineModal id={discipline.id} />,
                                    { colorCloseWhite: true },
                                  )
                              : undefined
                          }
                        >
                          <div className="DisciplineCard">
                            <div className="flex-row flex-block justify-content-between">
                              <div
                                className={`DisciplineCardType ${
                                  discipline.necessity === 'chosen' ? 'optional' : ''
                                }`}
                              >
                                <span>
                                  {discipline.necessity === 'necessary'
                                    ? 'Обязательная'
                                    : 'По выбору'}
                                </span>
                              </div>
                              <div className="ChangeType">
                                {discipline.control_type === 'Дифференцированный зачет'
                                  ? 'Диф. зачет'
                                  : discipline.control_type}
                              </div>
                            </div>
                            <div
                              className={`discipline-card-name ${
                                discipline.necessity === 'chosen' ? 'optional' : ''
                              }`}
                            >
                              <span>{discipline.name}</span>
                            </div>
                          </div>
                        </div>
                        {getArrowDisciplineNames(sphere).includes(discipline.name) &&
                          index === 'first_semesters_disciplines' && (
                            <div className="discipline-arrow">
                              <img
                                className="DisciplineArrowPointer"
                                src="/static/discArrow.svg"
                                alt={'>'}
                              />
                            </div>
                          )}
                      </div>
                    )
                  })}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

Card.defaultProps = CardDefaultProps

export default Card
