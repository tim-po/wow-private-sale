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
import {StyledVars} from "../globalStyles";
import {usePrivateSaleContract} from "../hooks/useContracts";

const Container = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
	padding-bottom: 20px;
`

const ContentWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 60px;
	height: 80%;
	
	@media screen and (max-width: 1000px) {
		flex-direction: column;
		padding: 0 13px;
	}
`

const RightBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const MainPage = () => {

	// @ts-ignore
	const {active, activate, networkError} = useWeb3React();
	const privateSaleContract = usePrivateSaleContract()

	const [pauseTime, setPauseTime] = useState(0);
	const [isMintInMMPRO, setIsMintInMMPRO] = useState(false)
	const [lastSaleTime, setLastSaleTime] = useState(Date.now()/1000)



	useEffect(() => {
		injected.isAuthorized().then((isAuthorized) => {
			if (isAuthorized && !active && !networkError) {
				activate(injected);
			}
		});
	}, [activate, networkError]);

	useEffect(() => {
		updateValuesFromContract()
	}, []);

	const updateValuesFromContract = () => {
			privateSaleContract.methods.isMMPRO().call().then((newIsMintInMMPRO: boolean) => {
				setIsMintInMMPRO(newIsMintInMMPRO)
			})
			privateSaleContract.methods.timestamp().call().then((newLastSaleTime: number) => {
				setLastSaleTime(newLastSaleTime)
			})
	}

	const isPause = (Date.now()/1000 < lastSaleTime)

	const [popupOpen, setPopupOpen] = useState<boolean>(false)

	return (
		<Container>

			<PopupContext.Provider value={{isOpen: popupOpen, setOpen: setPopupOpen}}>
				{/*<GradientCircles/>*/}
				<Header/>
				<ContentWrapper>
					<Description/>

					<RightBlock>
						<Video/>
						<Timer isPause={isPause} callback={updateValuesFromContract} toTime={isPause ? (+lastSaleTime): Date.now()/1000}/>
						<MintButtons onClick={updateValuesFromContract} usdtDisabled={isMintInMMPRO || isPause} mmproDisabled={!isMintInMMPRO || isPause}/>
					</RightBlock>

				</ContentWrapper>
			</PopupContext.Provider>

		</Container>
	);
};

export default MainPage;
