import React from 'react'
import './index.scss'
import { KeywordType } from '../../../types'
import Keyword from '../../../ui-kit/standard/Keyword'

// CONSTANTS

// DEFAULT FUNCTIONS

type KeywordsModalPropType = {
  // You should declare props like this, delete this if you don't need props
  keywords: KeywordType[]
}

const KeywordsModal = (props: KeywordsModalPropType) => {
  const { keywords } = props

  return (
    <div className="KeywordsModalContent">
      <h1 className="KeywordsModalHeader">Ключевые слова</h1>
      <div className="keywords-container">
        {keywords.map(keyword => (
          <Keyword
            key={keyword.text}
            deletable={false}
            keyword={keyword}
            bgColor="#EBEBFF"
          />
        ))}
      </div>
    </div>
  )
}

export default KeywordsModal
