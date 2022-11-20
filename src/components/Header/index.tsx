import React, { useContext, useEffect, useState} from "react";
import './index.scss'
import {useNavigate} from "react-router-dom";
import BackButtonContext from "../../Context/BackButton";
import HeaderContext from "../../Context/Header";
// @ts-ignore
import logo from "../../static/logo.svg";

// CONSTANTS

// DEFAULT FUNCTIONS

type HeaderPropType = {
  left?: boolean
}

const Header = (props: HeaderPropType) => {
  const {left} = props;

  const [isHeaderPreAnimated, setIsHeaderPreAnimated] = useState(!!left)

  const navigate = useNavigate()
  const {backButtonText, backButtonHref} = useContext(BackButtonContext)
  const {isHeaderAnimated, setIsHeaderAnimated} = useContext(HeaderContext)

  useEffect(() => {
    if(isHeaderAnimated){
      setIsHeaderPreAnimated(true)
      setTimeout(() => {
        setIsHeaderPreAnimated(false)
      }, 1000)
      setTimeout(() => {
        setIsHeaderAnimated(false)
      }, 3000)
    }
  })

  const goBack = () => {
    navigate(backButtonHref)
  }
  return (
    <div className="Content">
      <div className="Header">
        <div
          className={`TrajectoriesLinkBack ${isHeaderPreAnimated ? 'preAnimated' : ''}`}
          onClick={goBack}
        >
          <svg className="BackArrow" width="24" height="25" viewBox="0 0 24 25" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path className="color" d="M14 8.08728L10 12.0873L14 16.0873" stroke="#6E6D79" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="BackText">{backButtonText}</div>
        </div>
        <div
          className={`Logo ${isHeaderPreAnimated ? 'preAnimated' : ''}`}
        >
          <img className="LogoImg" src={logo} alt="logo" onClick={() => navigate('/professions')} />
          <h2 className="LogoText">ITMO.TRACK</h2>
        </div>
      </div>
    </div>
  )
};

export default Header