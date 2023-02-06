import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import Close from "../../images/icons/close";
import { isMobile } from "react-device-detect";

// CONSTANTS

// DEFAULT FUNCTIONS

export type GenericModalOwnProps = {
  hideMobile: boolean;
  hideDesktop: boolean;
  maxHeight?: boolean;
  onModalClose: () => void;
  colorCloseWhite: boolean;
  children: React.ReactNode | React.ReactNode[];
};

export interface GenericModalFullProps extends GenericModalOwnProps {
  isModalActive: boolean;
  modalCount: number;
  modalNumber: number;
  refLastModals?: React.RefObject<HTMLDivElement> | undefined;
  currentLastModals?: React.RefObject<HTMLDivElement> | undefined;
}

export type OptionalGenericModalProps = Partial<GenericModalOwnProps>;

const GenericModal = (props: GenericModalFullProps) => {
  const {
    hideMobile,
    hideDesktop,
    maxHeight,
    onModalClose,
    colorCloseWhite,
    children,
    isModalActive,
    modalNumber,
    modalCount,
    refLastModals,
    currentLastModals,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [blockContent, setBlockContent] = useState(false);
  const [height, setHeight] = useState<number>();
  const swapElement = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState<number>(0);
  const [deltaY, setDeltaY] = useState(0);
  const [prevMovementY, setPrevMovementY] = useState(0);
  const [isTouched, setIsTouched] = useState(false);

  const touchStart = (e: any) => {
    if (!isTouched) {
      // @ts-ignore
      setCardHeight(swapElement?.current?.offsetHeight);
      setIsTouched(true);
      setPrevMovementY(e.touches[0].clientY);
    }
  };

  const touchMove = (e: any) => {
    if (isTouched) {
      const deltaY = prevMovementY - e.touches[0].clientY;
      setDeltaY(deltaY);

      setCardHeight(cardHeight + deltaY);

      if (deltaY >= 150) {
        setCardHeight(window.screen.height - 80);
        setIsTouched(false);
      }

      if (deltaY <= -150) {
        setCardHeight(0);
        setIsTouched(false);
        modalClose();
      }

      setPrevMovementY(e.touches[0].clientY);
    }
  };

  const touchEnd = () => {
    if (isTouched) {
      setIsTouched(false);
      setPrevMovementY(0);

      if (deltaY > 0) {
        setCardHeight(250);
      }

      if (deltaY < 0) {
        setCardHeight(0);
        modalClose();
      }
    }
  };

  const modalClose = () => {
    setBlockContent(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 400);
    setTimeout(() => {
      onModalClose();
    }, 500);
  };

  useEffect(() => {
    setIsOpen(isModalActive);
    setBlockContent(isModalActive);
  }, [isModalActive]);
  useEffect(() => {
    const setHeightFunc = () => {
      setHeight(currentLastModals?.current?.getBoundingClientRect().top);
    };

    if (currentLastModals?.current) {
      currentLastModals.current.addEventListener(
        "animationstart",
        setHeightFunc
      );
    }
    return () => {
      if (currentLastModals?.current) {
        currentLastModals.current.removeEventListener(
          "animationstart",
          setHeightFunc
        );
      }
    };
  });
  const isAnimationModal = () => {
    if (isMobile && blockContent) {
      if (modalNumber === 0) {
        return modalCount > 1
          ? {
              maxHeight: `calc(100% - ${height}px + 30px)`,
              minHeight: `calc(100% - ${height}px + 30px)`,
            }
          : {
              minHeight: `${cardHeight}px`,
            };
      }
      return {
        minHeight: `${cardHeight}px`,
      };
    }
    return {};
  };
  return (
    <div
      className={`
      ModalContainer 
      ${hideMobile ? "hideMobile" : ""} 
      ${hideDesktop ? "hideDesktop" : ""}
      ${isOpen ? "active" : ""}
      ${maxHeight ? "maxHeight" : ""}
      `}
    >
      {isOpen && (
        <div className="ModalContainerShad deck" onClick={modalClose} />
      )}
      <div className="ModalTrack">
        {isOpen && (
          <div className="ModalContainerShad mobil" onClick={modalClose} />
        )}
        <div
          ref={modalCount > 1 ? refLastModals : null}
          className={`
          d-block
          TextCenter 
          ${blockContent ? "active" : ""}  
         
          `}
          style={isAnimationModal()}
        >
          <div
            className={"wrapHeaderModal"}
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
          >
            <button className="ImgCloseBtn" onClick={modalClose}>
              <Close
                width={12}
                height={12}
                color={colorCloseWhite ? "white" : undefined}
              />
            </button>
          </div>

          <div ref={swapElement} className={`modalContainer`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
