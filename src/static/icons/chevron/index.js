import React from 'react';



export default ({turn= 0, width='6', height="12", color='#6E6D79'}) => {

  return (
    <svg width={width} height={height} transform={`rotate(${turn})`} viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 11L5 6L1 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
