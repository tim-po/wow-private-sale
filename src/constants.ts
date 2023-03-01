export const BASE_URL = process.env.REACT_APP_API_URL
// export const COLORS_BY_CATEGORY: { [key: string]: string } = {
//   'Программирование': 'var(--color-7-light)',
//   'Менеджмент': 'var(--color-10-light)',
//   'Инженерия': 'var(--color-6-light)',
//   'Науки о жизни': 'var(--color-3-light)',
//   'Art & Science': 'var(--color-4-light)',
// }

export const COLORS_BY_PROFESSION: { [key: string]: string[] } = {
  'var(--color-7-light)': [
    'Game Designer',
    'Frontend-разработчик',
    'Backend-разработчик',
    'Data Scientist',
    'DevOps инженер',
    'Специалист  по инф. безопасности',
    'Мобильный разработчик',
    'Системный архитектор',
    'Программист микроконтроллеров',
  ],
  'var(--color-10-light)': [
    'Product-менеджер',
    'Маркетолог',
    'Экономист',
    'Бизнес-аналитик',
  ],
  'var(--color-14)': [
    'Инженер-исследователь',
    'Инженер-проектировщик',
    'Инженер-конструктор',
  ],
  'var(--color-3-light)': [
    'Биотехнолог',
    'Эколог',
    'Технолог пищевой промышленности',
    'Микробиолог',
  ],
  'var(--color-4-light)': ['UX/UI Designer', '3D Modeller', 'Game Designer'],
  'var(--color-6-light)': ['Инженер-оптик', 'Оператор лазерных систем'],
}

export const allControllTypes = [
  'Экзамен',
  'Зачет',
  'Дифференцированный зачет',
  'Курсовая работа',
]

export const colors: { [key: string]: string } = {
  'программирование и информационные технологии': '#677CE8',
  'soft-skills': '#F49987',
  'естественные науки': '#75C2DC',
  'электроника и робототехника': '#6290D0',
  'математика': '#7C81F1',
  'физика': '#B386E7',
  'экономика и менеджмент': '#F18AA7',
  'гуманитарные науки': '#9480EF',
  'физкультура': '#E185CD',
  'введение в профессиональную деятельность': '#CF7DDC',
  'практика': '#989CF8',
  'другое': '#996FDB',
}
