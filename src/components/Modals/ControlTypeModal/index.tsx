import React, {useContext, useState} from "react";
import './index.scss'
import {DiplomaCardDataType} from "types";

type ControlTypeModalPropType = {
  controlType: DiplomaCardDataType
}

const ControlTypeModalDefaultProps = {}

const ControlTypeModal = (props: ControlTypeModalPropType) => {
  const {controlType} = props;
  const [isTooltipActive, setIsTooltipActive] = useState(false)

  const getTooltipMessage = (name: string) => {
    if (name === "Экзамен" || name === "Экзамены") {
      return 'Проверка знаний по выбранному билету. Ставится оценка'
    } else if (name === "Факультатив" || name === "Факультативы") {
      return 'Дополнительные учебные предметы на твой выбор'
    } else if (name === "Зачет" || name === "Зачеты") {
      return 'Проверка готовности к экзамену по всей программе. Оценка не ставится'
    } else if (name === "Курсовые" || name === "Курсовая") {
      return 'Учебная работа с элементами научных исследований'
    } else if (name === "Диф.зачеты" || name === "Диф.зачет") {
      return 'Проверка знаний по всей программе. Ставится оценка'
    } else if (name === "По выбору") {
      return 'Учебные предметы на твой выбор'
    } else if (name === "Обязательные") {
      return 'Учебные предметы обязательные для изучения'
    } else {
      return 'Ждем текст от ДСК'
    }
  }

  return (
    <div className="disciplineModalContainer">
      <div className="ContainerNameButton">
        <h1 className="KeywordsModalHeader">{controlType.name}</h1>
        <button className="VectorStroke" onMouseEnter={() => setIsTooltipActive(true)} onMouseLeave={() => setIsTooltipActive(false)}>
          {isTooltipActive &&
            <div className="Prompt">
              {getTooltipMessage(controlType.name)}
            </div>
          }
        </button>
      </div>
      <div className="ExamModalContainer">
        <div className="KeywordsModalContent">
          {controlType.disciplines.map(discipline => (
            <div className="ListExamModal">
              {discipline.name}
              <hr/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

ControlTypeModal.defaultProps = ControlTypeModalDefaultProps

export default ControlTypeModal