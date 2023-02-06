import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import Heart from "../../../../images/icons/Static/heart";
import RandomFeedbackOpen from "../../../../images/icons/Static/randomFeedbackOpen";
import Close from "../../../../images/icons/close";
import { BASE_URL } from "../../../../constants";
import { useCookies } from "react-cookie";
import {
  LocalStorageInteraction,
  withLocalStorage,
} from "../../../../utils/general";
import FeedbackGroupIdContext from "../../../../Context/IdGroup";
import { isMobile } from "react-device-detect";
import * as events from "events";
import RandomFeedbackContext from "../../../../Context/RandomFeedback";

const feedbackDataByGroup: {
  [key: number]: { title: string; mapButton: string[] };
} = {
  1: {
    title: "Что-то на этой странице вызвало трудности?",
    mapButton: [
      "Поиск ключевых слов 🔎️",
      "Добавление/ удаление слов 🗑",
      "Все сложно  🤯",
      "Все понятно 👌",
    ],
  },
  2: {
    title: "Как тебе предложенные программы?",
    mapButton: [
      "Ничего не подошло ☹️",
      "Странные теги 🤔",
      "Мало информации  🤨",
      "Отлично 👌",
    ],
  },
  3: {
    title: "Что-то на этой странице вызвало трудности? ",
    mapButton: [
      "Выбор траектории ☹️",
      "Как перейти дальше 🤔",
      "Слишком много информации  🤯",
      "Все понятно 👌",
    ],
  },
  4: {
    title: "Удобно ли тебе знакомиться с образовательной программой ?",
    mapButton: ["Сложно разобраться  🤯", "Понятно 👌", "Удобнее в таблице ☹️"],
  },
  5: {
    title: "Что-то на этой странице вызвало трудности? ",
    mapButton: [
      "Как перейти дальше  🤔",
      "Сложные названия ☹️",
      "Все понятно 👌",
      "Слишком много информации  🤯",
      "Связь между предметами 🔗",
    ],
  },
  6: {
    title: "Ты хотел бы сохранить результат?",
    mapButton: [
      "Да, ссылкой на диплом  🔗",
      "Да, документом-таблицей 📄",
      "Нет ",
    ],
  },
  7: {
    title: "Что бы ты добавил в диплом?",
    mapButton: ["Всего достаточно  👌", "Примеры вакансий 📄"],
  },
};

const RandomFeedback = ({ displayForGroup = 0, feedbackType = "" }) => {
  const { isOpenRandomFeedback } = useContext(RandomFeedbackContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedButton, setSelectedButton] = useState<number>(-1);
  const [showFeedback, setShowFeedback] = useState(false);
  const [textDetailed, setTextDetailed] = useState("");
  const { groupId } = useContext(FeedbackGroupIdContext);
  const [cookie] = useCookies(["_ym_uid"]);
  const [isSeeIcon, setIsSeeIcon] = useState(true);
  const [alreadySentFeedbackCount, setAlreadySentFeedbackCount] = useState(
    withLocalStorage(
      { alreadySentFeedbackCount: 0 },
      LocalStorageInteraction.load
    ).alreadySentFeedbackCount
  );

  useEffect(() => {
    document.body.addEventListener("wheel", checkScrollDirection);
    function checkScrollDirection(event: WheelEvent) {
      if (checkScrollDirectionIsUp(event)) {
        setIsSeeIcon(false);
        setShowFeedback(false);
      } else {
        setIsSeeIcon(true);
      }
    }

    function checkScrollDirectionIsUp(event: WheelEvent) {
      if (event.deltaY) {
        return event.deltaY > 0;
      }
      return event.deltaY < 0;
    }
  });

  function sendFeedback() {
    const user = {
      email: "",
      score: selectedButton,
      text: `${feedbackDataByGroup[displayForGroup]["mapButton"][selectedButton]} ${textDetailed}`,
      user_id: cookie._ym_uid,
      feedback_type: displayForGroup,
    };
    axios
      .post(`${BASE_URL}feedback/`, user, {})
      .then((res) => {
        setIsSubmitted(true);
        setSelectedButton(-1);
        setTextDetailed("");
        setAlreadySentFeedbackCount(alreadySentFeedbackCount + 1);
        withLocalStorage(
          { alreadySentFeedbackCount: alreadySentFeedbackCount + 1 },
          LocalStorageInteraction.save
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function closeFeedback() {
    setTimeout(() => {
      setShowFeedback(false);
      setIsSubmitted(false);
    }, 100);
  }

  function openFeedback() {
    setShowFeedback(true);
  }
  useEffect(() => {
    setTimeout(() => {
      openFeedback();
    }, 2000);
  }, []);

  if (alreadySentFeedbackCount > 20 || displayForGroup !== groupId) {
    return null;
  }

  return (
    <>
      {!isOpenRandomFeedback ? (
        <div
          onClick={openFeedback}
          className={`container-form-random-feedback ${
            !showFeedback ? "feedbackSmall" : ""
          } ${isSeeIcon ? "" : "hideIcon"}`}
        >
          <RandomFeedbackOpen />
          {!isSubmitted && (
            <div className="form">
              <div className="wrapTitle">
                <span className="title">
                  {feedbackDataByGroup[displayForGroup]["title"]}
                </span>
                <button onClick={() => closeFeedback()}>
                  <Close />
                </button>
              </div>
              <div className="bottomFeedback">
                {feedbackDataByGroup[displayForGroup]["mapButton"].map(
                  (controlTypeName: string, index: any) => {
                    return (
                      <button
                        onClick={() => setSelectedButton(index)}
                        className={`selectButton ${
                          selectedButton === index ? "active" : ""
                        }`}
                      >
                        {controlTypeName}
                      </button>
                    );
                  }
                )}
              </div>

              <div className="containerText">
                <span className="descriptionСontainerText">
                  Или расскажи подробнее
                </span>
                <textarea
                  value={textDetailed}
                  onChange={(e) => setTextDetailed(e.target.value)}
                  placeholder="Комментарий"
                  className="first-form"
                />
              </div>
              <div className="possibleNumberFormSubmissions">
                Ты можешь отправить форму еще {20 - alreadySentFeedbackCount}{" "}
                раз.
              </div>
              <div className="containerButton">
                <button
                  onClick={() => closeFeedback()}
                  className="cancellation "
                >
                  Отмена
                </button>
                <button
                  className={`submit ${
                    selectedButton !== -1 || textDetailed !== ""
                      ? ""
                      : "notValid"
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
        <div></div>
      )}
    </>
  );
};

export default RandomFeedback;
