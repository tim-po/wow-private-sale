type navigationItem = {
  path: string
  title: string
  params?: string
  icon: number
}

export const navigationsItems: navigationItem[] = [
  { path: '/professions', title: 'Профессии', icon: 1 },
  { path: '/professionDetails', title: 'Моя профессия', icon: 2 },
  { path: '/trajectories', title: 'Траектории', icon: 3 },
  { path: '/trajectory', title: 'Моя траектория', icon: 4 },
]
