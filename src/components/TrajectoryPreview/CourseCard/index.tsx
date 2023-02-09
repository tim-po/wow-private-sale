import React from "react";
import "./index.scss";
import { allControllTypes } from "../../../constants";
import ControlTypeTile from "../../ControlTypeTile";
import { CourseType } from "../../../types";


interface CourseCardProps {
  course?: CourseType;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}


const CourseCard = (props: CourseCardProps) => {
  const { course, onClick } = props;
  const isSkeleton = !course

  return (
    <div
      className={`CourseCard ${isSkeleton ? 'MainSkeleton' : `trajectories-bg-${course.course}`}`}
      onClick={onClick}
    >
      {!isSkeleton &&
        <>
          <div className="CourseCardHeader">{course.course} курс</div>
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
                    key={controlTypeName}
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
        </>}
    </div>
  );
};

export default CourseCard;
