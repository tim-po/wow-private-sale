import React from 'react'
import './index.scss'

interface DisciplinesModalPropType {
  discipline: any
  course?: number
  headerBg?: string
  name?: string
}

const DisciplinesModal = (props: DisciplinesModalPropType) => {
  const { discipline, course, headerBg, name } = props
  return (
    <div className="disciplineModalContainer">
      <div className="disciplineHeaderContainer" style={{ background: `${headerBg}` }}>
        {course && <div className="course-of-disc">{course} курс</div>}
        <div className="classesNameDisc">{name}</div>
      </div>
      <div className="disciplineModalContent">
        <div className="disciplinesElementsContainer">
          {discipline.map((currentDiscipline: any, index: number) => (
            <div className="disciplinesElements" key={currentDiscipline.name}>
              {currentDiscipline['control_types'] && (
                <>
                  {Object.values(currentDiscipline['control_types']).map((el: any) => (
                    <div className="disciplinesElement" key={el.name}>
                      <div className="d-flex flex-row">
                        <div className="disciplinesElementsCount">{index + 1}</div>
                        <div>{currentDiscipline.name}</div>
                      </div>
                      <div className="disciplines-elements__name">
                        {el.name.replace('Дифференцированный', 'Дифф.')}
                      </div>
                    </div>
                  ))}
                </>
              )}
              {!currentDiscipline['control_types'] && (
                <div className="disciplinesElement" key={currentDiscipline.name}>
                  <div className="d-flex flex-row">
                    <div className="disciplinesElementsCount">{index + 1}</div>
                    <div>{currentDiscipline.name}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DisciplinesModal
