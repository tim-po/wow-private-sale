import React from "react";
import numeralize from "numeralize-ru";

export const refactorName = (count:number, examName:string):string =>{
  if(examName==='Экзамен')
    return numeralize.pluralize(count, 'Экзамен', 'Экзамена', 'Экзаменов')
  else if(examName==='Зачет')
    return numeralize.pluralize(count, 'Зачет', 'Зачета', 'Зачетов')
  else if (examName==='Дифференцированный зачет')
    return numeralize.pluralize(count, 'Диф.зачет', 'Диф.зачета', 'Диф.зачетов')
  else if (examName=== 'Консультация')
    return numeralize.pluralize(count, 'Консультация', 'Консультации', 'Консультаций')
  else if (examName=== 'Курсовая работа')
    return numeralize.pluralize(count, 'Курсовая', 'Курсовые', 'Курсовых')
  return ''
}

