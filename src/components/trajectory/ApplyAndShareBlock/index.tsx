import React, { useContext } from 'react'
import './index.scss'
import ShareModal from '../../Modals/ShareModal'
import Share from '../../../images/icons/share'
import ModalsContext from '../../../Context/Modal'
import Button from '../../../ui-kit/standard/Button'

type ApplyAndShareBlockProps = {
  linkAbit: string
}

export default function ApplyAndShareBlock(props: ApplyAndShareBlockProps) {
  const { linkAbit } = props
  const { displayModal } = useContext(ModalsContext)

  return (
    <div className={`mobileBottomWrapperApply`} id="mobilBottomButton">
      <span className="marginText descriptionDiplomaMobile">
        Это твоя траектория в университете ИТМО!
        <br />
        Поступай к нам чтобы изучать то, что нравится.
      </span>
      <div className="buttons-wrapper">
        <Button
          buttonStyle={'main'}
          isDisabled={false}
          onClick={() =>
            setTimeout(() => {
              window.open(linkAbit, '_blank')
            })
          }
          classNames={['mobile-button maxWidth']}
        >
          <span className={'button-text'}>Поступить в ИТМО</span>
        </Button>
        <Button
          buttonStyle={'secondary'}
          onClick={() => displayModal(<ShareModal />)}
          isDisabled={false}
          classNames={['mobile-button']}
        >
          <span className={'button-text share'}>Поделиться</span>
          <div className="share-button-content">
            <div className={'share-icon'}>
              <Share />
            </div>
          </div>
        </Button>
      </div>
    </div>
  )
}
