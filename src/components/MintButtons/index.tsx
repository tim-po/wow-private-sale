import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import Mmpro from "../../icons/mmpro";
import Usdt from "../../icons/usdt";
import {useWeb3React} from "@web3-react/core";
import {NotificationContext, PopupContext} from "../../context";
import {useMMProContract, usePrivateSaleContract, useUSDTContract} from "../../hooks/useContracts";
import fromExponential from "from-exponential";
import {getPrivateSaleAddress} from "../../web3/address";
import Spinner from "../../ui/Spinner";
import BigNumber from "bignumber.js";

const ALLOWANCE = 10 ** 10 * 10 ** 18

const SLIPPAGE_PERCENT = 0.93

const DEADLINE_OVER_NOW = 1000

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ButtonsWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 32px;
  z-index: 2;

  @media screen and (max-width: 600px) {
    width: min-content;
    margin-bottom: 40px;
  }


`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 190px;
  height: 60px;
  background: ${({disabled}) => disabled ? '#7D7D91' : 'linear-gradient(135deg, #33CC9B 0%, #33CC74 100%)'};
  border-radius: 36px;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  text-transform: uppercase;
  color: #FFFFFF;
  border: none;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    width: 159px;
    height: 54px;

    font-family: 'Gilroy', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 125%;
  }
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: #181833;
  border-radius: 50%;
`

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const PriceText = styled.span`
  font-weight: 600;
  font-size: 40px;
  line-height: 49px;
  text-transform: uppercase;
  color: #181833;

  @media screen and (max-width: 600px) {
    font-family: 'Gilroy', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 32px;
    text-transform: uppercase;
  }

`

const CurrencyText = styled.span`
  font-weight: 400;
  font-size: 24px;
  line-height: 49px;
  text-transform: uppercase;
  color: #181833;

  @media screen and (max-width: 600px) {
    font-family: 'Gilroy', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23.54px;
    text-transform: uppercase;
  }
`

const PriceTextsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 8px;
`

const ButtonOverlay = styled.button<{ notConnected: boolean }>`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  display: ${({notConnected}) => notConnected ? 'none' : 'normal'};
  background: rgba(256, 256, 256, 0.8);
  border-radius: 59px;
  border: 1px solid #33CC9B;

  font-family: 'Gilroy', serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  color: #33CC9B;
  cursor: pointer;
`

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
`

type BuyButtonProps = {
	mmproDisabled: boolean
	usdtDisabled: boolean
	onClick: () => void
}

