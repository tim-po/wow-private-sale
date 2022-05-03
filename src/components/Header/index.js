import React, {useState} from "react";
import Button from "../common/Button.js";
import ConnectModal from "../common/ConnectModal";
import {useWeb3React} from "@web3-react/core";
import './index.css'
import {HidingText} from "../HidingText";

export const Header = () => {
  const {account, deactivate, active, connector} = useWeb3React();
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  const [disconnectIsPossible, setDisconnectIsPossible] = useState(false)
  const [isDisplayingMetamaskDisconnectTip, setIsDisplayingMetamaskDisconnectTip] = useState(false)

  console.log(connector)

  const disconnect = () => {
    if (disconnectIsPossible) {
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

  function truncate(str) {
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
                src="/images/MMProLogo.svg"
                width="180"
                className="cursor-pointer"
                alt="FStaking"
              />
            </a>
          </div>
          {isDisplayingMetamaskDisconnectTip &&
          <div className={'flex items-center'}> <img src={'/images/arrowUpWhite.svg'} className={'mr-2'}/> Please disconnect using MetaMask</div>
          }
          {!isDisplayingMetamaskDisconnectTip &&
            <>
              {!active ? (
                <Button
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Connect Wallet
                </Button>
              ) : (
                <div className={'disconnect-button-container'}>
                  <div style={{zIndex: 2}}>
                    <Button onClick={disconnect} bgColor={disconnectIsPossible ? "red-500" : "secondary"}>
                      <HidingText defaultText={truncate(account)} hidingText={'Disconnect'}
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