import React, { useState } from "react";
import './index.scss'
import axios from "axios";
import Heart from "../../../../images/icons/Static/heart";
import { BASE_URL } from "../../../../constants";
import {useCookies} from "react-cookie";

interface FeedbackStaticProps {
  isModalActive: boolean,
  onModalClose: () => void
}

const FeedbackStatic = (props: FeedbackStaticProps) => {

  const {isModalActive, onModalClose} = props

  const [checkSubmit, setCheckSubmit] = useState(false)
  const [email, setEmail] = useState("")
  const [text, setText] = useState("")
  const [values, setValues] = useState("");
  const [validationForm, setValidationForm] = useState<Boolean>(true)
  const [cookie] = useCookies(['_ym_uid']);

  if(!isModalActive){
    setTimeout(()=>{
      setCheckSubmit(false)
    },1000);
  }

  function handleClick() {
    if (text === '') {
      setValues('Это поле должно быть заполнено');
      setValidationForm(false)
      return
    }
    axios.post(`${BASE_URL}feedback/`, {email: email, text: text, feedback_type: 3, user_id: cookie._ym_uid}, {
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err.response);
    })
    setValidationForm(true)
    setCheckSubmit(true)
    setValues('')
  }
  // console.log(user.text)
  return (
    <div className="container-form">
      { !checkSubmit ?
      <div className="form">
        <div className="titleWrap">
        <span className="title">Расскажи, какой профессии тебе не хватает?</span>
        </div>
        <div className="containerText">
          <textarea  value={text} onChange={(e) => setText(e.target.value)} placeholder="Комментарий"
                    className={`${validationForm? '':'validation'} first-form`} />
          <span className="prompt">{values ? values : ''}</span>
        </div>
        <div className="containerEmail">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email"
                 className="secondary-form" />
          <span></span>
        </div>
        <div className="containerButton">
          <button className="cancellation" onClick={onModalClose}>Отмена</button>
          <button className="submit" onClick={handleClick}>Отправить</button>
        </div>
      </div>
      :
        <div className="RequestSent">
          <div className="heartImg">
            <Heart/>
          </div>
          <div className="title">Ответ отправлен!</div>
          <div className="gratitude">Каждый ответ помогает сделать наш сервис еще удобнее. Спасибо! </div>
          <div className="containerButton">
            <button className="closeModal" onClick={onModalClose}>Круто</button>
          </div>
        </div>
      }
    </div>

  );
};

export default FeedbackStatic;
