import React from 'react';
import styled from "styled-components";
import WOWLogo from '../../icons/wow'
import ConnectWalletButton from "../ConnectWalletButton";
import MMProLogo from "../../images/MMProLogo";

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

const LogosWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;

  @media screen and (max-width: 750px) {
    flex-direction: column;
    align-items: flex-start;
    width: 50%;
    gap: 0;
  }
`

const LogoWrapper = styled.div`
	svg {
    @media screen and (max-width: 450px) {
      width: 180px;
    }
	}
`

const Header = () => {
	return (
		<Wrapper>
			<LogosWrapper>
				<LogoWrapper>
					<WOWLogo/>
				</LogoWrapper>
				<LogoWrapper>
					<MMProLogo/>
				</LogoWrapper>
			</LogosWrapper>
			<ConnectWalletButton/>
		</Wrapper>
	);
};

export default Header;
