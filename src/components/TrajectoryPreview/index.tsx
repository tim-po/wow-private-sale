import React, { FC } from "react";
import "./index.scss";
import { TrajectoryType } from "../../types";
import PercentProgress from "../PercentProgress";
import Chevron, { Turn } from "../../images/icons/chevron";
import { LocalStorageInteraction, withLocalStorage } from "../../utils/general";
import { useNavigate, useSearchParams } from "react-router-dom";
import CourseCard from "./CourseCard";

interface ITrajectoryPreview {
  trajectory: TrajectoryType;
  skeleton?: boolean;
}

const TrajectoryPreview: FC<ITrajectoryPreview> = ({ trajectory }) => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const shouldDrawScrollButton = (event: any) => {
    const element = event.target;
    if (!element) {
      element.classList.remove("Hidden");
      element.classList.remove("HiddenLeft");
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

  const scrollToRight = (event: any) => {
    event.target.parentNode.scrollLeft += Math.min(
      event.target.parentNode.clientWidth,
      460
    );
  };
  const scrollToLeft = (event: any) => {
    event.target.parentNode.scrollLeft -= Math.min(
      event.target.parentNode.clientWidth,
      460
    );
  };

  // const getControlTypesCount = (course: CourseType) => {
  //   const controlTypes: { [key: string]: number } = {
  //     exam: 0,
  //     credit: 0,
  //     diffCredit: 0,
  //     coursework: 0
  //   };
  //   const nameToKey: { [key: string]: string } = {
  //     "Экзамен": "exam",
  //     "Зачет": "credit",
  //     "Дифференцированный зачет": "diffCredit",
  //     "Курсовая работа": "coursework"
  //   };
  //   course.control_types_count.forEach((type) => {
  //     controlTypes[nameToKey[type.name]] = type.count;
  //   });
  //   return controlTypes;
  // };


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
          className="pt-3 trajectoryCardWrapper HiddenLeft"
          onLoad={shouldDrawScrollButton}
          onScroll={shouldDrawScrollButton}
        >
          <button className="ScrollBtn Right" onClick={scrollToRight}>
            <Chevron />
          </button>

          <button className="ScrollBtn Left" onClick={scrollToLeft}>
            <Chevron turn={Turn.left} />
          </button>
          {trajectory.courses.map((course) => {
            return (
              <CourseCard course={course} onClick={() => trajectoryChosen(trajectory, course.course)}/>
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
