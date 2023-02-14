import { KeywordType } from '../types'

export const makeKeywordsArray = (keywords: string[]) => {
  const keywordsArray: KeywordType[] = []
  if (keywords.length) {
    keywords.map((keyword: string) => {
      const keywordItem: KeywordType = {
        text: keyword,
        id: Math.random().toString(16).slice(2),
      }
      keywordsArray.push(keywordItem)
    })
  }
  return keywordsArray
}
