import React, {useContext, useState} from "react";
import './index.scss'
import {CountType} from "types";
import PromptImg from "../../../images/icons/questionСircle";

type ControlTypeModalPropType = {
  controlType: (CountType & { disciplines?: CountType[] | string[] })
}

const ControlTypeModalDefaultProps = {}

const ControlTypeModal = (props: ControlTypeModalPropType) => {
  const {controlType} = props;
  const [isTooltipActive, setIsTooltipActive] = useState(true)

  const getTooltipMessage = (name: string) => {
    if (name === "Экзамен" || name === "Экзамены") {
      return 'Проверка знаний по выбранному билету. Ставится оценка'
    } else if (name === "Факультатив" || name === "Факультативы") {
      return 'Дополнительные учебные предметы на твой выбор'
    } else if (name === "Зачет" || name === "Зачеты") {
      return 'Проверка готовности к экзамену по всей программе. Оценка не ставится'
    } else if (name === "Курсовые" || name === "Курсовая" || name === "Курсовая работа") {
      return 'Учебная работа с элементами научных исследований'
    } else if (name === "Диф.зачеты" || name === "Диф.зачет" || name === 'Дифференцированный зачет') {
      return 'Проверка знаний по всей программе. Ставится оценка'
    } else if (name === "Консультация" || name === "Консультации") {
      return 'Занятие, на котором преподаватель рассказывает о порядке проведения экзамена и отвечает на вопросы студентов.'
    } else if (name === "chosen") {
      return 'Учебные предметы на твой выбор'
    } else if (name === "necessary") {
      return 'Учебные предметы обязательные для изучения'
    } else {
      return 'Ждем текст от ДСК'
    }
  }

  const getModalTitle = (name: string) => {
    if (name === 'Дифференцированный зачет') {
      return 'Диф. зачет'
    } else if (name === 'chosen') {
      return 'По выбору'
    } else {
      return name
    }
  }


  return (
    <div className="disciplineModalContainer">
      <div className="ContainerNameButton">
        <h1 className="KeywordsModalHeader">
          {getModalTitle(controlType.name)}
        </h1>
        <div className="VectorStroke">
          <PromptImg/>
          <div className="Prompt">
            {getTooltipMessage(controlType.name)}
          </div>
        </div>
      </div>
      <div className="ExamModalContainer">
        <div className="KeywordsModalContent">
          {controlType.disciplines && controlType.disciplines.map(discipline => (
            <div className="ListExamModal">
              {typeof discipline !== "string" && discipline.name || (discipline as unknown as string)}
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
