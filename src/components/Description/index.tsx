import React from 'react';
import styled from "styled-components";
import {StyledVars} from "../../globalStyles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
  gap: 22px;
`

const WOWNftText = styled.span`
  font-weight: 700;
  font-size: 64px;
  color: #33CC66;
  z-index: 2;
  white-space: nowrap;
	transition: all .3s;

	@media screen and (max-width: 600px) {
    font-family: 'Gilroy', serif;
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 130%;
  }
`

const PrivateSaleText = styled.div`
	font-weight: 700;
	font-size: 64px;
	color: #181833;
	z-index: 2;
	white-space: nowrap;
	transition: all .3s;

	@media screen and (max-width: 600px) {
		font-family: 'Gilroy', serif;
		font-style: normal;
		font-weight: 700;
		font-size: 40px;
		line-height: 130%;
	}
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 10px;
	
	@media screen and ${StyledVars.media.big} {
		flex-direction: column;
		align-items: start;
	}
	
	@media screen and ${StyledVars.media.some}{
		flex-direction: row;
		align-items: start;
	}
	
	@media screen and (max-width: 800px){
		flex-direction: column;
	}
`

const Subtitle = styled.div`
	transition: all .3s;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #181833;
	
  @media screen and (max-width: 600px) {
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 33px;
  }
`

const PointsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 32px;
  z-index: 2;

	@media screen and (max-width: 600px){
		flex-direction: column;
		align-items: start;
		gap: 8px !important;
	}
	
  @media screen and ${StyledVars.media.big} {
    flex-direction: column;
    align-items: start;
  }

	@media screen and ${StyledVars.media.some}{
		flex-direction: row;
		align-items: start;
	}

	
	
`

const PointWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`

const PointText = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  color: #181833;

	@media screen and (max-width: 600px) {
		font-family: 'Gilroy';
		font-style: normal;
		font-weight: 500;
		font-size: 20px;
		line-height: 150%;
	}
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 190px;
  height: 65px;
  background: none;
  border: 1px solid #33CC66;
  border-radius: 44px;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: #33CC66;
  z-index: 2;
  cursor: pointer;
  text-decoration: none;

	@media screen and (max-width: 600px) {
		padding: 12px 7px;
		width: unset;
		height: 48px;
		font-size: 20px;
		border-radius: 18px;
	}
`

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;

  a {
    text-decoration: none !important;
  }
`

const Description = () => {
	return (
		<Wrapper>
			<TitleWrapper>
				<WOWNftText>WOW NFT</WOWNftText>
				<PrivateSaleText>Private Sale</PrivateSaleText>
			</TitleWrapper>
			<Subtitle>WOW NFT Private Sale will start on the 27th of March</Subtitle>
			<PointsWrapper>
				<PointWrapper>
					<PointText>
						Catch the most affordable price: <strong>USDT 15.000 or the same amount in MMPRO</strong>
					</PointText>
				</PointWrapper>
				<PointWrapper>
					<PointText>
						Sell opportunities will be open every <strong>5 minutes for any 5 NFTs</strong>
					</PointText>
				</PointWrapper>
			</PointsWrapper>
			<ButtonsWrapper>
				<Button
					onClick={() => window.open('https://drive.google.com/file/d/1dovsWZ8aD6h0iTcwWFQA-GtqXB_KMDX6/view?usp=drivesdk', '_blank')}>
					White Paper
				</Button>
				<Button
					onClick={() => window.open('https://wowsummitnft.com/', '_blank')}
				>
					WOW NFT Site
				</Button>
			</ButtonsWrapper>
		</Wrapper>
	);
};

export default Description;
