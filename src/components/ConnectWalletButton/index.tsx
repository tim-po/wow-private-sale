import React, {useContext, useRef} from 'react';
import styled, {css} from "styled-components";
import WalletIcon from '../../icons/wallet'
import Metamask from "../../icons/metamask";
import Trust from "../../icons/trust";
import {useWeb3React} from "@web3-react/core";
import {injected, walletconnect} from "../../web3";
import {truncate} from "../../utils/common";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import {PopupContext} from "../../context";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 20;
`

const ConnectWalletWrapper = styled.div<{ isShown: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #fff;
  padding: 5px;
  width: 160px;
  border-radius: 20px;
  gap: 8px;
  z-index: 2;
  cursor: pointer;
  transition: border-radius .3s;
  border: 1px solid rgba(24, 24, 51, .3);

  ${({isShown}) => isShown && css`
    border-radius: 20px 20px 0 0;
  `}
`

const WalletIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #F5F5F5;
`

const Text = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #181833;
`

const WalletsWrapper = styled.div<{ isShown: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity .35s;
  overflow: hidden;
  position: absolute;
  z-index: 2;
  top: 60px;
  border: 1px solid rgba(24, 24, 51, .3);

  :nth-last-child(1) {
    border-radius: 0 0 20px 20px;
  }

  ${({isShown}) => isShown && css`
    opacity: 1;
  `}
`

const DropdownItem = styled.div`
  position: relative;
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  background: #fff;
  padding: 5px;
  cursor: pointer;
  z-index: 3;
  transition: background .3s;

  :hover {
    background: rgba(24, 24, 51, .05);
  }
`


const ConnectWalletButton = () => {

	const walletConnectRef = useRef<HTMLDivElement | null>(null)
	const {activate, account, deactivate} = useWeb3React()

	const {isOpen, setOpen} = useContext(PopupContext)

	const toggleWalletsShown = () => {
		setOpen(!isOpen)
	}

	useOnClickOutside(walletConnectRef, () => setOpen(false))

	return (
		<Wrapper ref={walletConnectRef}>
			<ConnectWalletWrapper onClick={toggleWalletsShown} isShown={isOpen}>
				<WalletIconWrapper>
					<WalletIcon/>
				</WalletIconWrapper>
				<Text>{account ? truncate(account) : 'Connect Wallet'}</Text>
			</ConnectWalletWrapper>
			<WalletsWrapper isShown={isOpen}>
				{
					!account &&
            <>
                <DropdownItem onClick={async () => {
									await activate(injected)
									setOpen(false)
								}}
                >
                    <Metamask/>
                    <Text>Metamask</Text>
                </DropdownItem>
                <DropdownItem onClick={async () => {
									await activate(walletconnect);
									setOpen(false)
								}}>
                    <Trust/>
                    <Text>Wallet Connect</Text>
                </DropdownItem>
            </>
				}
				{
					account &&
            <DropdownItem onClick={() => {
							deactivate()
							setOpen(false)
						}} style={{height: 30}}>
                <Text>Logout</Text>
            </DropdownItem>
				}
			</WalletsWrapper>
		</Wrapper>
	);
};

export default ConnectWalletButton;
