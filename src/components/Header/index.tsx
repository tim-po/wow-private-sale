import React from 'react';
import styled from "styled-components";
import WOWLogo from '../../images/WOWLogo.png'
import ConnectWalletButton from "../ConnectWalletButton";

const Wrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px 60px 20px 60px;
`

const Logo = styled.img`
  width: 62px;
  height: 52px;
`

const Header = () => {
	return (
		<Wrapper>
			<Logo src={WOWLogo} alt={"WOW"} />
			<ConnectWalletButton />
		</Wrapper>
	);
};

export default Header;