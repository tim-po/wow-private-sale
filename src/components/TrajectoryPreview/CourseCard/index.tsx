import React, { useRef } from "react";
import "./index.scss";
import { allControllTypes } from "../../../constants";
import ControlTypeTile from "../../ControlTypeTile";
import { CourseType } from "../../../types";
import { Colors } from "../../../utils/background";

//TYPES
interface ICourseCardProps {
  course: CourseType;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const makeBackgroundSpotlight = (at: { x: number, y: number }, forElement: HTMLElement, withBackgroundColor: string, spotlightColor: string, size?:number, ) => {
  const gradientCircle = `circle at ${at.x}px ${at.y}px`;
  let colorTransition = `${spotlightColor} 0, rgba(255, 255, 255, 0.01) 100px`;

  if (withBackgroundColor.includes('*') && !size) {
    let i = 50;
    let timer = setInterval(function() {
      console.log(--i)
      colorTransition = `${spotlightColor} 0px, rgba(255, 255, 255, 0.01) ${i*100/30}px`;
      forElement.style.background = `radial-gradient(${gradientCircle}, ${colorTransition}) no-repeat ${withBackgroundColor.replace('*', '')}`;
      if (i === 0) {
        forElement.style.background = ''
        clearInterval(timer)
      }
    }, 1)
  }
  else if(size){
    colorTransition = `${spotlightColor} 0px, rgba(255, 255, 255, 0.01) ${size}px`;
    forElement.style.background = `radial-gradient(${gradientCircle}, ${colorTransition}) no-repeat ${withBackgroundColor.replace('*', '')}`;
  }
  else {
    forElement.style.background = `radial-gradient(${gradientCircle}, ${colorTransition}) no-repeat ${withBackgroundColor}`;
  }
};

export const addSpotlightEffect = (ref: React.RefObject<HTMLElement>, defaultBg: Colors | string, hoverBg: Colors | string) => {

  return {
    onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {

      if (ref.current) {
        const element: HTMLElement = ref.current;
        const { left, top } = element.getBoundingClientRect();
        let i = 0;
        let timer = setInterval(function() {
          console.log(++i)

          makeBackgroundSpotlight(
            { x: event.clientX - left, y: event.clientY - top },
            element,
            hoverBg,
            'rgba(255, 255, 255, 0.5)',
            100*i/30
          )
          if (i === 50) {
            clearInterval(timer)
          }
        }, 1)
      }
    },
    // onMouseMove: (event: React.MouseEvent<HTMLElement>) => {
    //   if (ref.current) {
    //     const element: HTMLElement = ref.current;
    //     const { left, top } = element.getBoundingClientRect();
    //
    //     const savedElementTransition = element.style.transition;
    //     element.style.transition = "all 0.3s";
    //     element.style.backgroundPosition = "0 0";
    //     element.style.transition = savedElementTransition;
    //
    //       makeBackgroundSpotlight(
    //         { x: event.clientX - left, y: event.clientY - top },
    //         element,
    //         hoverBg,
    //         'rgba(255, 255, 255, 0.5)'
    //         // "#F0C64C"
    //       );
    //   }
    // },

    onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
      if (ref.current) {
        const element: HTMLElement = ref.current;
        const { left, top, width, height } = element.getBoundingClientRect();


        makeBackgroundSpotlight(
          { x: event.clientX - left, y: event.clientY - top },
          element,
          defaultBg,
          'rgba(255, 255, 255, 0.5)'
          // "#F0C64C"
        );

        // const exitTrajectoryX = (event.clientX - width / 2 - left) / width;
        // const exitTrajectoryY = (event.clientY - height / 2 - top) / height;
        // element.style.backgroundPosition = `${exitTrajectoryX * 200}px ${exitTrajectoryY * 200}px`;
      }
    }
  };
};

const CourseCard = (props: ICourseCardProps) => {
  const { course, onClick } = props;
  const card = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={card}
      className={`CourseCard`}
      key="index"
      onClick={onClick}
      style={{ backgroundColor: `var(--trajectories-bg-${course.course})` }}
      {...addSpotlightEffect(card, `*var(--trajectories-bg-${course.course})`, "var(--color-brand)")}
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
