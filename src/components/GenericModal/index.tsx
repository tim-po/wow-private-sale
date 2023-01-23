import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import Close from "../../images/icons/close";
import Portal from "../hints/Portal";
import { isMobile } from "react-device-detect";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type GenericModalPropType = {
  // You should declare props like this, delete this if you don't need props
  hideMobile: boolean;
  hideDesktop: boolean;
  maxHeight?: boolean;
  onModalClose: () => void;
  colorCloseWhite: boolean;
  children: React.ReactNode | React.ReactNode[];
  modal: boolean;
  modalCount: number;
  modalNumber?: number;
  refLastModals?: React.RefObject<HTMLDivElement> | undefined;
  lengthListModalComponent?: number;
  currentLastModals?: HTMLDivElement | null;
};

const GenericModal = (props: GenericModalPropType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [doubleModal, setDoubleModal] = useState(false);
  const [blockContent, setBlockContent] = useState(false);
  const {
    lengthListModalComponent,
    hideMobile,
    hideDesktop,
    maxHeight,
    onModalClose,
    colorCloseWhite,
    children,
    modal,
    modalNumber,
    modalCount,
    refLastModals,
    currentLastModals,
  } = props;

  const modalClose = () => {
    setBlockContent(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
    setTimeout(() => {
      onModalClose();
    }, 500);
  };

  useEffect(() => {
    setIsOpen(modal);
    setBlockContent(modal);
  }, [modal]);
  useEffect(() => {});

  useEffect(() => {
    if (isOpen) setDoubleModal(true);
  }, [children]);

  return (
    <div
      className={`ModalContainer ${hideMobile ? "hideMobile" : ""} ${
        hideDesktop ? "hideDesktop" : ""
      } ${isOpen ? "active" : ""} ${maxHeight ? "maxHeight" : ""}`}
    >
      {isOpen && (
        <div className="ModalContainerShad deck" onClick={modalClose} />
      )}
      <div className="ModalTrack">
        {isOpen && (
          <div className="ModalContainerShad mobil" onClick={modalClose} />
        )}
        <div
          className={`d-block TextCenter ${blockContent ? "active" : ""}`}
          style={
            isMobile
              ? modalNumber && blockContent
                ? {
                    maxHeight: `calc(100% - ${
                      currentLastModals?.getBoundingClientRect().top
                    }px - 60px)`,
                  }
                : !modalNumber && blockContent && modalCount > 1
                ? {
                    transform: "scaleX(0.98)",
                  }
                : {}
              : {}

            // isMobile && modalNumber && blockContent
            //   ? {
            //       maxHeight: `calc(100% - ${
            //         currentLastModals?.getBoundingClientRect().top
            //       }px - 60px)`,
            //     }
            //   : {}
          }
        >
          <div className={"wrapHeaderModal"}>
            <button className="ImgCloseBtn" onClick={modalClose}>
              <Close
                width={12}
                height={12}
                color={colorCloseWhite ? "white" : undefined}
              />
            </button>
          </div>
          <div
            ref={refLastModals}
            className={`modalContainer ${doubleModal ? "doubleModal" : ""}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
