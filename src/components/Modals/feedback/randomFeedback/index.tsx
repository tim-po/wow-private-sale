import React, { useContext, useState } from "react";
import "./index.scss";
import axios from "axios";
import Heart from "../../../../images/icons/Static/heart";
import RandomFeedbackOpen from "../../../../images/icons/Static/randomFeedbackOpen";
import Close from "../../../../images/icons/close";

const RandomFeedback = ({ displayForGroup = "", title = "", selectButtons = [""], feedbackType = "" }) => {
  const [checkSubmit, setCheckSubmit] = useState(false);

  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const [selectButton, setSelectButton] = useState<any>();
  const [checkShowFeedback, setCheckShowFeedback] = useState(true);
  const [dispatchFormCount, setDispatchFormCount] = useState(9);
  function validation(){
      setDispatchFormCount(dispatchFormCount - 1);
      setCheckSubmit(true);
  }
  function handleClick() {
    validation()
      const user={ email: email, score: `${selectButton !== undefined? selectButtons[selectButton] : ''}`, text: text, user_id:displayForGroup, feedback_type: feedbackType }
      console.log(user);
      axios.post(`https://api-dev.track.la.itmo.su/feedback`, user, {}).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err.response);
    });
  }

  function closeFeedback(props: boolean | ((prevState: boolean) => boolean)) {
    setCheckShowFeedback(props);
    setCheckSubmit(false);
  }

  return (
    <div onClick={() => checkShowFeedback ? closeFeedback(false) : ""}
         className={`${checkShowFeedback ? "show" : ""} container-form-random-feedback`}>
      {checkShowFeedback ? <RandomFeedbackOpen />
        : <div>
          {!checkSubmit ?
            <div className="form">
              <div className="wrapTitle">
                <span className="title">{title}</span>
                <button onClick={() => closeFeedback(true)}>
                  <Close />
                </button>
              </div>
              <div className="bottomFeedback">
                {selectButtons.map((controlTypeName, index) => {
                  return (
                    <button onClick={() => setSelectButton(index)}
                            className={`selectButton ${selectButton === index ? "active" : ""}`}>{controlTypeName}</button>
                  );
                })}
              </div>

              <div className="containerText">
                <span className="descriptionСontainerText">
                  Или расскажи подробнее
                </span>
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Комментарий"
                          className="first-form" />
              </div>
              <div className="possibleNumberFormSubmissions">
                Ты можешь отправить форму еще {dispatchFormCount} раз.
              </div>
              <div className="containerButton">
                <button onClick={() => closeFeedback(true)} className="cancellation ">Отмена</button>
                <button className={`submit ${dispatchFormCount > 0 && selectButton !== undefined ? '' : 'notValid'}`} onClick={handleClick}>Отправить</button>
              </div>
            </div>
            :
            <div className="RequestSent">
              <div className="heartImg">
                <Heart />
              </div>
              <div className="title">Ответ отправлен!</div>
              <div className="gratitude">Каждый ответ помогает сделать наш сервис еще удобнее. Спасибо!</div>
              <div className="containerButton">
                <button className="closeModal" onClick={() => closeFeedback(true)}>Круто</button>
              </div>
            </div>
          }</div>}
    </div>

  );
};

export default RandomFeedback;
