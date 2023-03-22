import React, {useEffect} from 'react';
import GradientCircles from "../ui/GradientCircles";
import styled from "styled-components";
import Header from "../components/Header";
import {injected} from "../web3/connectors";
import {useWeb3React} from "@web3-react/core";

const Container = styled.div`
	position: relative;
  width: 100vw;
	height: 100vh;
`
const MainPage = () => {

	// @ts-ignore
	const { active, activate, networkError, account, connector } = useWeb3React();

	useEffect(() => {
		injected.isAuthorized().then((isAuthorized) => {
			if (isAuthorized && !active && !networkError) {
				activate(injected);
			}
		});
	}, [activate, networkError]);

	return (
		<Container>
			<Header />
			<GradientCircles />
		</Container>
	);
};

export default MainPage;