import React, { useEffect } from 'react'
import './index.scss'

type YoutubeVideoPropType = {
  youTubeVideoId?: string | null
}

const YoutubeVideo = (props: YoutubeVideoPropType) => {
  const { youTubeVideoId } = props
  const youTubeSrc = `https://www.youtube.com/embed/${youTubeVideoId}`

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
    <div className={`innerWrapper mobilePlayerWrap`}>
      {typeof youTubeVideoId !== 'undefined' && youTubeVideoId ? (
        <iframe
          id={'playerFrame'}
          className={`player ${youTubeVideoId ? '' : 'MainSkeleton'}`}
          src={youTubeSrc}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div
          id={'playerFrame'}
          style={{ width: '100%', minHeight: '155px' }}
          className={'MainSkeleton'}
        />
      )}
    </div>
  )
}

export default YoutubeVideo
