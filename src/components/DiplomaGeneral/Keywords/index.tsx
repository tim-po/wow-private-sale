import React, {useContext} from "react";
import './index.scss'
import styled from "styled-components";
import Keyword from "components/Keyword";
import KeywordsModal from "components/Modals/KeywordsModal";
import {DiplomaTileWrapper, DiplomaTitle} from "../DiplomaGeneralStyles";
import {KeywordType} from "types";
import ModalContext from "Context/Modal";
import { makeEmptyList } from '../../../utils/general'

type KeywordsPropType = {
  keywords: KeywordType[];
  keywordsCount: number;
  isKeywordsButtonHidden: boolean;
}

const KeywordsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  gap: 8px
`

const ShowMoreKeywordsButton = styled.button`
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

  &:active,
  &:focus {
    outline: none;
  }
`

const Keywords = (props: KeywordsPropType) => {
  const {keywords, keywordsCount, isKeywordsButtonHidden} = props

  const {displayModal} = useContext(ModalContext)

  return (
    <DiplomaTileWrapper>
      <DiplomaTitle>Освою ключевые навыки</DiplomaTitle>
      <KeywordsWrapper>
        {keywords.length < 1&& (
          <>
            {makeEmptyList(7).map((a, index) => {
              return (
                <div
                  key={index}
                  className="skeletonKeywords MainSkeleton"
                  style={{
                    'width': Math.floor(Math.random() * (390 - 41 + 1)) + 20 + 'px',
                  }}
                />
              )
            })}
          </>
        )}
        {keywords.map((keyword: KeywordType) => (
          <Keyword
            key={keyword.id}
            deletable={false}
            keyword={keyword}
            bg-color="#EBEBFF"
          />
        ))}
        {!isKeywordsButtonHidden &&
          <ShowMoreKeywordsButton onClick={() => displayModal(<KeywordsModal keywords={keywords} />)}>
            {`+${keywordsCount - 10}`}
          </ShowMoreKeywordsButton>
        }
      </KeywordsWrapper>
    </DiplomaTileWrapper>
  )
}

export default Keywords
