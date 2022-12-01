import React from "react";
import Cross from "../cross";
import { Turn } from "../chevron";


export default ({color="#1F1F22"}) => {
  return (
    <Cross color={color} turn={Turn.pluse} width={'10'} height={'10'}/>
  );
};