const BuyButtons = ({mmproDisabled, usdtDisabled, onClick}: BuyButtonProps) => {

	const {account} = useWeb3React()
	const {setOpen} = useContext(PopupContext)
	const {displayNotification} = useContext(NotificationContext)

	const [usdtAllowance, setUsdtAllowance] = useState<string | undefined>(undefined)
	const [mmproAllownce, setMmproAllownce] = useState<string | undefined>(undefined)
	const [isUsdtApproveLoading, setIsUsdtApproveLoading] = useState<boolean>(false)
	const [isMmproApproveLoading, setIsMmproApproveLoading] = useState<boolean>(false)
	const [isMmproBuyLoading, setIsMmproBuyLoading] = useState<boolean>(false)
	const [isUsdtBuyLoading, setIsUsdtBuyLoading] = useState<boolean>(false)
	const [mmproPrice, setMmproPrice] = useState<number | undefined>(undefined)
	const [usdtPrice, setUsdtPrice] = useState<number | undefined>(undefined)

	const usdtContract = useUSDTContract()
	const privateSaleContract = usePrivateSaleContract()
	const mmproContract = useMMProContract()
	const getMmproPrice = async () => {
		const price = await privateSaleContract.methods.MMPROprice().call()
		setMmproPrice(+price)
	}
	const getUsdtPrice = async () => {
		const price = await privateSaleContract.methods.USDTprice().call()
		setUsdtPrice(+price)
	}
	const getAllowance = async (contract: any): Promise<string> => {
		return await contract
			.methods
			.allowance(account, getPrivateSaleAddress())
			.call()
	}
	const approve = async (contract: any, isApproveLoading: boolean, setIsApproveLoading: (newValue: boolean) => void) => {

		if (isApproveLoading) {
			return
		}

		setIsApproveLoading(true)
		const amount2eth = fromExponential(ALLOWANCE);
		try {
			await contract
				.methods
				.approve(getPrivateSaleAddress(), amount2eth)
				.send({from: account}).once('receipt', () => {
					displayNotification(
						'default',
						'Success',
						'Approve was successful!'
					)
					updateAllowances()
					setIsApproveLoading(false)
				});
		} catch (e) {
			console.log(e)
			displayNotification(
				'error',
				'Failure',
				'Please try again!'
			)
			setIsApproveLoading(false)
		}
	};
	const updateAllowances = async () => {
		const newUsdtAllowance = await getAllowance(usdtContract)
		const newMmproAllowance = await getAllowance(mmproContract)
		setUsdtAllowance(newUsdtAllowance)
		setMmproAllownce(newMmproAllowance)
	}
	const mintByMmpro = async () => {
		onClick()
		setIsMmproBuyLoading(true)
		try {
			await privateSaleContract.methods.mintWithMMPro()
				.send({from: account})
				.once('receipt', () => {
					setIsMmproBuyLoading(false)
					displayNotification(
						'default',
						'Success',
						'Mint was successful!'
					)
					onClick()
				})
		} catch (e) {
			console.log(e)
			displayNotification(
				'error',
				'Failure',
				'Please try again!'
			)
			onClick()
			setIsMmproBuyLoading(false)
		}
	}
	const mintByUsdt = async () => {
		onClick()
		if(!usdtPrice){
			return
		}
		setIsUsdtBuyLoading(true)
		try {
			await privateSaleContract.methods.mintWithUSDT(BigNumber(usdtPrice*10**18).toString())
				.send({from: account})
				.once('receipt', () => {
					displayNotification(
						'default',
						'Success',
						'Mint was successful!'
					)
					onClick()
					setIsUsdtBuyLoading(false)
				})
		} catch (e) {
			console.log(e)
			displayNotification(
				'error',
				'Failure',
				'Please try again!'
			)
			onClick()
			setIsUsdtBuyLoading(false)
		}
	}

	const isUsdtApprovalRequired = usdtAllowance && usdtPrice && parseInt(usdtAllowance) <= usdtPrice;
	const isMMproApprovalRequired = mmproAllownce && mmproPrice && parseInt(mmproAllownce) <= mmproPrice

	useEffect(() => {
		getUsdtPrice()
		getMmproPrice()
	}, [])

	useEffect(() => {
		if (account) {
			updateAllowances()
		}
	}, [account])

	return (
		<ContentWrapper>
			<TextWrapper>
				<PriceTextsWrapper>
					<PriceText>{mmproPrice ? mmproPrice : ''}</PriceText>
					<CurrencyText>mmpro</CurrencyText>
				</PriceTextsWrapper>
				<PriceTextsWrapper>
					<PriceText>{usdtPrice ? usdtPrice : ''}</PriceText>
					<CurrencyText>usdt</CurrencyText>
				</PriceTextsWrapper>
			</TextWrapper>
			<ButtonsWrapper>
				<Button
					disabled={(mmproDisabled || !account) && !isUsdtApprovalRequired}
					onClick={
						isMMproApprovalRequired ?
							() => approve(mmproContract, isMmproApproveLoading, setIsMmproApproveLoading)
							:
							mintByMmpro
					}
				>
					<IconWrapper>
						<Mmpro/>
					</IconWrapper>
					{
						isMmproApproveLoading ?
							<SpinnerWrapper>
								<Spinner color={'#fff'} size={25}/>
							</SpinnerWrapper>
							:
							<>
								{isMMproApprovalRequired ? 'approve' : 'buy nft'}
							</>
					}
				</Button>
				<Button
					disabled={(usdtDisabled || !account) && !isUsdtApprovalRequired}
					onClick={
						isUsdtApprovalRequired ?
							() => approve(usdtContract, isUsdtApproveLoading, setIsUsdtApproveLoading)
							:
							mintByUsdt
					}
				>
					<IconWrapper>
						<Usdt/>
					</IconWrapper>
					{
						isUsdtApproveLoading ?
							<SpinnerWrapper>
								<Spinner color={'#fff'} size={25}/>
							</SpinnerWrapper>
							:
							<>
								{isUsdtApprovalRequired ? 'approve' : 'buy nft'}
							</>
					}
				</Button>
				<ButtonOverlay notConnected={!!account} onClick={() => setOpen(true)} style={{cursor: 'pointer'}}>
					Connect Wallet
				</ButtonOverlay>
			</ButtonsWrapper>
		</ContentWrapper>
	);
};

export default BuyButtons;
