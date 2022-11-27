import React, {useContext} from "react";
import './index.scss'
import spinner from "../../static/icons/spinner";

// CONSTANTS

// DEFAULT FUNCTIONS

type SpinnerPropType = {
    width: string
    spinnerStyle?: any
}

const Spinner = (props: SpinnerPropType) => {
    const {width, spinnerStyle} = props;

    return (
      <div
        className="spinner-container"
      >
        <div className="spinner" style={{...spinnerStyle}}>{spinner(width, width)}</div>
      </div>
    )
};

export default Spinner
