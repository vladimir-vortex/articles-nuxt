// Базовые типы TipTap JSON-дерева
export interface TipTapMark {
    type: string
    attrs?: Record<string, unknown>
  }
  
  export interface TipTapNode {
    type: string
    attrs?: Record<string, unknown>
    content?: TipTapNode[]
    marks?: TipTapMark[]
    text?: string
  }
  
  export interface TipTapJSON {
    type: 'doc'
    content: TipTapNode[]
  }
  
  // ---
  
  export interface Author {
    id: string
    name: string
    avatar?: string
    bio?: string
  }
  
  export interface ArticleListItem {
    id: string
    slug: string
    title: string
    description: string
    authors: Author[]
    tags: string[]
    coverImage?: string
    readingTime?: number
    publishedAt?: string
  }
  
  export interface Article extends ArticleListItem {
    content: TipTapJSON
    createdAt: string
    updatedAt: string
  }
  
  export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    perPage: number
    lastPage: number
  }