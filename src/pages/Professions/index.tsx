import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericModal from "../../components/GenericModal";
import HeaderContext from "../../Context/Header";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { Profession } from "../../types";
import ProfessionCard from "components/ProfessionCard";
import "./index.scss";
import {
  LocalStorageInteraction,
  makeEmptyList,
  withLocalStorage,
} from "../../utils/general";
import Close from "../../images/icons/close";
import FeedbackStatic from "../../components/Modals/feedback/feedbackStatic";
import { updateStickyBlocks } from "../../utils/stickyHeaders";
import { changeBg } from "../../utils/background";
// import FeedbackForm from
import ModalContext from "../../Context/Modal";

// CONSTANTS

// DEFAULT FUNCTIONS

const Professions = () => {
  const { setIsHeaderAnimated } = useContext(HeaderContext);
  const navigate = useNavigate();
  const [professionsWithCustomSvg, setProfessionsWithCustomSvg] = useState<
    Profession[]
  >([]);
  const [isProfessionsLoading, setIsProfessionsLoading] = useState(true);
  const [isFeedbackPopupVisible, setIsFeedbackPopupVisible] = useState(false);
  const [isFeedbackFormVisible, setIsFeedbackFormVisible] = useState(false);
  const { displayModal } = useContext(ModalContext);
  const professionChosen = (profession: any) => {
    setIsHeaderAnimated(true);
    withLocalStorage({ selectedPresetIds: [] }, LocalStorageInteraction.save);
    withLocalStorage({ addedKeywords: [] }, LocalStorageInteraction.save);

    navigate(`/professionDetails?id=${profession.id}&view=main`);
  };
  const openFeedbackStatic = () => {
    displayModal(
      <FeedbackStatic
        isModal={isFeedbackFormVisible}
        onModalClose={() => setIsFeedbackFormVisible(false)}
      />
    );
  };
  const getProfessions = async () => {
    setIsProfessionsLoading(true);
    const response = await axios.get(`${BASE_URL}professions/`);
    const professions: Profession[] = response.data;

    // const newProfessionsWithCustomSvg: Profession[] = []
    setProfessionsWithCustomSvg(professions);
    const newProfessionsWithCustomSvg: Profession[] = [];
    for (let i = 0; i < professions.length; i++) {
      const profession = professions[i];
      await fetch(`${BASE_URL}professions/${profession.id}/svg/`)
        .then((res) => res.json())
        .then((res) => {
          newProfessionsWithCustomSvg[i] = { ...profession, svg: res.svg };
        });
      // .finally(() => {
      //   setTimeout(() => {
      //     setIsProfessionsLoading(false)
      //   }, 1500)
      // })
    }
    await setProfessionsWithCustomSvg(newProfessionsWithCustomSvg);
    setIsProfessionsLoading(false);
  };

  useEffect(() => {
    changeBg("white");
    getProfessions().then(() => {
      setTimeout(() => setIsFeedbackPopupVisible(true), 2000);
    });
    updateStickyBlocks();
  }, []);

  return (
    <div className="ProfessionsPageContainer">
      <div className="ProfessionsContainer">
        <div className="d-flex justify-content-between CardHeaderWidth align-items-center">
          <h3 className="ProfessionTitle CardHeaderWidth">Выбери профессию</h3>
        </div>
        {/* @ts-ignore */}
        <div className="ProfessionContainer">
          {isProfessionsLoading &&
            makeEmptyList(12).map((number, index) => {
              return <div className="skeleton-v2" key={index} />;
            })}
          {professionsWithCustomSvg.map((profession) => {
            return (
              <button
                style={{ opacity: isProfessionsLoading ? 0 : 1 }}
                className="ProfessionCardButton"
                key={profession.id}
                onClick={() => professionChosen(profession)}
              >
                <ProfessionCard profession={profession} />
              </button>
            );
          })}
        </div>
        <div
          className={`ProfessionModalBottom ${
            isFeedbackPopupVisible
              ? "profession__modal__bottomOn"
              : "ProfessionModalBottomNon"
          }`}
        >
          <button
            className="CloseFeedback"
            onClick={() => setIsFeedbackPopupVisible(false)}
          >
            <Close width={10} height={10} />
          </button>
          <span className="Text">
            Сервис работает в тестовом режиме, список профессий будет
            дополняться.
            <button className="LinkText" onClick={openFeedbackStatic}>
              &#160;Расскажи, какой профессии тебе не хватает?
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Professions;
