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
  height: 100vh;
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
	const [isPause, setIsPause] = useState(true);
	const [isMintInMMPRO, setIsMintInMMPRO] = useState(false)
	const [lastSaleTime, setLastSaleTime] = useState(Date.now())



	useEffect(() => {
		injected.isAuthorized().then((isAuthorized) => {
			if (isAuthorized && !active && !networkError) {
				activate(injected);
			}
		});
	}, [activate, networkError]);

	useEffect(() => {
		privateSaleContract.methods.pauseTime().call().then((newPauseTime: number) => {
			setPauseTime(newPauseTime)
		})
		privateSaleContract.methods.isPaused().call().then((newIsPause: boolean) => {
			setIsPause(newIsPause)
		})
		privateSaleContract.methods.isMMPRO().call().then((newIsMintInMMPRO: boolean) => {
			setIsMintInMMPRO(newIsMintInMMPRO)
		})
		privateSaleContract.methods.lastSale().call().then((newLastSaleTime: number) => {
			setLastSaleTime(newLastSaleTime)
		})
	}, []);

	useEffect(() => {
		console.log(pauseTime, isPause, isMintInMMPRO, lastSaleTime)
	}, [pauseTime, isPause, isMintInMMPRO, lastSaleTime]);


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
						<Timer toTime={isPause ? (+lastSaleTime + (pauseTime)*1000): Date.now()}/>
						<MintButtons usdtDisabled={isMintInMMPRO || isPause} mmproDisabled={!isMintInMMPRO || isPause}/>
					</RightBlock>

				</ContentWrapper>
			</PopupContext.Provider>

		</Container>
	);
};

export default MainPage;
