export type Profession = {
  svg: string
  description: string
  id: string
  category: string
  related_keywords: KeywordType[]
  visible_keywords: KeywordType[]
  name: string
}

export type KeywordType = { text: string, id: string }

export type PresetType = {
  id: string
  category: string
  tag: string
  title: string
  keywords: KeywordType[]
}

export type TrajectoryType = {
  id: string
  educational_plan: string
  coverage: number
  student: number
  courses: CourseType[]
  abit?: string
}

export type CourseType = {
  course: number
  coverage: number
  main_keywords: string[]
  control_types_count: { name: string, count: number }[]
}