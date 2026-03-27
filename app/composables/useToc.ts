import type { TipTapJSON, TipTapNode } from '~/types/article'

export interface TocItem {
  id: string
  text: string
  level: number
}

export const useToc = () => {
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')     // пробелы → дефис
      .replace(/[^\p{L}\p{N}-]/gu, '')  // оставляем буквы любого языка, цифры, дефис

  const extractText = (node: TipTapNode): string => {
    if (node.type === 'text') return node.text ?? ''
    return node.content?.map(extractText).join('') ?? ''
  }

  const extractToc = (content: TipTapJSON): TocItem[] => {
    const items: TocItem[] = []

    const walk = (nodes: TipTapNode[]) => {
      for (const node of nodes) {
        if (node.type === 'heading') {
          const level = node.attrs?.level as number
          if (level >= 1 && level <= 3) {
            const text = extractText(node)
            if (text) items.push({ id: slugify(text), text, level })
          }
        }
        if (node.content) walk(node.content)
      }
    }

    walk(content.content)
    return items
  }

  return { extractToc, slugify, extractText }
}