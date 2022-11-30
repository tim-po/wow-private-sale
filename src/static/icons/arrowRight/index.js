import React from 'react';

export default (props) => {
  const { turn } = props;

  const getArrowsPosition = () => {
    if (turn === 'right') {
      return "rotate(0)";
    }

    if (turn === 'left') {
      return "rotate(90)";
    }
  };
  return (
    <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 11L5 6L1 1" transform={getArrowsPosition} stroke="#6E6D79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
