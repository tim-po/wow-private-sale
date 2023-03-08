import React, { useContext } from 'react'
import './index.scss'
import Keyword from '../../ui-kit/Keyword'
import { KeywordType } from '../../../types'

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

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
        {keywords.map((keyword, index) => (
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
