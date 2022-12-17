import React from "react";


export function scrollToElement(hash=''){
  const scrollToContent = document.getElementById(hash);
    scrollToContent?.scrollIntoView({block: "center", behavior: "smooth"});
}

