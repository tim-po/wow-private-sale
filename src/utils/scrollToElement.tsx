import React from "react";
import {calculateTotalStickyHeight} from "./stickyHeaders";


export function scrollToElement(hash=''){
  const scrollToContent = document.getElementById(hash);
    // scrollToContent?.scrollIntoView({block: "start", behavior: "smooth"});
  if(scrollToContent){
    console.log(calculateTotalStickyHeight())
    const stickyTop = calculateTotalStickyHeight()
    window?.scrollTo({top: scrollToContent?.offsetTop - stickyTop, behavior: 'smooth'})
  }
}

