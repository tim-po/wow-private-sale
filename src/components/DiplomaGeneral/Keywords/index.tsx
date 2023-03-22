import React, { useContext } from 'react'
import './index.scss'
import styled from 'styled-components'
import Keyword from 'components/ui-kit/Keyword'
import KeywordsModal from 'components/Modals/KeywordsModal'
import { DiplomaTileWrapper, DiplomaTitle } from '../DiplomaGeneralStyles'
import { KeywordType } from 'types'
import ModalContext from 'Context/Modal'
import { makeEmptyList } from '../../../utils/general'
import { randomNumberBetween } from '../../../utils/mathUtils'

type KeywordsPropType = {
  keywords: KeywordType[]
  keywordsCount: number
  isKeywordsButtonHidden: boolean
  keywordSkeletonWidthFunc?: () => string | number
}

const KeywordsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  gap: 8px
`

const ShowMoreKeywordsButton = styled.button`
  transition: all 0.2s;
  background: #EBEBFF;
  border: none;
  color: #8533FF;
  border-radius: 8px;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 12px;
  opacity: 1;
  line-height: 15px;
  outline: none;
  cursor: pointer;
  
  &:hover{
   background: #DDDDFD; 
  }
  &:active,
  &:focus {
    outline: none;
  }
`

const Keywords = (props: KeywordsPropType) => {
  const { keywords, keywordsCount, isKeywordsButtonHidden, keywordSkeletonWidthFunc } =
    props

  const { displayModal } = useContext(ModalContext)

  return (
    <KeywordsWrapper>
      {keywords.length < 1 ? (
        <>
          {makeEmptyList(9).map((a, index) => {
            return (
              <div
                key={index}
                className="skeletonKeywords MainSkeleton"
                style={{
                  'width':
                    (keywordSkeletonWidthFunc
                      ? keywordSkeletonWidthFunc()
                      : randomNumberBetween(390, 41, true)) + 'px',
                }}
              />
            )
          })}
        </>
      ) : (
        keywords
          .slice(0, 10)
          .map((keyword: KeywordType) => (
            <Keyword
              key={keyword.id}
              deletable={false}
              keyword={keyword}
              bg-color="#EBEBFF"
            />
          ))
      )}
      {!isKeywordsButtonHidden && keywords.length >= 1 && (
        <ShowMoreKeywordsButton
          onClick={() => displayModal(<KeywordsModal keywords={keywords} />)}
        >
          {`+${keywordsCount - 10}`}
        </ShowMoreKeywordsButton>
      )}
    </KeywordsWrapper>
  )
}

export default Keywords
