import React, {useContext, useState} from "react";
import './index.scss'
import styled from 'styled-components';

type DisciplinesModalPropType = {
  disciplines: any
}

const DisciplinesModalDefaultProps = {}

const DisciplinesModal = (props: DisciplinesModalPropType) => {
  const {disciplines} = props

  const [isTooltipActive, setIsTooltipActive] = useState(false)

  const getTooltipMessage = (name: string) => {
    if (name === "Экзамен") {
      return 'Проверка знаний по выбранному билету. Ставится оценка'
    } else if (name === "Факультатив") {
      return 'Дополнительные учебные предметы на твой выбор'
    } else if (name === "Зачет") {
      return 'Проверка готовности к экзамену по всей программе. Оценка не ставится'
    } else if (name === "Курсовая") {
      return 'Учебная работа с элементами научных исследований'
    } else {
      return 'Удачи'
    }
  }

  return (
    <div className="disciplineModalContainer">
      {!disciplines.isControlTypesModal ?
        <div className="disciplineHeaderContainer" style={{background: `${disciplines?.headerBg}`}}>
          {!disciplines.isControlTypesModal &&
            <div
              className="course-of-disc"
              style={{
                fontSize: `${!disciplines.isControlTypesModal && '20px'}`,
                fontWeight: `${!disciplines.isControlTypesModal && 700}`
              }}
            >
              {disciplines.course}
            </div>}
          <div className="classesNameDisc">{disciplines?.item.name}</div>
        </div>
        :
        <div className="ContainerNameButton">
          <h1 className="KeywordsModalHeader">{disciplines.typeOfControlType}</h1>
          <button className="VectorStroke" onMouseEnter={() => setIsTooltipActive(true)} onMouseLeave={() => setIsTooltipActive(false)}>
          {isTooltipActive &&
            <div className="Prompt">
              {getTooltipMessage(disciplines.typeOfControlType)}
            </div>
          }
          </button>
        </div>
      }
      <div className={`${!disciplines.isControlTypesModal ? 'disciplineModalContent' : 'ExamModalContainer'}`}>
        <div
          className={`${!disciplines.isControlTypesModal ? 'disciplinesElementsContainer' : 'KeywordsModalContentDisciplines'}`}>
          {
            disciplines.item.disciplines ?
              <>
                {disciplines?.item.disciplines.map((smth: any, index: number) => (
                  <div className="disciplinesElements" key={smth.name}>
                    {Object.values(smth['control_types']).map((el: any) => (
                      <div className="disciplinesElement" key={el.name}>
                        <div className="d-flex flex-row">
                          <div className="disciplinesElementsCount">{index + 1}</div>
                          <div>{smth.name}</div>
                        </div>
                        <div className="disciplines-elements__name">{el.name}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </>
              :
              <>
                {disciplines.item.map((discipline: any, index: number) => (
                  <>
                    {!disciplines.isControlTypesModal ?
                      <div className="disciplinesElements" key={discipline.name}>
                        <div className="d-flex flex-row">
                          <div className="disciplinesElementsCount">{index + 1}</div>
                          <div>{discipline.name}</div>
                        </div>
                      </div>
                      :
                      <div className="ListExamModal">
                        {discipline.name}
                        <hr/>
                      </div>
                    }
                  </>
                ))}
              </>
          }
        </div>
      </div>
    </div>
  )
};

DisciplinesModal.defaultProps = DisciplinesModalDefaultProps

export default DisciplinesModal