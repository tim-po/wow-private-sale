import React, { useContext, useEffect, useState } from 'react'
import './index.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from 'images/icons/Static/logo'
import BackButtonContext from '../../Context/BackButton'
import { navigationsItems } from './NavigationConfig'

// CONSTANTS

// DEFAULT FUNCTIONS

type HeaderPropType = {
  left: boolean
}

const Header = (props: HeaderPropType) => {
  const leftBlocks = ['/', '/diplomaShare']

  const [isHeaderPreAnimated, setIsHeaderPreAnimated] = useState(
    leftBlocks.includes(window.location.pathname),
  )

  useEffect(() => {
    setIsHeaderPreAnimated(leftBlocks.includes(window.location.pathname))
  }, [window.location.pathname, leftBlocks])

  // const { left } = props

  const { backButtonText, backButtonHref } = useContext(BackButtonContext)

  const navigate = useNavigate()
  const location = useLocation()

  const goBack = () => {
    navigate(backButtonHref)
  }

  return (
    <div className="Content">
      <div className="Header">
        <div
          className={`TrajectoriesLinkBack ${isHeaderPreAnimated ? 'preAnimated' : ''}`}
        >
          {/* <svg */}
          {/*   className="BackArrow" */}
          {/*   width="24" */}
          {/*   height="25" */}
          {/*   viewBox="0 0 24 25" */}
          {/*   fill="none" */}
          {/*   xmlns="http://www.w3.org/2000/svg" */}
          {/* > */}
          {/*   <path */}
          {/*     className="color" */}
          {/*     d="M14 8.08728L10 12.0873L14 16.0873" */}
          {/*     stroke="#6E6D79" */}
          {/*     strokeWidth="1.5" */}
          {/*     strokeLinecap="round" */}
          {/*     strokeLinejoin="round" */}
          {/*   /> */}
          {/* </svg> */}
          {/* <div className="BackText">{backButtonText}</div> */}
          <div className={'Navigation'}>
            {navigationsItems.map((item, index, array) => (
              <div
                key={item.path}
                className={`NavItem ${
                  location.pathname.includes(item.path) ? 'ActiveItem' : ''
                }`}
                onClick={
                  location.pathname.includes(array[index + 1]?.path) ? goBack : undefined
                }
              >
                <div className={'Icon'}></div>
                {item.title}
              </div>
            ))}
          </div>
        </div>

        <div className={`Logo ${isHeaderPreAnimated ? 'preAnimated' : ''}`}>
          <div className="LogoImg" onClick={() => navigate('/')}>
            <Logo />
          </div>
          <h2 className="LogoText">ITMO.TRACK</h2>
        </div>
      </div>
    </div>
  )
}

export default Header
