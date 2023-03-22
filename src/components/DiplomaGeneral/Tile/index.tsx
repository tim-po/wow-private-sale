import React from 'react'
import './index.scss'
import { DiplomaTileWrapper, DiplomaTitle } from '../DiplomaGeneralStyles'

type TilePropType = {
  title?: string
  children: React.ReactNode | React.ReactNode[]
}

const Tile = (props: TilePropType) => {
  const { title, children } = props

  return (
    <DiplomaTileWrapper>
      <>
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
        {children}
      </>
    </DiplomaTileWrapper>
  )
}

export default Tile
