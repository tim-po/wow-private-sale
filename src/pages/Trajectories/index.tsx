import React, { useContext, useEffect, useState } from "react";
import BackButtonContext from "../../Context/BackButton";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import * as Scroll from "react-scroll";
import { TrajectoryType } from "../../types";
import PercentProgress from "../../components/PercentProgress";
import "./index.scss";
import { BASE_URL } from "../../constants";
import Close from "../../images/icons/close";
import { LocalStorageInteraction, makeEmptyList, withLocalStorage } from "../../utils/general";
import FeedbackGroupIdContext from "../../Context/IdGroup";
import RandomFeedback from "../../components/Modals/feedback/randomFeedback";
import { createStickyBlock, updateStickyBlocks } from "../../utils/stickyHeaders";
import { changeBg } from "../../utils/background";
import NotFound from "../../components/NotFound";

// CONSTANTS

const randomFeedback = {
  firstOptionSelectButton: [
    "Ничего не подошло 🥲️",
    "Странные теги 🤔",
    "Мало информации  🤨",
    "Отлично 👌"
  ],
  secondOptionSelectButton: [
    "Выбор траектории 🥲️",
    "Как перейти дальше 🤔",
    "Слишком много информации  🤯",
    "Все понятно 👌"
  ]
};

// DEFAULT FUNCTIONS

const Trajectories = () => {
  const { group_id } = useContext<any>(FeedbackGroupIdContext);
  // const [width, setWidth] = useState(0);
  const [trajectories, setTrajectories] = useState([]);
  // const [trajectoriesIds, setTrajectoriesIds] = useState([]);
  const { setNewBackButtonProps } = useContext(BackButtonContext);
  const [searchParams] = useSearchParams();
  const [responseError, setResponseError] = useState<unknown>()
  const navigate = useNavigate();
  useEffect(() => {
    changeBg("#F1F2F8");
    const professionId = withLocalStorage({ professionId: null }, LocalStorageInteraction.load).professionId;
    setNewBackButtonProps("Выбор ключевых слов и пресетов", `/professionDetails?view=main&id=${professionId}`);
    if (trajectories.length === 0) {
      try{
        const trajectoryIds = JSON.parse(searchParams.get("ids") || "[]");
        // setTrajectoriesIds(trajectoryIds);
        axios.get(`${BASE_URL}trajectories/?ids=${trajectoryIds.join(',')}`).then(res => {
          setTrajectories(res.data);
        }).catch(e =>setResponseError(e))
      } catch (e){
        setResponseError(e)
      }

    }
    let scroll = Scroll.animateScroll;
    scroll.scrollToTop();

    updateStickyBlocks();
  }, []);


  if(responseError){
    return <NotFound/>
  }

  return (
    <div className="pb-3">
      <h1 className="TrajectoryChoiceHeader" {...createStickyBlock(1)}>
        Готовые траектории
      </h1>

      <div className={"animationWrap"}>
        <div className="TrajectoriesInfoCard align-items-center">
          <PercentProgress percent={0.8} />
          Мы собрали подходящие для тебя образовательные программы в ИТМО.
          <br />
          Индикатор показывает совпадение с ключевыми словами.
          <button
            className="border-0 pr-0 py-0 hideButton"
            onClick={() => {
              const card = document.querySelector(".Не");
              if (card) card.classList.toggle("Hidden");
            }}
          >
            <Close width={10} height={10} />
          </button>
        </div>
      </div>


      {trajectories.length ?
        trajectories.map((trajectory) =>
          <TrajectoryPreview trajectory={trajectory}/>
        ) :
        makeEmptyList(5).map(()=>
          <TrajectorySkeleton/>
        )}
      <RandomFeedback displayForGroup={2} />
      <RandomFeedback displayForGroup={3} />
    </div>
  );
};

export default Trajectories;
