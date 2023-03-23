import React, {useEffect} from 'react';
import GradientCircles from "../ui/GradientCircles";
import styled from "styled-components";
import Header from "../components/Header";
import {injected} from "../web3/connectors";
import {useWeb3React} from "@web3-react/core";
import Description from "../components/Description";
import Video from "../components/Video";
import MintButtons from "../components/MintButtons";

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

	return (
		<Container>
			<Header/>
			<ContentWrapper>
				<Description/>
				<MintButtons />
			</ContentWrapper>
			<GradientCircles/>
		</Container>
	);
};

export default MainPage;