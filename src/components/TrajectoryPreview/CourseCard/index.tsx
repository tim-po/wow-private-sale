import React, {useRef, useState} from "react";
import "./index.scss";
import {allControllTypes} from "../../../constants";
import ControlTypeTile from "../../ControlTypeTile";
import {CourseType} from "../../../types";

//TYPES
interface ICourseCardProps {
  course: CourseType;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const makeBackgroundSpotlight = (at: { x: number, y: number }, forElement: HTMLElement, withBackgroundColor: string, spotlightColor: string) => {
  const gradientCircle = `circle at ${at.x}px ${at.y}px`
  const colorTransition = `${spotlightColor} 0, rgba(255, 255, 255, 0.0) 100px`

  forElement.style.background = `radial-gradient(${gradientCircle}, ${colorTransition}) no-repeat, ${withBackgroundColor}`
}

const addSpotlightEffect = (ref: React.RefObject<HTMLElement>) => {
  return {
    onMouseMove: (event: React.MouseEvent<HTMLElement>) => {
      if(ref.current) {
        const element: HTMLElement = ref.current
        const {left, top} = element.getBoundingClientRect()

        const savedElementTransition = element.style.transition
        element.style.transition = 'none'
        element.style.backgroundPosition = '0 0'
        element.style.transition = savedElementTransition

        makeBackgroundSpotlight(
          {x: event.clientX - left, y: event.clientY - top},
          element,
          'var(--color-brand)',
          'rgba(255, 51, 247, 0.8)',
        )
      }
    },

    onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
      if(ref.current) {
        const element: HTMLElement = ref.current
        const {left, top, width, height} = element.getBoundingClientRect()
        makeBackgroundSpotlight(
          {x: event.clientX - left, y: event.clientY - top},
          element,
          'var(--color-brand)',
          'rgba(255, 51, 247, 0.8)',
        )

        const exitTrajectoryX = (event.clientX - width/2 - left)/width
        const exitTrajectoryY = (event.clientY - height/2 - top)/height
        element.style.backgroundPosition = `${exitTrajectoryX * 200}px ${exitTrajectoryY * 200}px`;
      }
    },
  }
}

const CourseCard = (props: ICourseCardProps) => {
  const {course, onClick} = props
  const card = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ x: number, y: number }>({x: 0, y: 0})


  return (
    <div
      ref={card}
      className={`CourseCard`}
      key="index"
      onClick={onClick}
      {...addSpotlightEffect(card)}
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
                  ) || {name: controlTypeName, count: 0}
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
