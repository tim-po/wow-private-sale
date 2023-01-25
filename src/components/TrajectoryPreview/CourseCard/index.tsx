import React, { useRef, useState } from "react";
import "./index.scss";
import { allControllTypes } from "../../../constants";
import ControlTypeTile from "../../ControlTypeTile";
import { CourseType } from "../../../types";

//TYPES
interface ICourseCardProps {
  course: CourseType;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const CourseCard = (props: ICourseCardProps) => {
  const { course, onClick } = props
  const card = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ x: number, y: number }>({x:0, y:0})


  return (
    <div
      ref={card}
      className={`CourseCard`}
      key="index"
      onClick={onClick}
      style={
        {background: `radial-gradient(circle at ${position.x}px ${position.y}px,  rgba(255, 51, 247, 0.8) 0, var(--color-brand) var(--p)) no-repeat border-box border-box var(--color-brand)`}
    }
      onMouseMove={(event) => {
        if (card.current) {
          setPosition({ x: event.pageX - card.current.offsetLeft - 55, y: event.pageY-card.current.offsetTop -285})
          console.log({x:event.pageX-card.current.offsetLeft-55, y:event.pageY-card.current.offsetTop-285})
        }
      }}

    >
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
};

export default CourseCard;
