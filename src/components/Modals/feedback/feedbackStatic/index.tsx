import React, { MouseEventHandler, useContext, useState } from 'react'
import './index.scss'
import Heart from '../../../../images/icons/Static/heart'
import ModalContext from '../../../../Context/Modal'
import { BASE_URL } from '../../../../constants'
import { useCookies } from 'react-cookie'
import axios from 'axios'

type ErrorType = string | null | undefined
type FeedbackStaticProps = {
  onFeedbackSend: () => void
}

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

const FeedbackStatic = ({ onFeedbackSend }: FeedbackStaticProps) => {
  const [cookie] = useCookies(['_ym_uid'])
  const { closeModal } = useContext(ModalContext)
  const [email, setEmail] = useState<string>('')
  const [text, setText] = useState<string>('')

  const [isFeedbackLeft, setIsFeedbackLeft] = useState<boolean>(false)

  const [validationErrors, setValidationErrors] = useState<{
    text: ErrorType
    email: ErrorType
  }>({
    text: null,
    email: null,
  })

  const validateValue = (value: string, field: 'text' | 'email', message: string) => {
    if (!value) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: message,
      }))
    } else {
      setValidationErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (email && !EMAIL_REGEXP.test(email)) {
      setValidationErrors(prevState => ({ ...prevState, email: 'email некорректный' }))
      return
    }

    if (!text) {
      setValidationErrors(prevState => ({ ...prevState, text: 'Введите комментарий' }))
      return
    }

    if (!Object.values(validationErrors).filter(item => !!item).length) {
      axios
        .post(
          `${BASE_URL}feedback/`,
          {
            email: email,
            text: text,
            feedback_type: 3,
            user_id: cookie._ym_uid,
          },
          {},
        )
        .then(() => {
          onFeedbackSend()
          setIsFeedbackLeft(true)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  return (
    <div className="wrap">
      {!isFeedbackLeft ? (
        <>
          <div className="title">Расскажи, какой профессии тебе не хватает?</div>

          <div className="containerText">
            <textarea
              className={`${validationErrors.text ? '' : 'validation'}`}
              value={text}
              onChange={e => {
                const value = e.target.value
                validateValue(
                  value,
                  'text',
                  'Тут можно написать комментарий, без него отзыв не отправить 🙃',
                )
                setText(value)
              }}
              placeholder="Комментарий"
            />
            <span className="caption">{validationErrors.text}</span>
          </div>

          <div className="containerEmail">
            <input
              className={`${validationErrors.email ? '' : 'validation'}`}
              value={email}
              type={'email'}
              onChange={e => {
                const value = e.target.value
                setValidationErrors(prevState => ({ ...prevState, email: null }))
                setEmail(value)
              }}
              placeholder="Email"
            />
            <span className="caption">{validationErrors.email}</span>
          </div>

          <div className="containerButton">
            <button className="cancellation btn" onClick={closeModal}>
              Отмена
            </button>
            <button className="submit btn" onClick={handleClick} disabled={!text}>
              Отправить
            </button>
          </div>
        </>
      ) : (
        <div className="RequestSent">
          <div className={'rotateWrap'}>
            <div className="heartImg">
              <Heart />
            </div>

            <div>
              <div className="title">Ответ отправлен!</div>
              <div className="gratitude">
                Каждый ответ помогает сделать наш сервис еще удобнее. Спасибо!
              </div>
            </div>
          </div>

          <div className="containerButton">
            <button className="submit btn" onClick={closeModal}>
              Круто
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeedbackStatic
