import React from 'react';
import styled from "styled-components";

const NftVideo = styled.video`
  width: 247px;
  height: 406px;
	z-index: 2;
`

const Video = () => {
	return (
		<NftVideo autoPlay loop>
			<source src={'/images/white.mp4'} type='video/mp4' />
		</NftVideo>
	);
};

export default Video;