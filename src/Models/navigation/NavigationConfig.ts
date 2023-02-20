import { FC } from 'react'
import IconBag from '../../images/icons/IconBag/IconBag'
import IconTie from '../../images/icons/IconTie'
import IconPuzzle from '../../images/icons/IconPuzzle'
import IconScissors from '../../images/icons/IconScissors'
import IconTracks from '../../images/icons/IconTracks'
import IconPath from '../../images/icons/IconPath'

type NavigationItemConfig = {
  path: string
  title: string
  params?: string
  icon: FC
  isOptional?: true
}

export type NavigationItem = {
  path: string
  title: string
  params?: string
  icon: FC
  isOptional?: true
  index: number
}

export type NavigationItemStatus =
  | 'prev'
  | 'last'
  | 'current'
  | 'nextOptional'
  | 'next'
  | 'further'
  | 'notDisplayed'

const navigationItemsConfig: NavigationItemConfig[] = [
  { path: 'professions', title: 'Профессии', icon: IconBag },
  { path: 'profession', title: 'Моя профессия', icon: IconTie },
  { path: 'skills', title: 'Наборы навыков', icon: IconPuzzle },
  {
    path: 'keywords',
    title: 'Ключевые сова',
    icon: IconScissors,
    isOptional: true,
  },
  { path: 'trajectories', title: 'Траектории', icon: IconTracks },
  { path: 'trajectory', title: 'Моя траектория', icon: IconPath },
]

export const navigationItems: { [key: string]: NavigationItem } = Object.fromEntries(
  navigationItemsConfig.map((item, index) => [item.path, { ...item, index: index }]),
)

export const optionalSteps = navigationItemsConfig.filter(item => item.isOptional)

export const navigationItemKeys: string[] = Object.keys(navigationItems)
