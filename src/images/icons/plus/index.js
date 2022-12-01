import React from "react";
import Cross, {CrossStyle} from "../cross";


export default ({color="#1F1F22"}) => {
  return (
    <Cross color={color} turn={CrossStyle.plus} width={'10'} height={'10'}/>
  );
};
