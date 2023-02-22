import React, { useContext } from 'react'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import { DiplomaTileWrapper, DiplomaTitle } from '../DiplomaGeneralStyles'
import { isMobile } from 'react-device-detect'
import ModalContext from '../../../Context/Modal'

type GenericModalPropType = {
  iconUrl: string
  title: string
  youTubeVideoId?: string
}

const TextSmall = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
`

const BachelorTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`

const StyledIcon = styled.img`
  margin-right: 8px;
  width: 16px;
  height: 16px;
`

const videoId = 'ao7aX7nkCHg'
const youTubeSrc = `https://www.youtube.com/embed/${videoId}`
const previewSrc = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

const Description = (props: GenericModalPropType) => {
  const { iconUrl, title } = props
  const { displayModal } = useContext(ModalContext)

  return (
    <DiplomaTileWrapper>
      <div className={'innerWrapper'}>
        {isMobile ? (
          <div className="player ratio ratio-16x9">
            <iframe
              className="you"
              src={youTubeSrc}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div
            className="preview"
            onClick={() =>
              displayModal(
                <div className={'modalPlayer'}>
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/ao7aX7nkCHg"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>,
              )
            }
          >
            <img src={previewSrc} alt="preview" />
          </div>
        )}

        <div>
          <DiplomaTitle>{title}</DiplomaTitle>
          <br />
          <TextSmall>Университет ИТМО, г. Санкт-Петербург</TextSmall>
          <BachelorTitleWrapper>
            <StyledIcon src={iconUrl} alt="icon" />
            <TextSmall>Бакалавриат</TextSmall>
          </BachelorTitleWrapper>
        </div>
      </div>
    </DiplomaTileWrapper>
  )
}

export default Description
