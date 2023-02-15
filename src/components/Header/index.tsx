import React, { useContext, useEffect, useMemo, useState } from 'react'
import './index.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from 'images/icons/Static/logo'
import BackButtonContext from '../../Context/BackButton'
import { navigationsItems } from './NavigationConfig'

// CONSTANTS

// DEFAULT FUNCTIONS

const Header = () => {
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

  const activeLocation = useMemo(() => {
    const navItem = navigationsItems.find(item =>
      location.pathname
        .slice(0, location.pathname.indexOf('?') + 1 || location.pathname.length)
        .split('/')
        .includes(item.path),
    )
    if (navItem) {
      navigationsItems[navigationsItems.indexOf(navItem)].passed = true
    }

    return navItem
      ? {
          item: navItem,
          index: navigationsItems
            .filter(item => !item.isOptional || item.passed)
            .indexOf(navItem),
        }
      : null
  }, [location.pathname])

  return (
    <div className="Content">
      <div className="Header">
        <div
          className={`TrajectoriesLinkBack ${isHeaderPreAnimated ? 'preAnimated' : ''}`}
        >
          {/* TODO вырезать этот блок, после завершения навигшации */}
          {/*  */}
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
            {navigationsItems
              .filter(item => !item.isOptional || item.passed)
              .map(
                (item, index, array) =>
                  ((activeLocation && item.passed) ||
                    (activeLocation && !item.isOptional)) && (
                    <button
                      key={item.path}
                      disabled={
                        index > activeLocation.index || index < activeLocation.index - 1
                      }
                      className={`NavItem ${
                        location.pathname.split('/').includes(item.path)
                          ? 'ActiveItem'
                          : ''
                      } ${index < activeLocation.index ? 'prev' : ''} ${
                        index > activeLocation.index ? 'next' : ''
                      }`}
                      onClick={
                        location.pathname.includes(array[index + 1]?.path)
                          ? goBack
                          : undefined
                      }
                    >
                      <div
                        className={`Icon ${
                          activeLocation.index - 1 <= index &&
                          index <= activeLocation.index + 1
                            ? 'withIcon'
                            : ''
                        }`}
                      >
                        {<item.icon />}
                      </div>
                      <span className={'StepTitle'}>{item.title}</span>
                    </button>
                  ),
              )}
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
