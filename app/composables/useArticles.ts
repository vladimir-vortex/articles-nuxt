import type { Article, ArticleListItem, PaginatedResponse } from '~/types/article'

// Мок-данные для разработки
const mockArticles: ArticleListItem[] = [
  {
    id: '1',
    slug: 'first-article',
    title: 'Первая тестовая статья',
    description: 'Описание первой статьи для проверки вёрстки карточек и списка.',
    authors: [{ id: '1', name: 'Иван Иванов' }],
    tags: ['физика', 'наука'],
    readingTime: 5,
    publishedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: '2',
    slug: 'second-article',
    title: 'Вторая статья с длинным заголовком для проверки переноса текста',
    description: 'Более длинное описание второй статьи. Проверяем как обрезается текст в карточке при большом количестве символов.',
    authors: [{ id: '1', name: 'Иван Иванов' }, { id: '2', name: 'Пётр Петров' }],
    tags: ['математика', 'алгебра', 'теория'],
    readingTime: 12,
    publishedAt: '2025-02-20T10:00:00Z',
  },
  {
    id: '3',
    slug: 'third-article',
    title: 'Третья статья',
    description: 'Краткое описание.',
    authors: [{ id: '2', name: 'Пётр Петров' }],
    tags: ['химия'],
    readingTime: 3,
    publishedAt: '2025-03-10T10:00:00Z',
  },
]

const USE_MOCK = true // ← переключи на false когда бэкенд будет готов

export const useArticles = () => {
  const { apiBase } = useRuntimeConfig().public

  const getArticles = (page = 1, perPage = 12) => {
    if (USE_MOCK) {
      return Promise.resolve<PaginatedResponse<ArticleListItem>>({
        data: mockArticles,
        total: mockArticles.length,
        page,
        perPage,
        lastPage: 1,
      })
    }
    return $fetch<PaginatedResponse<ArticleListItem>>(`${apiBase}/articles`, {
      params: { page, per_page: perPage },
    })
  }

  const getArticle = (slug: string) => {
    if (USE_MOCK) {
      const found = mockArticles.find(a => a.slug === slug)
      if (!found) return Promise.reject(new Error('Not found'))
      return Promise.resolve<Article>({
        ...found,
        content: {
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [{ type: 'text', text: 'Введение' }],
            },
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Обычный текст, ' },
                { type: 'text', text: 'жирный', marks: [{ type: 'bold' }] },
                { type: 'text', text: ', ' },
                { type: 'text', text: 'курсив', marks: [{ type: 'italic' }] },
                { type: 'text', text: ', ' },
                { type: 'text', text: 'жирный курсив', marks: [{ type: 'bold' }, { type: 'italic' }] },
                { type: 'text', text: ', ' },
                { type: 'text', text: 'inline код', marks: [{ type: 'code' }] },
                { type: 'text', text: ' и ' },
                {
                  type: 'text',
                  text: 'ссылка',
                  marks: [{ type: 'link', attrs: { href: 'https://nuxt.com' } }],
                },
                { type: 'text', text: '.' },
              ],
            },
            {
              type: 'callout',
              attrs: { type: 'info' },
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Это информационный callout.' }],
                },
              ],
            },
            {
              type: 'callout',
              attrs: { type: 'warning' },
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Это предупреждение.' }],
                },
              ],
            },
            {
              type: 'callout',
              attrs: { type: 'danger' },
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Это важное сообщение.' }],
                },
              ],
            },
            {
              type: 'callout',
              attrs: { type: 'note' },
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Это примечание.' }],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [{ type: 'text', text: 'Списки' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    { type: 'paragraph', content: [{ type: 'text', text: 'Первый пункт' }] },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    { type: 'paragraph', content: [{ type: 'text', text: 'Второй пункт' }] },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    { type: 'paragraph', content: [{ type: 'text', text: 'Третий пункт' }] },
                  ],
                },
              ],
            },
            {
              type: 'orderedList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    { type: 'paragraph', content: [{ type: 'text', text: 'Первый нумерованный' }] },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    { type: 'paragraph', content: [{ type: 'text', text: 'Второй нумерованный' }] },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [{ type: 'text', text: 'Цитата' }],
            },
            {
              type: 'blockquote',
              attrs: { author: 'Ричард Фейнман', source: 'Лекции по физике' },
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Природа не заботится о наших математических трудностях — она интегрирует эмпирически.' }],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [{ type: 'text', text: 'Код' }],
            },
            {
              type: 'codeBlock',
              attrs: { language: 'typescript' },
              content: [
                {
                  type: 'text',
                  text: 'const greet = (name: string): string => {\n  return `Hello, ${name}!`\n}\n\nconsole.log(greet("World"))',
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [{ type: 'text', text: 'Таблица' }],
            },
            {
              type: 'table',
              attrs: { caption: 'Сравнение фреймворков', number: '1' },
              content: [
                {
                  type: 'tableRow',
                  content: [
                    { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Фреймворк' }] }] },
                    { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Язык' }] }] },
                    { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'SSR' }] }] },
                  ],
                },
                {
                  type: 'tableRow',
                  content: [
                    { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Nuxt' }] }] },
                    { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Vue' }] }] },
                    { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '✅' }] }] },
                  ],
                },
                {
                  type: 'tableRow',
                  content: [
                    { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Next' }] }] },
                    { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'React' }] }] },
                    { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '✅' }] }] },
                  ],
                },
              ],
            },
            {
              type: 'horizontalRule',
            },
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [{ type: 'text', text: 'Видео' }],
            },
            {
              type: 'video',
              attrs: {
                provider: 'youtube',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                caption: 'Тестовое видео',
              },
            },
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [{ type: 'text', text: 'Файл' }],
            },
            {
              type: 'file',
              attrs: {
                url: '/files/sample.pdf',
                name: 'Полный текст статьи (PDF)',
                size: 2457600,
              },
            },
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [{ type: 'text', text: 'Список литературы' }],
            },
            {
              type: 'bibliography',
              attrs: {},
              content: [
                {
                  type: 'bibliographyItem',
                  attrs: {
                    id: 'ref1',
                    authors: 'Иванов И.И., Петров П.П.',
                    year: '2023',
                    title: 'Название первой работы',
                    source: 'Журнал физики, т. 12, с. 45–60',
                  },
                },
                {
                  type: 'bibliographyItem',
                  attrs: {
                    id: 'ref2',
                    authors: 'Сидоров С.С.',
                    year: '2022',
                    title: 'Название второй работы',
                    source: 'Вестник науки, т. 5, с. 12–20',
                  },
                },
              ],
            },
          ],
        },
        createdAt: found.publishedAt ?? '',
        updatedAt: found.publishedAt ?? '',
      })
    }
    return $fetch<Article>(`${apiBase}/articles/${slug}`)
  }

  return { getArticles, getArticle }
}