import React, { useState } from 'react'
import './index.scss'
import copy from 'copy-to-clipboard'
import { useSearchParams } from 'react-router-dom'
import Button from 'components/Button'

const ShareModal = () => {
  const [searchParams] = useSearchParams()

  const [isLinkWithNameCopied, setIsLinkWithNameCopied] = useState(false)
  const [isLinkWithoutNameCopied, setIsLinkWithoutNameCopied] = useState(false)
  const [name, setName] = useState('')

  const shareWithoutName = () => {
    setIsLinkWithoutNameCopied(true)
    copy(`${window.location.origin}/diplomaShare?id=${searchParams.get('id')}`)
    setTimeout(() => {
      window.open(
        `${window.location.origin}/diplomaShare?id=${searchParams.get('id')}`,
        '_blank',
      )
    })
  }
  const shareWithName = () => {
    setIsLinkWithNameCopied(true)
    copy(`${window.location.origin}/diplomaShare?id=${searchParams.get('id')}`)
    setTimeout(() => {
      window.open(
        `${window.location.origin}/diplomaShare?id=${searchParams.get(
          'id',
        )}&name=${name}`,
        '_blank',
      )
    })
  }

  return (
    <div className="shareModalContainer">
      <div className="shareModalHeaderContainer">
        <img alt="img" style={{ width: '100%' }} src={'/static/shareBg.svg'} />
      </div>
      <div className="shareContent">
        <div className="shareContentHeader">Поделиться</div>
        <div className="shareForm">
          <div className="shareInputContainer">
            <label className="modalShareInputLabel">Мы можем подписать траекторию</label>
            <input
              className="shareInput"
              placeholder="Для кого траектория"
              onChange={event => setName(event.target.value)}
            />
          </div>
          <div className="shareBtnContainer">
            <Button
              buttonStyle={'secondary'}
              onClick={() => shareWithoutName()}
              // onClick={() =>
              //   setTimeout(() => {
              //     window.open(linkAbit, '_blank')
              //   })
              isDisabled={false}
              classNames={['share-button']}
            >
              {isLinkWithoutNameCopied ? 'Ссылка скопирована' : 'Продолжить без имени'}
            </Button>
            <Button
              buttonStyle={'main'}
              onClick={shareWithName}
              isDisabled={name === ''}
              classNames={['share-button']}
            >
              {isLinkWithNameCopied ? 'Ссылка скопирована' : 'Поделиться'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareModal
