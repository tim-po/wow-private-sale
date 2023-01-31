import React, { FC } from "react";
import "./index.scss";
import { TrajectoryType } from "../../types";
import PercentProgress from "../PercentProgress";
import Chevron, { Turn } from "../../images/icons/chevron";
import { allControllTypes } from "../../constants";
import ControlTypeTile from "../ControlTypeTile";
import { LocalStorageInteraction, withLocalStorage } from "../../utils/general";
import { useNavigate, useSearchParams } from "react-router-dom";

interface ITrajectoryPreview {
  trajectory: TrajectoryType;
  skeleton?: boolean;
}

const TrajectoryPreview: FC<ITrajectoryPreview> = ({ trajectory }) => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const shouldDrawScrollButton = (event: React.SyntheticEvent<HTMLDivElement> | React.UIEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    if (!element) {
      // element.classList.remove("Hidden");
      // element.classList.remove("HiddenLeft");
      return;
    }

    if (element.scrollLeft + element.clientWidth >= element.scrollWidth - 10) {
      element.classList.add("Hidden");
      return;
    }

    if (element.scrollLeft <= 10) {
      element.classList.add("HiddenLeft");
      return;
    }

    element.classList.remove("HiddenLeft");
    element.classList.remove("Hidden");
  };
  const trajectoryChosen = (trajectory: TrajectoryType, course = 1) => {
    withLocalStorage(
      { chosenTrajectoriesIds: searchParams.get("ids") },
      LocalStorageInteraction.save
    );
    navigate(`/trajectory?id=${trajectory.id}&course=${course}`);
  };
  const scrollToRight = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    const parentNode = target.parentNode as HTMLElement;
    parentNode.scrollLeft += Math.min(
      parentNode.clientWidth,
      460
    );
  };
  const scrollToLeft = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    const parentNode = target.parentNode as HTMLElement;
    parentNode.scrollLeft -= Math.min(
      parentNode.clientWidth,
      460
    );
  };

  return (
    <div className="TrajectoriesCard mb-3" key={trajectory.id}>
      <div className="TrajectoriesCardHeader">
        <h5 className="trajectoryHeader mb-0">
          {trajectory.educational_plan}
          <span className={"eduDirectionCode"}>
            {trajectory.code.replace(/\.$/, "")}
          </span>
        </h5>
        <div className="d-flex align-items-center TrajectoriesCardProgress">
          <PercentProgress percent={trajectory.coverage} />
          <span className="ml-2">
            {Math.round(trajectory.coverage * 100)}% совпадений
          </span>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <div
          className="mt-3 trajectoryCardWrapper HiddenLeft"
          onLoad={shouldDrawScrollButton}
          onScroll={shouldDrawScrollButton}
        >
          <button className="ScrollBtn Right" onClick={scrollToRight}>
            <Chevron />
          </button>
          <button className="ScrollBtn Left" onClick={scrollToLeft}>
            <Chevron turn={Turn.left} />
          </button>
          {trajectory.courses.map((course, index) => {
            return (
              <div
                className={`CourseCard trajectories-bg-${index}`}
                key="index"
                onClick={() => trajectoryChosen(trajectory, index + 1)}
              >
                <div className="CourseCardHeader">{index + 1} курс</div>
                <div>
                  <div className="mt-2 smallTitle">Ты изучишь</div>
                  <div className="mt-2 keywordsWrapper row no-gutters">
                    {course.main_keywords
                      .slice(0, 5)
                      .map((keyword) => {
                        return (
                          <span
                            key={keyword}
                            className="keywordWrapper mr-2 mb-2"
                          >
                            {keyword}
                          </span>
                        );
                      })}
                  </div>
                </div>
                <div>
                  <div className="mt-3 smallTitle">Ты сдашь</div>
                  <div className="ControlCardContainer">
                    {allControllTypes.map((controlTypeName) => {
                      return (
                        <ControlTypeTile
                          controlType={
                            course.control_types_count.find(
                              (controlType) =>
                                controlType.name === controlTypeName
                            ) || { name: controlTypeName, count: 0 }
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-3 justify-content-between">
        <div className="TrajectoriesCardFooter">
          <button
            onClick={() => trajectoryChosen(trajectory)}
            className="ButtonTrajectory MainButton mr-2"
          >
            Смотреть траекторию
          </button>
          <a
            href={`https://abit.itmo.ru/en/programs/bachelor?title=${trajectory?.educational_plan.replace(
              "",
              "+"
            )}`}
            target="_blank"
            className="ButtonAbit"
          >
            Читать больше на abit.itmo.ru
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrajectoryPreview;
