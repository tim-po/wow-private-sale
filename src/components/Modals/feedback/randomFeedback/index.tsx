import React, { useContext, useEffect, useRef, useState } from 'react'
import './index.scss'
import axios from 'axios'
import Heart from '../../../../images/icons/Static/heart'
import RandomFeedbackOpen from '../../../../images/icons/Static/randomFeedbackOpen'
import Close from '../../../../images/icons/close'
import { BASE_URL } from '../../../../constants'
import { useCookies } from 'react-cookie'
import { LocalStorageInteraction, withLocalStorage } from '../../../../utils/general'
import FeedbackGroupIdContext from '../../../../Context/IdGroup'
import RandomFeedbackContext from '../../../../Context/RandomFeedback'
import useOnClickOutside from '../../../../utils/useClickOutside'

const feedbackDataByGroup: {
  [key: number]: { title: string; mapButton: string[] }
} = {
  1: {
    title: 'Что-то на этой странице вызвало трудности?',
    mapButton: [
      'Поиск ключевых слов 🔎️',
      'Добавление/ удаление слов 🗑',
      'Все сложно  🤯',
      'Все понятно 👌',
    ],
  },
  2: {
    title: 'Как тебе предложенные программы?',
    mapButton: [
      'Ничего не подошло 🙁',
      'Странные теги 🤔',
      'Мало информации  🤨',
      'Отлично 👌',
    ],
  },
  3: {
    title: 'Что-то на этой странице вызвало трудности? ',
    mapButton: [
      'Выбор траектории 🙁',
      'Как перейти дальше 🤔',
      'Слишком много информации  🤯',
      'Все понятно 👌',
    ],
  },
  4: {
    title: 'Удобно ли тебе знакомиться с образовательной программой ?',
    mapButton: ['Сложно разобраться  🤯', 'Понятно 👌', 'Удобнее в таблице 🙁'],
  },
  5: {
    title: 'Что-то на этой странице вызвало трудности? ',
    mapButton: [
      'Как перейти дальше  🤔',
      'Сложные названия 🙁️',
      'Все понятно 👌',
      'Слишком много информации  🤯',
      'Связь между предметами 🔗',
    ],
  },
  6: {
    title: 'Ты хотел бы сохранить результат?',
    mapButton: ['Да, ссылкой на диплом  🔗', 'Да, документом-таблицей 📄', 'Нет '],
  },
  7: {
    title: 'Что бы ты добавил в диплом?',
    mapButton: ['Всего достаточно  👌', 'Примеры вакансий 📄'],
  },
}

