import React from 'react';
import styled from "styled-components";
import WOWLogo from '../../icons/wow'
import ConnectWalletButton from "../ConnectWalletButton";

const Wrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px 60px 20px;

	@media screen and (max-width: 1000px) {
		padding: 23px;
	}
`

const Logo = styled.img`
  width: 62px;
  height: 52px;
`

const Header = () => {
	return (
		<Wrapper>

			<WOWLogo />
			<ConnectWalletButton />
		</Wrapper>
	);
};

export default Header;
