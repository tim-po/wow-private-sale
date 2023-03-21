import React, { MouseEventHandler, useContext, useEffect, useState } from 'react'
import './index.scss'
import Pluse from 'images/icons/plus'
import Keyword from '../../ui-kit/standard/Keyword'
import PresetIcon from '../../ui-kit/PresetIcon'
import KeywordsModal from '../Modals/KeywordsModal'
import { PresetType } from '../../types'
import ModalContext from '../../Context/Modal'

type PresetPropType = {
  preset: PresetType
  presetWindowSize?: React.MutableRefObject<null | HTMLDivElement>
  onClick?: () => void
  disabled?: boolean
  displayAdd?: boolean
  className?: string
  maxWidth?: number | undefined
}

const PresetDefaultProps = {
  somePropWithDefaultOption: 'default value',
}

const Preset = (props: PresetPropType) => {
  const { displayModal } = useContext(ModalContext)
  const [hidden, setHidden] = useState(false)
  const [declined, setDeclined] = useState(false)
  const [isFirst, setIsFirst] = useState(true)

  const { displayAdd, preset, onClick, disabled, presetWindowSize, className, maxWidth } =
    props

  const openKeywordsModal = () => {
    displayModal(<KeywordsModal keywords={preset.keywords} />)
  }

  const clickSelf: MouseEventHandler<HTMLButtonElement> = () => {
    if (disabled) {
      setDeclined(true)
      setTimeout(() => {
        setDeclined(false)
      }, 500)
    }

    if (onClick && !disabled) {
      setHidden(true)
      setTimeout(() => {
        onClick()
        setHidden(false)
      }, 200)
    }
  }

  useEffect(() => {
    setTimeout(() => setIsFirst(false), 200)
  })

  if (!preset) {
    return null
  }
  return (
    <div
      style={{ maxWidth: maxWidth }}
      ref={presetWindowSize ? presetWindowSize : undefined}
      className={`preset ${hidden ? 'hidePreset' : ''} ${
        onClick && !disabled ? 'iteractable' : ''
      } ${disabled ? 'disabled' : ''} ${declined ? 'declineAnimate' : ''} ${
        isFirst ? 'showPreset' : ''
      } ${className}`}
    >
      <div className="presetTopRow">
        <div className="presetIconFlex">
          <PresetIcon presetClass={preset.category} />
          {preset.category}
        </div>
        {onClick != undefined && (
          <button className="actionButton" onClick={clickSelf}>
            <div
              className={'iconContainer'}
              style={displayAdd ? {} : { transform: 'rotate(45deg)' }}
            >
              <Pluse />
            </div>
          </button>
        )}
      </div>
      <div className="presetTitle">{preset.title}</div>
      <div className="keywordsContainer">
        {preset.keywords.slice(0, 5).map(keyword => {
          return <Keyword key={keyword.id} keyword={keyword} bgColor="#D8D7FE" />
        })}
        {preset.keywords.length > 5 && (
          <button onClick={openKeywordsModal} className="openKeywordsModalButton">
            +{preset.keywords.length - 5}
          </button>
        )}
      </div>
      <button className="clickArea" onClick={clickSelf} />
    </div>
  )
}

Preset.defaultProps = PresetDefaultProps

export default Preset
