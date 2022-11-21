import React, {useContext, useState} from "react";
import './index.scss';
import copy from "copy-to-clipboard";
import {useSearchParams} from "react-router-dom";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type ShareModalPropType = {}

const ShareModal = (props: ShareModalPropType) => {

  const [searchParams] = useSearchParams()

  const [isLinkWithNameCopied, setIsLinkWithNameCopied] = useState(false)
  const [isLinkWithoutNameCopied, setIsLinkWithoutNameCopied] = useState(false)
  const [name, setName] = useState('')

  const shareWithoutName = () => {
    setIsLinkWithoutNameCopied(true)
    copy(`${window.location.origin}/diplomaShare?id=${searchParams.get('id')}`)
    setTimeout(() => {
      window.open(`${window.location.origin}/diplomaShare?id=${searchParams.get('id')}`, '_blank');
    }, 1500)
  }

  const shareWithName = () => {
    setIsLinkWithNameCopied(true)
    copy(`${window.location.origin}/diplomaShare?id=${searchParams.get('id')}`)
    setTimeout(() => {
      window.open(`${window.location.origin}/diplomaShare?id=${searchParams.get('id')}&name=${name}`, '_blank');
    }, 1500)
  }

  return (
    <div className="shareModalContainer">
      <div className="shareModalHeaderContainer">
        <img src="../../../static/PicShareDeck.svg" className="shareModal-cover"/>
      </div>
      <div className="shareContent">
        <div className="shareContentHeader">Поделиться</div>
        <div className="shareForm">
          <div className="shareInputContainer">
            <label className="modalShareInputLabel">Мы можем подписать траекторию</label>
            <input
              className="keywordsInput"
              placeholder="Введи ключевое слово"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="shareBtnContainer">
            <button className="SecondaryButton secondaryButtonShare" onClick={shareWithoutName}>
            { isLinkWithoutNameCopied ? 'Ссылка скопирована' : 'Продолжить без имени' }
          </button>
          <button
            disabled={name === ''}
            className="MainButton mainButtonShare"
            onClick={shareWithName}
          >
          { isLinkWithNameCopied ? 'Ссылка скопирована' : 'Поделиться' }
        </button>
      </div>
    </div>
</div>
</div>
  )
};

export default ShareModal