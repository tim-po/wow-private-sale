import React from "react";
// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props


export default () => {
  return (
    <svg width="93" className="starsWrap" height="81" viewBox="0 0 93 81" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="starAnimation starAnimationBlue"
            d="M29.6113 12.4014C30.1192 11.1574 31.8808 11.1574 32.3887 12.4014L39.7491 30.4292C39.9015 30.8024 40.1976 31.0985 40.5708 31.2509L58.5986 38.6113C59.8426 39.1192 59.8426 40.8808 58.5986 41.3887L40.5708 48.7491C40.1976 48.9015 39.9015 49.1976 39.7491 49.5708L32.3887 67.5986C31.8808 68.8426 30.1192 68.8426 29.6113 67.5986L22.2509 49.5708C22.0985 49.1976 21.8024 48.9015 21.4292 48.7491L3.40138 41.3887C2.15736 40.8808 2.15736 39.1192 3.40138 38.6113L21.4292 31.2509C21.8024 31.0985 22.0985 30.8024 22.2509 30.4292L29.6113 12.4014Z"
            fill="#8533FF" />
      <path className="starAnimation starAnimationYellow"
            d="M60.6113 54.4014C61.1192 53.1574 62.8808 53.1574 63.3887 54.4014L66.1105 61.0678C66.2628 61.441 66.559 61.7372 66.9322 61.8895L73.5986 64.6113C74.8426 65.1192 74.8426 66.8808 73.5986 67.3887L66.9322 70.1105C66.559 70.2628 66.2628 70.559 66.1105 70.9322L63.3887 77.5986C62.8808 78.8426 61.1192 78.8426 60.6113 77.5986L57.8895 70.9322C57.7372 70.559 57.441 70.2628 57.0678 70.1105L50.4014 67.3887C49.1574 66.8808 49.1574 65.1192 50.4014 64.6113L57.0678 61.8895C57.441 61.7372 57.7372 61.441 57.8895 61.0678L60.6113 54.4014Z"
            fill="#F9CF6B" />
      <path className="starAnimation starAnimationPurple"
            d="M70.1113 3.40138C70.6192 2.15736 72.3808 2.15736 72.8887 3.40138L77.4949 14.6834C77.6473 15.0566 77.9434 15.3527 78.3166 15.5051L89.5986 20.1113C90.8426 20.6192 90.8426 22.3808 89.5986 22.8887L78.3166 27.4949C77.9434 27.6473 77.6473 27.9434 77.4949 28.3166L72.8887 39.5986C72.3808 40.8426 70.6192 40.8426 70.1113 39.5986L65.5051 28.3166C65.3527 27.9434 65.0566 27.6473 64.6834 27.4949L53.4014 22.8887C52.1574 22.3808 52.1574 20.6192 53.4014 20.1113L64.6834 15.5051C65.0566 15.3527 65.3527 15.0566 65.5051 14.6834L70.1113 3.40138Z"
            fill="#C766D7" />
    </svg>

  );
};
