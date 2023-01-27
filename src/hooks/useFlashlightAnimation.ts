import { MouseEvent, RefObject } from "react";
import { Colors } from "../utils/background";

export default (ref: RefObject<HTMLElement>, spotlightColor: Colors | string, withBackgroundColor: string) => {

  let size = 0;
  let maxSize = 20;

  return (event: MouseEvent<HTMLElement>, step: "enter" | "move" | "leave") => {
    if (ref.current) {
      const element: HTMLElement = ref.current;
      const { left, top } = element.getBoundingClientRect();
      const at = { x: event.clientX - left, y: event.clientY - top };
      const gradientCircle = `circle at ${at.x}px ${at.y}px`;

      if (step === "leave") {
        let timer = setInterval(function() {
          size = size - 1;
          let colorTransition = `${spotlightColor} 0px, rgba(255, 255, 255, 0.01) ${size * 100 / maxSize}px`;
          element.style.background = `radial-gradient(${gradientCircle}, ${colorTransition}) no-repeat ${withBackgroundColor}`;
          console.log(element.style.backgroundSize)
          if (size <= 0) {
            element.style.background=''
            clearInterval(timer);
          }
        }, 1);
      }

      if (step === "move") {
        let colorTransition = `${spotlightColor} 0px, rgba(255, 255, 255, 0.01) ${size * 100 / maxSize}px`;
        element.style.background = `radial-gradient(${gradientCircle}, ${colorTransition}) no-repeat ${withBackgroundColor}`;
      }

      if (step === "enter") {
        let timer = setInterval(function() {
          size = size + 1;
          if (size >= maxSize) {
            clearInterval(timer);
          }
        }, 1);
      }
    }
  };
}
