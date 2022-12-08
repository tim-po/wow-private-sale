import React, { useContext, useState } from "react";
import "./index.scss";
import axios from "axios";
import Heart from "../../../../images/icons/Static/heart";
import RandomFeedbackOpen from "../../../../images/icons/Static/randomFeedbackOpen";
import Close from "../../../../images/icons/close";
import { BASE_URL } from "../../../../constants";

const RandomFeedback = ({ displayForGroup = 0,   feedbackType = "" }) => {
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [selectButton, setSelectButton] = useState<any>("");
  const [checkShowFeedback, setCheckShowFeedback] = useState(true);
  const [dispatchFormCount, setDispatchFormCount] = useState(9);
  const [textDetailed, setTextDetailed] = useState("")
  const filling: any = {
    1: {
      title: "Что-то на этой странице вызвало трудности?",
      mapButton: ["Поиск ключевых слов 🔎️", "Добавление/ удаление слов 🗑", "Все сложно  🤯", "Все понятно 👌"],
    },
    2: {
      title: "Как тебе предложенные программы?",
      mapButton: ["Ничего не подошло ☹️", "Странные теги 🤔", "Мало информации  🤨", "Отлично 👌"]
    },
    3: {
      title: "Что-то на этой странице вызвало трудности? ",
      mapButton: ["Выбор траектории ☹️", "Как перейти дальше 🤔", "Слишком много информации  🤯", "Все понятно 👌"]
    },
    4: {
      title: "Удобно ли тебе знакомиться с образовательной программой ?",
      mapButton: ["Сложно разобраться  🤯", "Понятно 👌", "Удобнее в таблице ☹️"]
    },
    5: {
      title: "Что-то на этой странице вызвало трудности? ",
      mapButton: ["Как перейти дальше  🤔", "Сложные названия ☹️", "Все понятно 👌", "Слишком много информации  🤯", "Связь между предметами 🔗"]
    },
    6: {
      title: "Ты хотел бы сохранить результат?",
      mapButton: ["Да, ссылкой на диплом  🔗", "Да, документом-таблицей 📄", "Нет "]
    },
    7: { title: "Что бы ты добавил в диплом?", mapButton: ["Всего достаточно  👌", "Примеры вакансий 📄"] }
  };


  function validation() {
    setDispatchFormCount(dispatchFormCount - 1);
    setCheckSubmit(true);
  }

  function handleClick() {
    validation();
    const user = {
      email: email,
      score: dispatchFormCount,
      text: `${displayForGroup !== undefined ? filling[displayForGroup]["mapButton"][selectButton] : ""} ${textDetailed}`,
      user_id: `${displayForGroup}`,
      feedback_type: displayForGroup
    };
    console.log(user);
    axios.post(`${BASE_URL}/feedback/`, user, {}).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err.response);
    });
  }


  function closeFeedback(props: boolean | ((prevState: boolean) => boolean)) {
    setTimeout(() => {
      setCheckShowFeedback(props);
      setCheckSubmit(false);
    }, 100);
  }

  return (
    <div onClick={() => checkShowFeedback ? closeFeedback(false) : ""}
         className={`${checkShowFeedback ? "show" : ""} container-form-random-feedback`}>
      {checkShowFeedback ? <RandomFeedbackOpen />
        : <>
          {!checkSubmit ?
            <div className="form">
              <div className="wrapTitle">
                <span className="title">{filling[displayForGroup]["title"]}</span>
                <button onClick={() => closeFeedback(true)}>
                  <Close />
                </button>
              </div>
              <div className="bottomFeedback">
                {filling[displayForGroup]["mapButton"].map((controlTypeName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined, index: any) => {
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
                <textarea value={textDetailed} onChange={(e) => setTextDetailed(e.target.value)} placeholder="Комментарий"
                          className="first-form" />
              </div>
              <div className="possibleNumberFormSubmissions">
                Ты можешь отправить форму еще {dispatchFormCount} раз.
              </div>
              <div className="containerButton">
                <button onClick={() => closeFeedback(true)} className="cancellation ">Отмена</button>
                <button className={`submit ${dispatchFormCount > 0 && (selectButton !== '' || textDetailed!== '') ? "" : "notValid"}`}
                        onClick={handleClick}>Отправить
                </button>
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
          }</>}
    </div>

  );
};

export default RandomFeedback;
