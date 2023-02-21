import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import * as Scroll from 'react-scroll'
import './index.scss'
import { BASE_URL } from '../../constants'
import Close from '../../images/icons/close'
import { makeEmptyList } from '../../utils/general'
import RandomFeedback from '../../components/Modals/feedback/randomFeedback'
import { createStickyBlock, updateStickyBlocks } from '../../utils/stickyHeaders'
import { changeBg } from '../../utils/background/background'
import NotFound from '../../components/NotFound'
import TrajectoryPreview from '../../components/TrajectoryPreview'
import { TrajectoryType } from '../../types'
import WarningCard from '../../components/WarningCard'
import PercentProgress from '../../components/PercentProgress'

const Trajectories = () => {
  const [trajectories, setTrajectories] = useState<TrajectoryType[]>([])
  const [searchParams] = useSearchParams()
  const [responseError, setResponseError] = useState<unknown>()

  useEffect(() => {
    changeBg('var(--bg-color-invert)')
    if (trajectories.length === 0) {
      try {
        const trajectoryIds = JSON.parse(searchParams.get('ids') || '[]')

        axios
          .get(`${BASE_URL}trajectories/?ids=${trajectoryIds.join(',')}`)
          .then(res => {
            setTrajectories(res.data)
          })
          .catch(e => setResponseError(e))
      } catch (e) {
        console.log(e)
        setResponseError(e)
      }
    }
    const scroll = Scroll.animateScroll
    scroll.scrollToTop()

    updateStickyBlocks()
  }, [])

  if (responseError) {
    return <NotFound />
  }

  return (
    <div className="pb-3">
      <h1 className="TrajectoryChoiceHeader" {...createStickyBlock(1)}>
        Готовые траектории
      </h1>
      <WarningCard
        wrapClassName={'animationWrap'}
        contentClassName={'TrajectoriesInfoCard'}
        onCrossClick={() => {
          const card = document.querySelector('.animationWrap')
          if (card) card.classList.toggle('Hidden')
        }}
      >
        <PercentProgress percent={0.8} />
        Мы собрали подходящие для тебя образовательные программы в ИТМО.
        <br />
        Индикатор показывает совпадение с ключевыми словами.
      </WarningCard>

      <div className={'animationWrap Hidden'}>
        <div className="TrajectoriesInfoCard align-items-center">
          <PercentProgress percent={0.8} />
          Мы собрали подходящие для тебя образовательные программы в ИТМО.
          <br />
          Индикатор показывает совпадение с ключевыми словами.
          <button
            className="border-0 pr-0 py-0 hideButton"
            onClick={() => {
              const card = document.querySelector('.animationWrap')
              if (card) card.classList.toggle('Hidden')
            }}
          >
            <Close width={10} height={10} />
          </button>
        </div>
      </div>
      {trajectories.length
        ? trajectories.map((trajectory, index) => (
            <TrajectoryPreview key={trajectory.id + index} trajectory={trajectory} />
          ))
        : makeEmptyList(5).map((_i, index) => <TrajectoryPreview key={index} />)}
      <RandomFeedback displayForGroup={2} />
      <RandomFeedback displayForGroup={3} />
    </div>
  )
}

export default Trajectories
