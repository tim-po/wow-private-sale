import React from 'react';
import styled from "styled-components";
import Mmpro from "../../icons/mmpro";
import Usdt from "../../icons/usdt";

const ButtonsWrapper = styled.div`
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

const BuyButtons = () => {
	return (
		<ButtonsWrapper>
			<Button>
				<IconWrapper>
					<Mmpro />
				</IconWrapper>
				buy nft
			</Button>
			<Button>
				<IconWrapper>
					<Usdt />
				</IconWrapper>
				buy nft
			</Button>
		</ButtonsWrapper>
	);
};

export default BuyButtons;