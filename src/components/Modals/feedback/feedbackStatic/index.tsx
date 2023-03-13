import React, { MouseEventHandler, useContext, useState } from 'react'
import './index.scss'
import Heart from '../../../../images/icons/Static/heart'
import ModalContext from '../../../../Context/Modal'
import { BASE_URL } from '../../../../constants'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import {
  useCustomValidationState,
  validationFuncs,
} from '../../../../hooks/useValidationState'
import Button from '../../../ui-kit/Button'

type FeedbackStaticProps = {
  onFeedbackSend: () => void
}

const FeedbackStatic = ({ onFeedbackSend }: FeedbackStaticProps) => {
  const [cookie] = useCookies(['_ym_uid'])
  const { closeModal } = useContext(ModalContext)
  // const [email, setEmail] = useState<string>('')
  // const [text, setText] = useState<string>('')

  const [isFeedbackLeft, setIsFeedbackLeft] = useState<boolean>(false)

  const [[text, setText], isTextValid, validateText] = useCustomValidationState<string>(
    '',
    validationFuncs.hasValue,
    true,
  )
  const [[email, setEmail], isEmailValid, validateEmail] =
    useCustomValidationState<string>(
      '',
      newEmail => validationFuncs.isEmail(newEmail) || newEmail === '',
      true,
    )

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    console.log('click')
    validateText()
    validateEmail()

    if (email && !isEmailValid) {
      return
    }

    if (!text) {
      return
    }

    if (isEmailValid && isTextValid) {
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
              className={`${isTextValid ? '' : 'validation'}`}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Комментарий"
              onBlur={() => validateText()}
            />
            <span className="caption">
              {isTextValid
                ? null
                : 'Тут можно написать комментарий, без него отзыв не отправить 🙃'}
            </span>
          </div>

          <div className="containerEmail">
            <input
              className={`${isEmailValid ? '' : 'validation'}`}
              value={email}
              type={'email'}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              onBlur={() => validateEmail()}
            />
            <span className="caption">{isEmailValid ? null : 'Не корректный email'}</span>
          </div>

          <div className="containerButton">
            <Button buttonStyle={'secondary'} onClick={closeModal} classNames={['btn']}>
              Отмена
            </Button>

            <Button
              buttonStyle={'main'}
              onClick={handleClick}
              classNames={['btn']}
              isDisabled={!text}
            >
              Отправить
            </Button>
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
            <Button buttonStyle={'main'} onClick={closeModal} classNames={['btn']}>
              Круто
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeedbackStatic
