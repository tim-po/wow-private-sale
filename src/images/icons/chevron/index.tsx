import React from 'react';

export enum Turn {
  left = -180,
  right = 0,
  up = -90,
  down = 90,
}

export default ({turn = Turn.right, width='6', height="12", color='#6E6D79'}) => {
  const divStyle = {
    transform: `rotate(${turn}deg)`,

  };
  return (
    <svg width={width} height={height} style={divStyle} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 11L5 6L1 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
