import React, { useEffect, useState } from 'react'
import './index.scss'

import { debounce } from 'lodash'
import axios from 'axios'
import { KeywordType } from '../../types'
import useOnClickOutside from '../../utils/useClickOutside'
import Keyword from '../../ui-kit/standard/Keyword'
import { BASE_URL } from '../../constants'
import MagnifyingGlass from '../../images/icons/magnifyingGlass'
import Spinner from '../../ui-kit/standard/Spinner'

type KeywordsSearchPropType = {
  keywords: {
    addBulk: (keywords: KeywordType[]) => void
    remove: (keyword: KeywordType) => void
    allIds: string[]
  }
}

const KeywordsSearch = (props: KeywordsSearchPropType) => {
  const { keywords } = props
  const searchRef = React.createRef<HTMLDivElement>()
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [keywordsToAdd, setKeywordsToAdd] = useState<KeywordType[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchUnsuccessful, setIsSearchUnsuccessful] = useState(false)
  const [isBadWord, setIsBadWord] = useState(false)
  const [queryKeywords, setQueryKeywords] = useState<KeywordType[]>([])

  const getKeywords = async (query: string) => {
    setIsLoading(true)
    if (query === '') {
      setQueryKeywords([])
    } else {
      setIsLoading(true)
      try {
        const response = await axios.get(`${BASE_URL}keywords/?text_like=${query}`)
        setIsLoading(false)
        if (response.data.length === 0) {
          setIsSearchUnsuccessful(true)
        }
        setQueryKeywords(
          response.data.filter(
            (keyword: KeywordType) => !keywords.allIds.includes(keyword.id),
          ),
        )
      } catch {
        console.log('Error in keywoards search' + query)
      }
    }
  }

  const searchKeywords = debounce(async () => {
    if (searchQuery === 'пизда' || searchQuery === 'хуй') {
      setIsBadWord(true)
      setIsLoading(false)
      return
    }
    setIsSearching(true)
    await getKeywords(searchQuery)
  }, 500)

  const searching = () => {
    if (!isSearching && searchQuery.length > 0) {
      searchKeywords()
    }
    setIsSearching(true)
  }

  const notSearching = () => {
    setIsSearching(false)
  }

  const addKeywords = () => {
    keywords.addBulk(keywordsToAdd)
    setKeywordsToAdd([])
    // setSearchQuery('')
    notSearching()
    // setSearchQuery('')
    setQueryKeywords([])
  }

  const clickOutside = () => {
    addKeywords()
    notSearching()
  }

  useOnClickOutside(searchRef, clickOutside)

  useEffect(() => {
    if (searchQuery.length >= 1) {
      searchKeywords()
    } else {
      setQueryKeywords([])
    }
  }, [searchQuery])

  const selectKeyword = (keyword: KeywordType) => {
    if (keywordsToAdd.includes(keyword)) {
      setKeywordsToAdd([
        ...keywordsToAdd.filter(keywordToAdd => keywordToAdd.id !== keyword.id),
      ])
    } else {
      setKeywordsToAdd([...keywordsToAdd, keyword])
    }
  }

  return (
    <div className="searchFieldContainer">
      <div ref={searchRef}>
        <div className="inputContainer">
          <input
            className="keywordsInput"
            placeholder="Введи ключевое слово"
            value={searchQuery}
            onFocus={searching}
            onChange={e => {
              setIsSearchUnsuccessful(false)
              setIsBadWord(false)
              setSearchQuery(e.target.value)
              setIsLoading(true)
            }}
          />
          <div className="searchInput">
            <MagnifyingGlass />
          </div>
        </div>
        <div
          className={`addKeywordsSearch ${
            isSearching && searchQuery != '' ? 'extended' : ''
          }`}
        >
          {isSearchUnsuccessful && !isBadWord && (
            <span className="unsuccessfulMessage">
              По вашему запросу <strong>{searchQuery}</strong> ничего не нашлось
            </span>
          )}
          {queryKeywords.slice(0, 100).map(keyword => {
            return (
              <Keyword
                // class="{
                //      'keywords__modal-keywords_selected': keywordInArray(keyword, keywordsToAdd),
                // }"
                selected={keywordsToAdd.map(word => word.id).includes(keyword.id)}
                key={keyword.id}
                onSelectSelf={() => selectKeyword(keyword)}
                keyword={keyword}
              />
            )
          })}

          {isLoading && (
            <div className="SpinnerWrapper">
              <Spinner size={40} />
            </div>
          )}

          <div className={`badWord-container ${isBadWord ? 'visible' : ''}`}>
            <img src="/static/bigBoss.png" alt="big_boss" />
            <div>Не ругайся... Не поступишь</div>
          </div>
          {/* {!isSearchUnsuccessful && !isBadWord &&*/}
          {/*  <button*/}
          {/*    onClick={addKeywords}*/}
          {/*    className="buttonSecondary inModal"*/}
          {/*  >*/}
          {/*    Добавить*/}
          {/*  </button>*/}
          {/* }*/}
        </div>
      </div>
    </div>
  )
}

export default KeywordsSearch
