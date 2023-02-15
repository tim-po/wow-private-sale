import { FC } from 'react'
import IconBag from '../../images/icons/IconBag/IconBag'
import IconTie from '../../images/icons/IconTie'
import IconPuzzle from '../../images/icons/IconPuzzle'
import IconScissors from '../../images/icons/IconScissors'
import IconTracks from '../../images/icons/IconTracks'
import IconPath from '../../images/icons/IconPath'

type navigationItem = {
  path: string
  title: string
  params?: string
  icon: FC
  isOptional?: true
  passed: boolean
}

export const navigationsItems: navigationItem[] = [
  { path: 'professions', title: 'Профессии', icon: IconBag, passed: false },
  { path: 'profession', title: 'Моя профессия', icon: IconTie, passed: false },
  { path: 'skills', title: 'Наборы навыков', icon: IconPuzzle, passed: false },
  {
    path: 'keywords',
    title: 'Ключевые сова',
    icon: IconScissors,
    isOptional: true,
    passed: false,
  },
  { path: 'trajectories', title: 'Траектории', icon: IconTracks, passed: false },
  { path: 'trajectory', title: 'Моя траектория', icon: IconPath, passed: false },
]
