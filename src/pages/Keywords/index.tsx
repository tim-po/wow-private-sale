import React, { useEffect } from 'react'
import './index.scss'
import Keyword from '../../components/Keyword'
import {
  LocalStorageInteraction,
  makeEmptyList,
  withLocalStorage,
} from '../../utils/general'
import * as Scroll from 'react-scroll'
import KeywordsSearch from '../../components/KeywordsSearch'
import Magnifier from 'images/icons/magnifier'
import RandomFeedback from '../../components/Modals/feedback/randomFeedback'
import { createStickyBlock } from '../../utils/stickyHeaders'
import { changeBg } from '../../utils/background/background'
import { useNavigate } from 'react-router-dom'
import { useProfession } from '../../Models/useProfession'

const Keywords = () => {
  const professionId = withLocalStorage(
    { professionId: null },
    LocalStorageInteraction.load,
  ).professionId

  const navigate = useNavigate()
  const { profession, keywords } = useProfession(professionId)

  useEffect(() => {
    changeBg('var(--bg-color-base)')
    const scroll = Scroll.animateScroll
    scroll.scrollToTop()

    if (localStorage.getItem('Modal1') !== 'active') {
      localStorage.setItem('Modal1', 'active')
    }
  }, [])

  const openTrajectoryChoice = () => {
    if (!profession) {
      return
    }

    navigate(`/trajectories`)
  }

  return (
    <div className="keywords" id="box">
      <div className="headerFlex" {...createStickyBlock(1)} data-margin-top="0">
        <h4 className="currentHeader fontWeightBold" id="scrollToTop">
          Ключевые слова
        </h4>

        <div className="bottomLeftContainer">
          <button
            className={`clear ${keywords.added.length < 1 ? 'disabled' : ''}`}
            onClick={() => keywords.clear()}
          >
            Очистить выбор
          </button>
          <button className="save" onClick={openTrajectoryChoice}>
            Построить траекторию
          </button>
        </div>
      </div>
      <div>
        <div className="keywordsCustomisationFlex">
          <div className="leftBlock">
            <div className="search" {...createStickyBlock(2)}>
              {/* <h4 id='blob-1-top-left' className="subheader top deckHidden">Добавь то, что хочешь изучить</h4> */}
              <div
                id="blob-1-top-left"
                className="subheader top"
                {...createStickyBlock(2)}
              >
                <span className="subheader-title">Добавь то, что хочешь изучить</span>
                {keywords.added.length > 0 && (
                  <div className="subheader-counter">
                    +
                    <span key={keywords.added.length} className="rollNumber">
                      {keywords.added.length}
                    </span>
                  </div>
                )}
              </div>
              <KeywordsSearch keywords={keywords} />
              <div className="keywordsSubtext" id="blob-1-bottom-right">
                Например: python
              </div>
              {keywords.added.length === 0 && (
                <div className="textCenter mt-4 magnifierTextContainer">
                  <Magnifier width={94} height={139} />
                  <span className="magnifier">
                    <div>Ищи и добавляй навыки,&nbsp;</div>
                    <div>которые хочешь получить в ИТМО</div>
                  </span>
                </div>
              )}
              <div className="keywordsAddedContainer">
                <div className="keywordsAdded">
                  {keywords.added.map(keyword => {
                    return (
                      <Keyword
                        v-for="keyword in addedKeywords"
                        key={keyword.id}
                        deletable={true}
                        keyword={keyword}
                        bg-color="var(--color-secondary)"
                        onDeleteSelf={() => keywords.remove(keyword)}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="searchBlock">
            <p className="subheader" {...createStickyBlock(2)}>
              Уже в наборе
            </p>
            <div className="keywordsPresets">
              {keywords.display.length < 1 && (
                <>
                  {makeEmptyList(100).map((a, index) => {
                    return (
                      <div
                        key={index}
                        className="skeletonKeywords MainSkeleton"
                        style={{
                          'width': Math.floor(Math.random() * (390 - 41 + 1)) + 41 + 'px',
                        }}
                      />
                    )
                  })}
                </>
              )}
              {keywords.display.map(keyword => {
                return (
                  <Keyword
                    key={keyword.id}
                    deletable={true}
                    keyword={keyword}
                    bg-color="var(--color-secondary)"
                    onDeleteSelf={() => keywords.remove(keyword)}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <RandomFeedback displayForGroup={1} />
    </div>
  )
}

export default Keywords
