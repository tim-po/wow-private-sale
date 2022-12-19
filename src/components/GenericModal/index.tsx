import React, {useContext, useEffect, useState} from "react";
import './index.scss'
import Close from "../../images/icons/close";
import {Events} from "react-scroll";
import ScrollEvent = Events.ScrollEvent;

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type GenericModalPropType = {
  // You should declare props like this, delete this if you don't need props
  hideMobile: boolean
  hideDesktop: boolean
  maxHeight?: boolean
  onModalClose: () => void
  colorCloseWhite: boolean
  children: React.ReactNode | React.ReactNode[]
  modal: boolean
}

const GenericModal = (props: GenericModalPropType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [blockContent, setBlockContent] = useState(false);
  const {hideMobile, hideDesktop, maxHeight, onModalClose, colorCloseWhite, children, modal} = props;

  const modalClose = () => {
    setBlockContent(false)
    setTimeout(()=>{
      setIsOpen(false)
    }, 300)
    setTimeout(() => {
      onModalClose()
    }, 500)
  }

  useEffect(() => {
    setIsOpen(modal)
    setBlockContent(modal)
  }, [modal])

  const preventScroll = (e: React.UIEvent) => {
    console.log('scroll')
    e.preventDefault()
  }

  useEffect(() => {
    if(modal){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = 'unset';
    }
  }, [modal]);


  return (
    <div
      onWheel={preventScroll}
      className={`ModalContainer ${hideMobile ? 'hideMobile' : ''} ${hideDesktop ? 'hideDesktop' : ''} ${isOpen ? 'active' : ''} ${maxHeight ? 'maxHeight' : ''}`}
    >
      {isOpen &&
        <div className="ModalContainerShad deck" onClick={modalClose}/>
      }
      <div className="ModalTrack">
        {isOpen &&
          <div className="ModalContainerShad mobil" onClick={onModalClose}/>
        }
        <div className={`d-block TextCenter ${blockContent ? 'activ': ''}`}>
          <button className="ImgCloseBtn" onClick={onModalClose}>
            <Close width={12} height={12} color={colorCloseWhite ? 'white': undefined} />
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}

export default GenericModal
