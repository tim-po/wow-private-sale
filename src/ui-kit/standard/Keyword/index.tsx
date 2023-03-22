import React, { useState } from 'react'
import { KeywordType } from '../../../types'
import Close from '../../../images/icons/close'
import styled, { css } from 'styled-components'

type KeywordPropType = {
  deletable?: boolean
  keyword: KeywordType
  bgColor?: string
  selected?: boolean
  onDeleteSelf?: (keyword: KeywordType) => void
  onSelectSelf?: () => void
}

const DeletedKeyword = css`
  transform: scale(0.9);
  opacity: 0;
`

const SelectedKeyword = css`
  border: 1px solid var(--color-5-dark);
  cursor: pointer;
`

const SelectableKeyword = css`
  cursor: pointer;
  &:hover{
    background: #DDDDFD;
  }
`

const KeywordSpan = styled.span<{
  isDeleted: boolean | undefined
  selected: boolean | undefined
  background?: string
}>`
  display: flex;
  align-items: center;
  background:${({ background }) => background || '#EEEEFF'} ;
  transition: all 0.2s, border 0.3s;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  transform: scale(1);
  opacity: 1;
  line-height: 15px;
  border: 1px solid rgba(255, 255, 255, 0.01);
  position: relative;
  
  ${({ isDeleted }) => isDeleted && DeletedKeyword}
  ${({ selected }) => selected && SelectedKeyword}
  ${({ selected }) => selected !== undefined && SelectableKeyword}
`

const CloseWrap = styled.div`
  margin-left: 8.81px;
`

const ButtonSplash = styled.button`
  position: absolute;
  left:0;
  right: 0;
  top:0;
  bottom: 0;
  padding: 0;
  margin: 0;
`

const Keyword = (props: KeywordPropType) => {
  const { deletable, keyword, bgColor, selected, onDeleteSelf, onSelectSelf } = props

  const [isDeleted, setIsDeleted] = useState(false)

  const deleteSelf = () => {
    setIsDeleted(true)
    setTimeout(() => {
      if (onDeleteSelf) {
        onDeleteSelf(keyword)
      }
    }, 200)
  }

  return (
    <KeywordSpan isDeleted={isDeleted} selected={selected} background={bgColor}>
      <span>{keyword.text}</span>
      {deletable && (
        <CloseWrap>
          <Close width={7.38} height={7.38} />
        </CloseWrap>
      )}

      {(onSelectSelf || onDeleteSelf) && (
        <ButtonSplash onClick={onSelectSelf || deleteSelf} />
      )}
    </KeywordSpan>
  )
}

export default Keyword
