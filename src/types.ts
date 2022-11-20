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