import React from "react";
import Cross, {CrossStyle} from "../cross";


export default ({ width = "14px", height = "14px", color = "#1F1F22" }) => {
  return (
      <Cross width={width} height={height} color={color} turn={CrossStyle.close}/>
  );
};
