import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import preset from "../Preset";
import Progress from "../../static/icons/progress";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type PercentProgressPropType = {
  // You should declare props like this, delete this if you don't need props
  percent: number
}

const PercentProgress = (props: PercentProgressPropType) => {
  const { percent } = props;
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (31 * percent + 2 > count)
        setCount( count + 1);
    }, 20);
  },[count])

  return (
    <Progress count={count}/>
  );
};

export default PercentProgress;
