import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Web3ReactProvider} from "@web3-react/core";
import {getLibrary} from "./web3/connectors";

import './fonts/Gilroy/Gilroy-Black.ttf';
import './fonts/Gilroy/Gilroy-BlackItalic.ttf';
import './fonts/Gilroy/Gilroy-Bold.ttf';
import './fonts/Gilroy/Gilroy-BoldItalic.ttf';
import './fonts/Gilroy/Gilroy-Extrabold.ttf';
import './fonts/Gilroy/Gilroy-ExtraboldItalic.ttf';
import './fonts/Gilroy/Gilroy-Heavy.ttf';
import './fonts/Gilroy/Gilroy-HeavyItalic.ttf';
import './fonts/Gilroy/Gilroy-Light.ttf';
import './fonts/Gilroy/Gilroy-LightItalic.ttf';
import './fonts/Gilroy/Gilroy-Medium.ttf';
import './fonts/Gilroy/Gilroy-MediumItalic.ttf';
import './fonts/Gilroy/Gilroy-Regular.ttf';
import './fonts/Gilroy/Gilroy-RegularItalic.ttf';
import './fonts/Gilroy/Gilroy-Semibold.ttf';
import './fonts/Gilroy/Gilroy-SemiboldItalic.ttf';
import './fonts/Gilroy/Gilroy-Thin.ttf';
import './fonts/Gilroy/Gilroy-ThinItalic.ttf';
import './fonts/Gilroy/Gilroy-UltraLightItalic.ttf';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
