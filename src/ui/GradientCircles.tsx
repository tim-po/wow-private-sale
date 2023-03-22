import React from "react";

import styled from "styled-components";

const BlueGreenGradientCircle = styled.div`
  position: absolute;
  width: 35%;
  padding-bottom: 35%;
  background: linear-gradient(133.46deg, #5790FF 14.79%, rgba(165, 36, 226, 0) 103.42%);
  opacity: 0.3;
  right: 40%;
  top: 33%;
  z-index: 0;
  border-radius: 50%;
  filter: blur(80px);
`

const PurpleBlueGradientCircle = styled.div`
  position: absolute;
  width: 60%;
  padding-bottom: 60%;
  right: -15%;
  top: 5%;
  background: linear-gradient(133.46deg, #5790FF 14.79%, rgba(165, 36, 226, 0) 103.42%);
  opacity: 0.3;
  z-index: 0;
  border-radius: 50%;
  filter: blur(80px);
`

const DecorationContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  right: 0;
  bottom: 0;
  z-index: 0;
`

const GradientCircles = () => {
	return (
		<DecorationContainer>
			<BlueGreenGradientCircle/>
			<PurpleBlueGradientCircle/>
		</DecorationContainer>
	);
};

export default GradientCircles;