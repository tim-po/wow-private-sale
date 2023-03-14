import React, { useContext, useEffect } from 'react'
import './index.scss'
import styled from 'styled-components'
import { DiplomaTileWrapper, DiplomaTitle } from '../DiplomaGeneralStyles'
import { isMobile } from 'react-device-detect'
import ModalContext from '../../../Context/Modal'
import PlayVideoArrow from '../../../images/icons/playVideo'

type GenericModalPropType = {
  iconUrl: string
  title: string
  youTubeVideoId?: string | null
}

const TextSmall = styled.span`
  font-weight: normal;
  font-size: 14px;
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

const Description = (props: GenericModalPropType) => {
  const { iconUrl, title, youTubeVideoId } = props
  const { displayModal } = useContext(ModalContext)
  const youTubeSrc = `https://www.youtube.com/embed/${youTubeVideoId}`
  const previewSrc = `https://i.ytimg.com/vi/${youTubeVideoId}/maxresdefault.jpg`

  useEffect(() => {
    const player = document.querySelector('#playerFrame')
    if (player) {
      player.setAttribute(
        'style',
        `width: 100%; height:${((player.clientWidth * 9) / 16).toFixed(2)}px`,
      )
    }
  })

  return (
    <DiplomaTileWrapper>
      <div
        className={`innerWrapper ${isMobile ? 'mobilePlayerWrap' : 'desktopPlayerWrap'}`}
      >
        {typeof youTubeVideoId !== 'undefined' &&
          (isMobile ? (
            youTubeVideoId ? (
              <iframe
                id={'playerFrame'}
                className={`player ${youTubeVideoId ? '' : 'MainSkeleton'}`}
                src={youTubeSrc}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div
                id={'playerFrame'}
                style={{ width: '100%', minHeight: '155px' }}
                className={'MainSkeleton'}
              />
            )
          ) : (
            <div
              className={`preview ${youTubeVideoId ? '' : 'MainSkeleton'}`}
              onClick={() =>
                displayModal(
                  <div className={'modalPlayer'}>
                    {youTubeVideoId && (
                      <iframe
                        id={'playerFrame'}
                        className={'player'}
                        width="100%"
                        src={youTubeSrc}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>,
                )
              }
            >
              <div className={'arrowBox'}>
                <PlayVideoArrow />
              </div>
              {youTubeVideoId && <img src={previewSrc} alt="preview" />}
            </div>
          ))}

        <div>
          <DiplomaTitle>
            {title ? (
              title
            ) : (
              <div
                style={{ width: 200, height: 20, borderRadius: 8, marginBottom: 12 }}
                className="MainSkeleton"
              />
            )}
          </DiplomaTitle>
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
