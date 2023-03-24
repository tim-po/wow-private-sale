import React from 'react';
import styled from "styled-components";
import Mmpro from "../../icons/mmpro";
import Usdt from "../../icons/usdt";
import {useWeb3React} from "@web3-react/core";

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
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 190px;
  height: 60px;
  background: linear-gradient(135deg, #33CC9B 0%, #33CC74 100%);
  border-radius: 36px;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  text-transform: uppercase;
  color: #FFFFFF;
  cursor: pointer;
  border: none;
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
`

const CurrencyText = styled.span`
  font-weight: 400;
  font-size: 24px;
  line-height: 49px;
  text-transform: uppercase;
  color: #181833;
`

const PriceTextsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 8px;
`

const BuyButtons = () => {

	const {account} = useWeb3React()

	return (
		<ContentWrapper>
			<TextWrapper>
				<PriceTextsWrapper>
					<PriceText>500</PriceText>
					<CurrencyText>mmpro</CurrencyText>
				</PriceTextsWrapper>
				<PriceTextsWrapper>
					<PriceText>15 000</PriceText>
					<CurrencyText>usdt</CurrencyText>
				</PriceTextsWrapper>
			</TextWrapper>
			<ButtonsWrapper>
				<Button>
					<IconWrapper>
						<Mmpro/>
					</IconWrapper>
					buy nft
				</Button>
				<Button>
					<IconWrapper>
						<Usdt/>
					</IconWrapper>
					buy nft
				</Button>
			</ButtonsWrapper>
		</ContentWrapper>
	);
};

export default BuyButtons;