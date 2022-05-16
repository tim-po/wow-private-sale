import React, {useContext, useState} from "react";
import Button from "../../../components/common/Button.js";
import ConnectModal from "../../../components/common/ConnectModal";
import {useWeb3React} from "@web3-react/core";
import './index.css'
// @ts-ignore
import {HidingText} from "../HidingText";
import logo from '../../images/MMProLogo.svg'
import arrowUp from '../../images/arrowUpWhite.svg'
import {LocaleSelector} from "../LocaleSelector";
import texts from './localization'
import {useLocale} from "../../hooks/useLocale";
import LocaleContext from "../../LocaleContext";
import {localized} from "../../hooks/localized";

export const Header = () => {
  const {account, deactivate, active, connector} = useWeb3React();
  const {locale} = useContext(LocaleContext)
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  const [disconnectIsPossible, setDisconnectIsPossible] = useState(false)
  const [isDisplayingMetamaskDisconnectTip, setIsDisplayingMetamaskDisconnectTip] = useState(false)

  const disconnect = () => {
    if (disconnectIsPossible) {
      // @ts-ignore
      if(connector && connector.walletConnectProvider){
        deactivate();
      }else{
        setIsDisplayingMetamaskDisconnectTip(true)
        setTimeout(()=>{
          setIsDisplayingMetamaskDisconnectTip(false)
        }, 5000)
      }
    } else {
      setDisconnectIsPossible(true)
      setTimeout(() => {
        setDisconnectIsPossible(false)
      }, 1500)
    }
  };

  function truncate(str: string) {
    return str.length > 0
      ? str.substr(0, 6) + "..." + str.substr(str.length - 4, str.length - 1)
      : str;
  }

  return (
    <>
      <header className="px-4 mx-auto py-4" style={{minWidth: 340}}>
        <div className="flex flex-row justify-between items-center w-full">
          <div>
            <a href="/#">
              <img
                src={logo}
                width="180"
                className="cursor-pointer"
                alt="FStaking"
              />
            </a>
          </div>
          {isDisplayingMetamaskDisconnectTip &&
            <div className={'flex items-center'}>
              <img src={arrowUp} className={'mr-2'}/>
              {localized(texts.MetaMaskDisconnectMessage, locale)}
            </div>
          }
          {/*<LocaleSelector/>*/}
          {!isDisplayingMetamaskDisconnectTip &&
            <>
              {!active ? (
                // @ts-ignore
                <Button
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  {localized(texts.ConnectWallet, locale)}
                </Button>
              ) : (
                <div className={'disconnect-button-container'}>
                  <div style={{zIndex: 2}}>
                    {/* @ts-ignore */}
                    <Button onClick={disconnect} bgColor={disconnectIsPossible ? "red-500" : "secondary"}>
                      <HidingText defaultText={truncate(`${account}`)} hidingText={localized(texts.Disconnect, locale)}
                                  peekOut={disconnectIsPossible}/>
                    </Button>
                  </div>
                </div>
              )}
            </>
          }
        </div>
      </header>
      <ConnectModal
        opened={isOpen}
        setError={setError}
        closeHandle={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};