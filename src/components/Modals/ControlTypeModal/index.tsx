import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import { CountType } from 'types'
import PromptImg from '../../../images/icons/questionСircle'
import { isMobile } from 'react-device-detect'

type ControlTypeModalPropType = {
  controlType: CountType & { disciplines?: CountType[] | string[] }
}

const ControlTypeModalDefaultProps = {}

const ControlTypeModal = (props: ControlTypeModalPropType) => {
  const { controlType } = props
  const [isTooltipActive, setIsTooltipActive] = useState(false)

  const getTooltipMessage = (name: string) => {
    if (name === 'Экзамен' || name === 'Экзамены') {
      return 'Проверка знаний по выбранному билету. Ставится оценка'
    } else if (name === 'Факультатив' || name === 'Факультативы') {
      return 'Дополнительные учебные предметы на твой выбор'
    } else if (name === 'Зачет' || name === 'Зачеты') {
      return 'Проверка готовности к экзамену по всей программе. Оценка не ставится'
    } else if (name === 'Курсовые' || name === 'Курсовая' || name === 'Курсовая работа') {
      return 'Учебная работа с элементами научных исследований'
    } else if (
      name === 'Курсовой проект' ||
      name === 'Курсовые проекты' ||
      name === 'Курсовых проект'
    ) {
      return 'Проект, представленный в виде индивидуальной научной теоретически-практической работы'
    } else if (
      name === 'Диф.зачеты' ||
      name === 'Диф.зачет' ||
      name === 'Дифференцированный зачет'
    ) {
      return 'Проверка знаний по всей программе. Ставится оценка'
    } else if (name === 'Консультация' || name === 'Консультации') {
      return 'Занятие, на котором преподаватель рассказывает о порядке проведения экзамена и отвечает на вопросы студентов.'
    } else if (name === 'chosen') {
      return 'Учебные предметы на твой выбор'
    } else if (name === 'necessary') {
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
    } else if (name === 'necessary') {
      return 'Обязательные'
    } else {
      return name
    }
  }
  const promptRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (document.getElementsByClassName('d-block') && isMobile) {
      const scrollElem = document.getElementsByClassName('d-block')

      const isSetIsTooltipActive = () => {
        setIsTooltipActive(false)
      }
      // if (scrollElem && scrollElem.length) {
      scrollElem[scrollElem.length - 1].addEventListener('scroll', isSetIsTooltipActive)
      // }
      return () =>
        scrollElem[scrollElem.length - 1]?.removeEventListener(
          'scroll',
          isSetIsTooltipActive,
        )
    }
  })
  return (
    <div className="disciplineModalContainer">
      <div className="ContainerNameButton">
        <h1 className="KeywordsModalHeader">{getModalTitle(controlType.name)}</h1>
        <div
          className="VectorStroke"
          onMouseEnter={() => setIsTooltipActive(true)}
          onMouseLeave={() => setIsTooltipActive(false)}
        >
          <PromptImg color={isTooltipActive ? '#8533FF' : '#B7B6BC'} />
          {isTooltipActive && (
            <div className="Prompt">{getTooltipMessage(controlType.name)}</div>
          )}
        </div>
      </div>
      <div className="ExamModalContainer" ref={promptRef}>
        <div className="KeywordsModalContent">
          {controlType.disciplines &&
            controlType.disciplines.map((discipline, index) => (
              <div className="ListExamModal" key={index}>
                {(typeof discipline !== 'string' && discipline.name) ||
                  (discipline as string)}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

ControlTypeModal.defaultProps = ControlTypeModalDefaultProps

export default ControlTypeModal
