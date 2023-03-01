import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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
import { useProfession } from '../../Models/useProfession'

const Trajectories = () => {
  const [trajectories, setTrajectories] = useState<TrajectoryType[]>([])
  const [searchParams] = useSearchParams()
  const [responseError, setResponseError] = useState<unknown>()
  const [isWarningCardOpen, setIsWarningCardOpen] = useState(true)
  const { keywords } = useProfession()
  const navigate = useNavigate()

  const getTrajectoriesFromIds = (ids: number[]) => {
    axios
      .get(`${BASE_URL}trajectories/?ids=${ids.join(',')}`)
      .then(res => {
        setTrajectories(res.data)
      })
      .catch(e => setResponseError(e))
  }

  const getTrajectoriesFromKeywords = (keywordIds: string[]) => {
    axios
      .post(`${BASE_URL}trajectories/?top_n=10`, {
        keywords: keywordIds,
      })
      .then(r => {
        const newTrajectoryIds = r.data.map((el: TrajectoryType) => el.id)
        navigate(`/trajectories?ids=${JSON.stringify(newTrajectoryIds)}`)
        getTrajectoriesFromIds(newTrajectoryIds)
      })
  }

  useEffect(() => {
    changeBg('var(--bg-color-invert)')
    if (trajectories.length === 0) {
      try {
        const trajectoryIds = JSON.parse(searchParams.get('ids') || '[]')

        if (!trajectoryIds.length) {
          getTrajectoriesFromKeywords(keywords.allIds)
        } else {
          getTrajectoriesFromIds(trajectoryIds)
        }
      } catch (e) {
        console.log(e)
        setResponseError(e)
      }
    }
    const scroll = Scroll.animateScroll
    scroll.scrollToTop()

    updateStickyBlocks()
  }, [keywords.allIds])

  if (responseError) {
    return <NotFound />
  }

  return (
    <div className="pb-3">
      <h1 className="TrajectoryChoiceHeader" {...createStickyBlock(1)}>
        Готовые траектории
      </h1>
      <WarningCard
        isAnimated={isWarningCardOpen}
        animationName={'collapse'}
        wrapClassName={'animationWrap'}
        contentClassName={'TrajectoriesInfoCard'}
        onCrossClick={() => setIsWarningCardOpen(false)}
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
      {trajectories && trajectories.length
        ? trajectories.map((trajectory, index) => (
            <TrajectoryPreview
              key={trajectory.id + index + trajectory.code}
              trajectory={trajectory}
            />
          ))
        : makeEmptyList(5).map((_i, index) => <TrajectoryPreview key={index} />)}
      <RandomFeedback displayForGroup={2} />
      <RandomFeedback displayForGroup={3} />
    </div>
  )
}

export default Trajectories
