export type KeywordType = { text: string; id: string }

export type Profession = {
  svg: string
  description: string
  id: string
  category: string
  related_keywords: KeywordType[]
  visible_keywords: KeywordType[]
  name: string
  salaries: number[]
}

export type PresetType = {
  id: string
  category: string
  tag: string
  title: string
  keywords: KeywordType[]
}

export type CountType = {
  count: number
  name: string
}

export type DisciplineType = {
  id: number
  name: string
  class: string
  control_type: string
  necessity: string
  next_disciplines: number[]
}

export type ClassType = {
  name: string
  first_semesters_disciplines: DisciplineType[]
  second_semesters_disciplines: DisciplineType[]
}

export type CourseType = {
  course: number
  coverage: number
  main_keywords: string[]
  control_type_count: CountType[]
  control_types_count: CountType[]
  classes_count: (CountType & { disciplines: CountType[] })[]
  necessity_count: CountType[]
  classes: ClassType[]
}

export type TrajectoryType = {
  id: string
  code: string
  is_required: boolean
  educational_plan: string
  coverage: number
  student: number
  courses: CourseType[]
  abit_link: string
}

export type DiplomaDataType = {
  total_disciplines: number
  main_keywords: string[]
  video_id: string
  id: number
  educational_plan: string
  classes_count: (CountType & { disciplines: CountType[] })[]
  control_types_count: (CountType & { disciplines: CountType[] })[]
  abit_link: string
}

type DisciplineClassItemType = {
  disciplines_count: number
  name: string
  disciplines: { name: string; control_types: { [key: string]: CountType[] } }[]
}

export type DiplomaShareCardType = {
  course: number
  disciplines_count: number
  classes: DisciplineClassItemType[]
}

export type DiplomaShareDataType = {
  educational_plan: string
  id: number
  main_keywords: string[]
  courses: DiplomaShareCardType[]
  total_disciplines: number
  video_id: string
  abit_link: string
}

export type NextOrPrevDisciplinesType = {
  id: number
  name: string
  semester: number
}

export type TrajectoryDisciplineType = {
  class: string
  semester: number
  control: string
  id: number
  keywords: string[]
  keywords_aligned_with_user: string[]
  keywords_coverage: number
  name: string
  necessity: boolean
  next_disciplines: NextOrPrevDisciplinesType[]
  prev_disciplines: NextOrPrevDisciplinesType[]
  replacement_options: NextOrPrevDisciplinesType[]
}

export enum RoutesName {
  START = '/',
  PROFESSIONS = '/professions/*',
  PROFESSION = '/profession/:profId',
  SKILLS = '/skills',
  KEYWORDS = '/keywords',
  DIPLOMA_SHARE = '/diplomaShare*',
  TRAJECTORY = '/trajectory*',
  TRAJECTORY_DIPLOMA = '/trajectoryDiploma',
  TRAJECTORIES = '/trajectories*',
  NOT_FOUND = '/*',
}

export interface LetterImageProps {
  width: number
  height: number
}
