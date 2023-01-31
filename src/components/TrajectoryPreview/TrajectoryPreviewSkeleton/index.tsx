import React from "react";
import "../index.scss";
import { randomNumberBetween } from "../../../utils/mathUtils";
import { makeEmptyList } from "../../../utils/general";

export const TrajectorySkeleton = () => {

  return <div className="TrajectoriesCard TrajectoriesCardSkeleton mb-3" style={{ flexShrink: 0, width: "100%" }}>
    <div className="TrajectoriesCardHeader">
      <div style={{ width: `min(550px, 70%)`, height: "39px" }}>
        <div className="skeleton-v3 mb-1"
             style={{ width: `min(${randomNumberBetween(330, 550, true)}px, 100%)`, height: "24px" }} />
        <div className={"eduDirectionCode skeleton-v3"} style={{ width: "60px", height: "15px" }} />
      </div>
      <div className="skeleton-v3 mb-1" style={{ width: "161px", height: "36px" }} />
    </div>
    <div style={{ position: "relative" }}>
      <div
        className="mt-3 trajectoryCardWrapper HiddenLeft"
      >
        {makeEmptyList(4).map((value, index) =>
          <div
            className={`CourseCard CourseCardSkeleton skeleton-v3`}
            key={index}
          >
          </div>
        )}
      </div>
    </div>
    <div className="mt-3 justify-content-between">
      <div className="TrajectoriesCardFooter">
        <div
          className="ButtonSkeleton ButtonTrajectory MainButton mr-2 skeleton-v3"
          style={{ width: "203px", margin:0}}
        />
        <div
          className="ButtonSkeleton ButtonTrajectory MainButton skeleton-v3"
          style={{ minWidth: "185px"}}
        />
      </div>
    </div>
  </div>;
};

export default TrajectorySkeleton
