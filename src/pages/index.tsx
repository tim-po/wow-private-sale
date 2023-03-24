import React, {useEffect, useState} from 'react';
import GradientCircles from "../ui/GradientCircles";
import styled from "styled-components";
import Header from "../components/Header";
import {injected} from "../web3/connectors";
import {useWeb3React} from "@web3-react/core";
import Description from "../components/Description";
import Video from "../components/Video";
import MintButtons from "../components/MintButtons";
import Timer from "../components/Timer/Timer";
import {PopupContext} from "../context";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
	height: 80%;
`

const RightBlock = styled.div`

`

const MainPage = () => {

	// @ts-ignore
	const {active, activate, networkError} = useWeb3React();

	useEffect(() => {
		injected.isAuthorized().then((isAuthorized) => {
			if (isAuthorized && !active && !networkError) {
				activate(injected);
			}
		});
	}, [activate, networkError]);

	const [popupOpen, setPopupOpen] = useState<boolean>(false)

	return (
		<Container>

			<PopupContext.Provider value={{isOpen: popupOpen, setOpen: (is:boolean) => setPopupOpen(is)}}>
				<GradientCircles/>
				<Header/>
				<ContentWrapper>
					<Description/>

					<RightBlock>
						<Video/>
						<Timer toTime={Date.now() + 1000*5}/>
						<MintButtons usdtDisabled={false} mmproDisabled={false}/>
					</RightBlock>

				</ContentWrapper>
			</PopupContext.Provider>

		</Container>
	);
};

export default MainPage;
