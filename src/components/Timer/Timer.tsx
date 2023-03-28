import React, {useEffect, useState} from 'react';
import styled from "styled-components";

type TimerProps = {
  toTime: number
  callback: () => void
  isPause: boolean
}

const StyledNumber = styled.div<{ isPaused: boolean }>`
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
    background: ${props => props.isPaused ? '#181833': 'rgba(51, 204, 155, 1)'};
    opacity: 0.1;
  }
`

const StyledTimerWrap = styled.div<{ isPaused: boolean }>`
  display: flex;
  font-family: 'Gilroy', serif;
  font-style: normal;
  font-weight: 500;
  font-size: 64px;
  line-height: 110%;
  color: ${props => props.isPaused ? '#181833': 'rgba(51, 204, 155, 1)'};
`

const StyledTimer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 39px;
`

const Timer = ({toTime, callback, isPause}: TimerProps) => {
  const [now, setNow] = useState<number>(Date.now() / 1000)

  useEffect(() => {
    const calcInterval = setInterval(() => {
      if ((toTime - Date.now() / 1000) - 1 <= 0) {
        setNow(toTime)
        clearInterval(calcInterval)
        callback()
        return
      }
      setNow(Date.now() / 1000)

    }, 1000)
  }, [toTime])



  return (
    <StyledTimer>
      <StyledTimerWrap isPaused={isPause}>
        {calcTime(toTime - now, isPause)}
      </StyledTimerWrap>
    </StyledTimer>
  );
};

export default Timer;


const calcTime = (delta: number, isPaused: boolean) => {
  let hours = Math.floor(delta / (60 * 60))
  let minutes = Math.floor((delta - (hours * 60 * 60)) / (60))
  let seconds = Math.floor((delta - (minutes * 60)))

  if (delta <= 0) {
    hours = 0
    minutes = 0
    seconds = 0
  }

  return <>
    <StyledNumber isPaused={isPaused}>
      {isPaused ? (hours.toString().length < 2 ? '0' + hours : hours): '00'}
    </StyledNumber>
    :
    <StyledNumber isPaused={isPaused}>
      {isPaused ? (minutes.toString().length < 2 ? '0' + minutes : minutes): '00'}
    </StyledNumber>
    :
    <StyledNumber isPaused={isPaused}>
      {isPaused ? (seconds.toString().length < 2 ? '0' + seconds : seconds): '00'}
    </StyledNumber>
  </>
}
