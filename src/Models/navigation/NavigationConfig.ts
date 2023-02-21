import { FC } from 'react'
import IconBag from '../../images/icons/IconBag/IconBag'
import IconTie from '../../images/icons/IconTie'
import IconPuzzle from '../../images/icons/IconPuzzle'
import IconScissors from '../../images/icons/IconScissors'
import IconTracks from '../../images/icons/IconTracks'
import IconPath from '../../images/icons/IconPath'

export enum Path {
  'professions' = 'professions',
  'profession' = 'profession',
  'skills' = 'skills',
  'keywords' = 'keywords',
  'trajectories' = 'trajectories',
  'trajectory' = 'trajectory',
}

type NavigationItemConfig = {
  path: Path
  title: string
  params?: string
  icon: FC
  isOptional?: true
}

export type NavigationItem = {
  path: Path
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
  { path: Path.professions, title: 'Профессии', icon: IconBag },
  { path: Path.profession, title: 'Моя профессия', icon: IconTie },
  { path: Path.skills, title: 'Наборы навыков', icon: IconPuzzle },
  {
    path: Path.keywords,
    title: 'Ключевые сова',
    icon: IconScissors,
    isOptional: true,
  },
  { path: Path.trajectories, title: 'Траектории', icon: IconTracks },
  { path: Path.trajectory, title: 'Моя траектория', icon: IconPath },
]

export const navigationItems: { [key in Path as string]: NavigationItem } =
  Object.fromEntries(
    navigationItemsConfig.map((item, index) => [item.path, { ...item, index: index }]),
  )

export const navigationItemKeys: string[] = Object.keys(navigationItems)
