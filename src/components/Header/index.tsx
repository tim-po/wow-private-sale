import React, { useContext, useEffect, useMemo, useState } from 'react'
import './index.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from 'images/icons/Static/logo'
import BackButtonContext from '../../Context/BackButton'
import {
  navigationItemKeys,
  navigationItems,
} from '../../Models/navigation/NavigationConfig'
import useNavigation from '../../Models/navigation/useNavigation'
import NavigationStep from './NavigationStep'
import { createStickyBlock } from '../../utils/stickyHeaders'

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

  const navigate = useNavigate()

  return (
    <div className="Content" {...createStickyBlock(0)}>
      <div className="Header">
        <div
          className={`TrajectoriesLinkBack ${isHeaderPreAnimated ? 'preAnimated' : ''}`}
        >
          <div className={'Navigation'}>
            {navigationItemKeys.map(navigationItemKey => {
              return (
                <NavigationStep key={navigationItemKey} stepPath={navigationItemKey} />
              )
            })}
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