const RandomFeedback = ({ displayForGroup = 0 }) => {
  const feedbackRef = useRef<HTMLDivElement | null>(null)

  const { isOpenRandomFeedback } = useContext(RandomFeedbackContext)

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedButton, setSelectedButton] = useState<number>(-1)
  const [showFeedback, setShowFeedback] = useState(false)
  const [textDetailed, setTextDetailed] = useState('')
  const { groupId } = useContext(FeedbackGroupIdContext)
  const [cookie] = useCookies(['_ym_uid'])

  const [isSeeIcon, setIsSeeIcon] = useState(true)
  const [mobileButtonHeight, setMobileButtonHeight] = useState(0)
  const [prevMovementY, setPrevMovementY] = useState(0)
  const [alreadySentFeedbackCount, setAlreadySentFeedbackCount] = useState(
    withLocalStorage({ alreadySentFeedbackCount: 0 }, LocalStorageInteraction.load)
      .alreadySentFeedbackCount,
  )
  useEffect(() => {
    const bottomButton = document.getElementById('mobilBottomButton')
    if (bottomButton && window.getComputedStyle(bottomButton).bottom === '0px') {
      setMobileButtonHeight(bottomButton.offsetHeight)
    } else setMobileButtonHeight(0)
  })

  useEffect(() => {
    function ScrollStart(event: TouchEvent) {
      setPrevMovementY(event.touches[0].clientY)
    }

    function Scroll(event: TouchEvent) {
      const deltaY = prevMovementY - event.touches[0].clientY
      if (deltaY > 0) {
        setIsSeeIcon(false)
        setShowFeedback(false)
      } else {
        setIsSeeIcon(true)
      }
    }

    document.body.addEventListener('touchstart', ScrollStart, false)
    document.body.addEventListener('touchmove', Scroll, false)
  })

  function sendFeedback() {
    const user = {
      email: '',
      score: selectedButton,
      text: `${feedbackDataByGroup[displayForGroup]['mapButton'][selectedButton]} ${textDetailed}`,
      user_id: cookie._ym_uid,
      feedback_type: displayForGroup,
    }
    axios
      .post(`${BASE_URL}feedback/`, user, {})
      .then(() => {
        setIsSubmitted(true)
        setSelectedButton(-1)
        setTextDetailed('')
        setAlreadySentFeedbackCount(alreadySentFeedbackCount + 1)
        withLocalStorage(
          { alreadySentFeedbackCount: alreadySentFeedbackCount + 1 },
          LocalStorageInteraction.save,
        )
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  function closeFeedback() {
    setTimeout(() => {
      setShowFeedback(false)

      setTimeout(() => {
        if (isSubmitted) {
          setIsSubmitted(false)
        }
      }, 300)
    }, 100)
  }

  function openFeedback() {
    setShowFeedback(true)
  }

  useEffect(() => {
    setTimeout(() => {
      openFeedback()
    }, 2000)
  }, [])
  useOnClickOutside(feedbackRef, () => closeFeedback())
  if (alreadySentFeedbackCount > 20 || displayForGroup !== groupId) {
    return null
  }

  return (
    <>
      {isOpenRandomFeedback ? (
        <div
          style={{
            bottom: showFeedback
              ? 0
              : mobileButtonHeight === 0
              ? 8
              : mobileButtonHeight + 8,
          }}
          onClick={openFeedback}
          ref={feedbackRef}
          className={`container-form-random-feedback ${
            !showFeedback ? 'feedbackSmall' : ''
          } ${isSeeIcon ? '' : 'hideIcon'}`}
        >
          <RandomFeedbackOpen />
          {!isSubmitted && (
            <div className="form">
              <div className="wrapTitle">
                <span className="title">
                  {feedbackDataByGroup[displayForGroup]['title']}
                </span>
                <button onClick={() => closeFeedback()}>
                  <Close />
                </button>
              </div>
              <div className="bottomFeedback">
                {feedbackDataByGroup[displayForGroup]['mapButton'].map(
                  (controlTypeName, index) => {
                    return (
                      <button
                        key={controlTypeName}
                        onClick={() => setSelectedButton(index)}
                        className={`selectButton ${
                          selectedButton === index ? 'active' : ''
                        }`}
                      >
                        {controlTypeName}
                      </button>
                    )
                  },
                )}
              </div>

              <div className="containerText">
                <span className="descriptionСontainerText">Или расскажи подробнее</span>
                <textarea
                  value={textDetailed}
                  onChange={e => setTextDetailed(e.target.value)}
                  placeholder="Комментарий"
                  className="first-form"
                />
              </div>
              <div className="possibleNumberFormSubmissions">
                Ты можешь отправить форму еще {20 - alreadySentFeedbackCount} раз.
              </div>
              <div className="containerButton">
                <button onClick={() => closeFeedback()} className="cancellation ">
                  Отмена
                </button>
                <button
                  className={`submit ${
                    selectedButton !== -1 || textDetailed !== '' ? '' : 'notValid'
                  }`}
                  onClick={sendFeedback}
                >
                  Отправить
                </button>
              </div>
            </div>
          )}
          {isSubmitted && (
            <div className="RequestSent">
              <div className="heartImg">
                <Heart />
              </div>
              <div className="title">Ответ отправлен!</div>
              <div className="gratitude">
                Каждый ответ помогает сделать наш сервис еще удобнее. Спасибо!
              </div>
              <div className="containerButton">
                <button className="closeModal" onClick={() => closeFeedback()}>
                  Круто
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div />
      )}
    </>
  )
}

export default RandomFeedback
