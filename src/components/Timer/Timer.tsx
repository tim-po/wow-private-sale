import React, {useEffect, useState} from 'react';
import styled from "styled-components";

type TimerProps = {
  toTime: number
}

const StyledNumber = styled.div`
  width: 84px;
  height: 79px;
  text-align: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 8px;
    bottom: 0;
    left: 0;
    background: #181833;
    opacity: 0.1;
  }
`

const StyledTimerWrap = styled.div`
  display: flex;
  font-family: 'Gilroy', serif;
  font-style: normal;
  font-weight: 500;
  font-size: 64px;
  line-height: 110%;
  color: #181833;

`

const StyledTimer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 39px;
`

const Timer = ({toTime}: TimerProps) => {
	const [now, setNow] = useState<number>(Date.now())

	useEffect(() => {
		const calcInterval = setInterval(() => {
			if (toTime - Date.now() - 1000 < 0) {
				setNow(toTime)
				clearInterval(calcInterval)
				return
			}

			setNow(Date.now())

		}, 1000)
	}, [toTime])


	return (
		<StyledTimer>
			<StyledTimerWrap>
				{calcTime(toTime - now)}
			</StyledTimerWrap>
		</StyledTimer>
	);
};

export default Timer;


const calcTime = (delta: number) => {
	let hours = Math.floor(delta / (1000 * 60 * 60))
	let minutes = Math.floor((delta - (hours * 1000 * 60 * 60)) / (60 * 1000))
	let seconds = Math.floor((delta - (minutes * 1000 * 60)) / (1000))

	if (delta <= 0) {
		hours = 0
		minutes = 0
		seconds = 0
	}

	return <>
		<StyledNumber>
			{hours.toString().length < 2 ? '0' + hours : hours}
		</StyledNumber>:<StyledNumber>
		{minutes.toString().length < 2 ? '0' + minutes : minutes}
	</StyledNumber>:<StyledNumber>
		{seconds.toString().length < 2 ? '0' + seconds : seconds}
	</StyledNumber>
	</>
}
