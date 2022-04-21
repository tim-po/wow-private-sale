import React, {useState} from "react";
import Button from "../common/Button.js";
import ConnectModal from "../common/ConnectModal";
import {useWeb3React} from "@web3-react/core";
import './index.css'
import {HidingText} from "../HidingText";

export const Header = () => {
  const {account, deactivate, active} = useWeb3React();
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  const [disconnectIsPossible, setDisconnectIsPossible] = useState(false)

  const disconnect = () => {
    if (disconnectIsPossible) {
      console.log({disconnectIsPossible})
      deactivate();
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