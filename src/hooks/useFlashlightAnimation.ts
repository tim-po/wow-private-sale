import { MouseEvent, RefObject } from "react";
import { Colors } from "../utils/background";

export default (ref: RefObject<HTMLElement>, spotlightColor: Colors | string, withBackgroundColor: string) => {

  let size = 0,
    maxSize = 100,
    at = { x: 0, y: 0 },
    enterTimer: NodeJS.Timer,
    leaveTimer: NodeJS.Timer,
    mainRender: NodeJS.Timer;


  const flashlightAppear = () => {
    if (ref.current) {
      size+=2.5
      if(size >= maxSize){
        clearInterval(enterTimer)
      }
    }
  }

  const flashlightDisappear = () => {
      size-=2.5
      if(size <= 0){
        clearInterval(mainRender)
        clearInterval(leaveTimer)
        if(ref.current){
          ref.current.style.background = '';
        }
      }
  }

  const renderFlashLight = () => {
    if (ref.current) {
      const gradientCircle = `circle at ${at.x}px ${at.y}px`;
      let colorTransition = `${spotlightColor} 0px, rgba(255, 255, 255, 0.01) ${size * 100 / maxSize}px`;
      ref.current.style.background = `radial-gradient(${gradientCircle}, ${colorTransition}) no-repeat ${withBackgroundColor}`;
    }
  };


  return {
    enter: (event: MouseEvent<HTMLElement>) => {
      clearInterval(leaveTimer)
      mainRender = setInterval(renderFlashLight, 3)
      enterTimer = setInterval(flashlightAppear, 3)

      if (ref.current) {
        const element: HTMLElement = ref.current;
        const { left, top } = element.getBoundingClientRect();
        at = { x: event.clientX - left, y: event.clientY - top };
      }
    },

    move: (event: MouseEvent<HTMLElement>) => {
      if (ref.current) {
        const element: HTMLElement = ref.current;
        const { left, top } = element.getBoundingClientRect();
        at = { x: event.clientX - left, y: event.clientY - top };
      }
    },

    leave: (event: MouseEvent<HTMLElement>) => {
      clearInterval(enterTimer)
      clearInterval(enterTimer)
      leaveTimer = setInterval(flashlightDisappear, 3)
      if (ref.current) {
        const element: HTMLElement = ref.current;
        const { left, top } = element.getBoundingClientRect();
        at = { x: event.clientX - left, y: event.clientY - top };
      }
    }
  };
}
