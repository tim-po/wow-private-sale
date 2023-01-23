import React, { useEffect } from "react";
import "./index.scss";
import { isMobile } from "react-device-detect";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { changeBg } from "../../utils/background";

// CONSTANTS

// DEFAULT FUNCTIONS

const NotFound = () => {
  const navigate = useNavigate()

  useEffect(()=>{
    changeBg('#F1F2F8')
  })

  return (
    <div className={"NotFound"}>
      <span className={"Title"}>404</span>
      <span className={"SubTitle"}>Страница не найдена</span>
      <div className={"ButtonGroup"}>
        <Button buttonStyle={"main"} classNames={["Button"]} onClick={() => navigate(-1)}>
          Назад
        </Button>
        <Button buttonStyle={"secondary"} classNames={["Button"]} onClick={() => navigate('/')}>
          На главную
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
