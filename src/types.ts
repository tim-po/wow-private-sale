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

type DisciplineItemType = {
  count: number
  name: string
}

export type DiplomaCardDataType = {
  count: number
  name: string
  disciplines: DisciplineItemType[]
}

export type DiplomaDataType = {
  total_disciplines: number
  main_keywords: string[]
  id: number
  educational_plan: string
  classes_count: DiplomaCardDataType[]
  control_types_count: DiplomaCardDataType[]
}

type ClassItemType = {
  disciplines_count: number
  name: string
  disciplines: {name: string, control_types: { [key: string]: { name: string, count: number } }}[]
}

export type DiplomaShareCardType = {
  course: number
  disciplines_count: number
  classes: ClassItemType
}

export type DiplomaShareDataType = {
  educational_plan: string
  id: number
  main_keywords: string[]
  courses: DiplomaShareCardType[]
  total_disciplines: number
}