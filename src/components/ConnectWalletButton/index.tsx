import React, {useContext, useRef} from 'react';
import styled, {css} from "styled-components";
import WalletIcon from '../../icons/wallet'
import Metamask from "../../icons/metamask";
import Trust from "../../icons/trust";
import {useWeb3React} from "@web3-react/core";
import {injected, walletconnect} from "../../web3/connectors";
import {truncate} from "../../utils/common";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import {PopupContext} from "../../context";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

  :nth-last-child(1) {
    border-radius: 0 0 20px 20px;
  }

  ${({isShown}) => isShown && css`
    opacity: 1;
  `}
`

const Wallet = styled.div`
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  background: #fff;
  padding: 5px;
  cursor: pointer;
`

const ConnectWalletButton = () => {

	const walletConnectRef = useRef<HTMLDivElement | null>(null)
	const {activate, account} = useWeb3React()

	const {isOpen, setOpen}=useContext(PopupContext)

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
				<Wallet onClick={() => activate(injected)}>
					<Metamask/>
					<Text>Metamask</Text>
				</Wallet>
				<Wallet onClick={() => activate(walletconnect)}>
					<Trust/>
					<Text>Trust Wallet</Text>
				</Wallet>
			</WalletsWrapper>
		</Wrapper>
	);
};

export default ConnectWalletButton;
