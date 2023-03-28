import React from 'react';
import styled from "styled-components";

const NftVideo = styled.video`
  width: 100%;
  height: 450px;
	z-index: 2;
	
	@media screen and (max-width: 600px){
		width: 100%;
	}
`
const Video = () => {
	return (
		<NftVideo autoPlay loop muted>
			<source src={'./white.mp4'} />
		</NftVideo>
	);
};

export default Video;
