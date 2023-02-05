import React from "react";

export default ({ color = "#B7B6BC" }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.58136 0 0 3.58136 0 8C0 12.4186 3.58136 16 8 16C12.4186 16 16 12.4186 16 8C16 3.58136 12.4186 0 8 0ZM8 1.23077C4.2611 1.23077 1.23077 4.2611 1.23077 8C1.23077 11.7389 4.2611 14.7692 8 14.7692C11.7389 14.7692 14.7692 11.7389 14.7692 8C14.7692 4.2611 11.7389 1.23077 8 1.23077Z"
        fill={color}
      />
      <path
        d="M8 3.96554C6.75347 3.96554 5.74359 4.97541 5.74359 6.22195C5.74359 6.56182 6.01911 6.83733 6.35897 6.83733C6.69884 6.83733 6.97436 6.56182 6.97436 6.22195C6.97436 5.65515 7.4332 5.19631 8 5.19631C8.5668 5.19631 9.02564 5.65515 9.02564 6.22195C9.02564 6.55478 8.8521 6.75027 8.48605 6.99709C8.03119 7.30277 7.38462 7.82683 7.38462 8.82051V9.02564C7.38462 9.36551 7.66013 9.64103 8 9.64103C8.33987 9.64103 8.61539 9.36551 8.61539 9.02564V8.82051C8.61539 8.47368 8.79728 8.27077 9.17275 8.01848L9.17351 8.01797C9.6178 7.71848 10.2564 7.20179 10.2564 6.22195C10.2564 4.97541 9.24653 3.96554 8 3.96554Z"
        fill={color}
      />
      <path
        d="M7.99918 10.6667C7.54769 10.6667 7.17739 11.033 7.17949 11.4894C7.18069 11.9415 7.54765 12.3077 8 12.3077C8.4531 12.3077 8.82051 11.9403 8.82051 11.4872C8.82051 11.0325 8.4515 10.6667 7.99918 10.6667Z"
        fill={color}
      />
    </svg>
  );
};
