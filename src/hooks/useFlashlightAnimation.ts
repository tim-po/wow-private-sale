import { MouseEvent, RefObject } from "react";
import { Colors } from "../utils/background";

export default (ref: RefObject<HTMLElement>, spotlightColor: Colors | string, withBackgroundColor: string, isMobile:boolean) => {

  let size = 0,
    maxSize = 100,
    at = { x: 0, y: 0 },
    state: 'enter' | 'leave' = 'leave',
    enterTimer: NodeJS.Timer,
    leaveTimer: NodeJS.Timer,
    mainRender: NodeJS.Timer;


  const clearBg = () =>{
    if (ref.current && ref.current.style.background !== "") {
      ref.current.style.background = "";
    }
  }

  const setPosition = (event: MouseEvent<HTMLElement>) => {
    if (ref.current) {
      const element: HTMLElement = ref.current;
      const { left, top } = element.getBoundingClientRect();
      at = { x: event.clientX - left, y: event.clientY - top };
    }
  }

  const renderFlashLight = () => {
    if (ref.current) {
      if(state === 'enter'){
        const gradientCircle = `circle at ${at.x}px ${at.y}px`;
        let colorTransition = `${spotlightColor} 0px, rgba(255, 255, 255, 0.01) ${size * 100 / maxSize}px`;
        ref.current.style.background = `radial-gradient(${gradientCircle}, ${colorTransition}) no-repeat ${withBackgroundColor}`;
      } else {
        clearBg()
      }
    }
  };

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
        state='leave'
        clearInterval(mainRender)
        clearInterval(leaveTimer)
        clearBg()
      }
  }


  return isMobile ? undefined : {
    onMouseEnter: (event: MouseEvent<HTMLElement>) => {
      state = 'enter'
      clearInterval(leaveTimer)
      mainRender = setInterval(renderFlashLight, 3)
      enterTimer = setInterval(flashlightAppear, 1)
      setPosition(event)
    },

    onMouseMove: (event: MouseEvent<HTMLElement>) => {
      setPosition(event)
    },

    onMouseLeave: (event: MouseEvent<HTMLElement>) => {
      clearInterval(enterTimer)
      leaveTimer = setInterval(flashlightDisappear, 1)
      setPosition(event)
    }
  }
}
