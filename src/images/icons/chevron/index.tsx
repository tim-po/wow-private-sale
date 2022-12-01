import React from 'react';

export enum Turn {
  left = 180,
  right = 0,
  up = -90,
  down = 90,
}

export default ({turn = Turn.right, width='6', height="12", color='#6E6D79'}) => {

  return (
    <svg width={width} height={height} transform={`rotate(${turn}deg)`} viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 11L5 6L1 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
