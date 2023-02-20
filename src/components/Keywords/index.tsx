import React, { useEffect } from 'react'
import './index.scss'

import { KeywordType } from '../../types'
import Keyword from '../Keyword'
import { makeEmptyList } from '../../utils/general'
import * as Scroll from 'react-scroll'
import KeywordsSearch from '../KeywordsSearch'
import Magnifier from 'images/icons/magnifier'
import RandomFeedback from '../Modals/feedback/randomFeedback'
import { createStickyBlock } from '../../utils/stickyHeaders'
import { changeBg } from '../../utils/background/background'

// CONSTANTS
// const randomFeedbackSelectOptions = [
//   'Поиск ключевых слов 🔎️',
//   'Добавление/ удаление слов 🗑',
//   'Все сложно  🤯',
//   'Все понятно 👌',
// ]

type KeywordsPropType = {
  keywords: {
    added: KeywordType[]
    display: KeywordType[]
    add: (keyword: KeywordType) => void
    addBulk: (keywords: KeywordType[]) => void
    remove: (keyword: KeywordType) => void
    allIds: string[]
  }
}

const Keywords = (props: KeywordsPropType) => {
  const { keywords } = props

  // const [requiredWordsLimit, setRequiredWordsLimit] = useState(0)

  useEffect(() => {
    changeBg('var(--bg-color-base)')
    const scroll = Scroll.animateScroll
    scroll.scrollToTop()

    if (localStorage.getItem('Modal1') !== 'active') {
      localStorage.setItem('Modal1', 'active')
      setTimeout(() => {
        // this.isStatsTooltipVisible = true
      }, 1000)
    }
  }, [])

  // const calculateRequiredLimit = () => {
  //   setRequiredWordsLimit(Math.ceil(keywords.display.length * 0.8))
  // }

  // useEffect(() => {
  //   calculateRequiredLimit()
  // }, [keywords.display])

  return (
    <div className="keywords" id="box">
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
