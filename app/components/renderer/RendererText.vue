<template>
  <component :is="tag" v-bind="attrs">
    <RendererText v-if="innerNode" :node="innerNode" />
    <template v-else>{{ node.text }}</template>
  </component>
</template>

<script setup lang="ts">
import type { TipTapNode } from '~/types/article'

const props = defineProps<{ node: TipTapNode }>()

// Marks обрабатываем рекурсивно — каждый mark оборачивает предыдущий.
// Берём первый mark, оборачиваем им остаток узла с оставшимися marks.
const currentMark = computed(() => props.node.marks?.[0])

const innerNode = computed((): TipTapNode | null => {
  if (!props.node.marks?.length || props.node.marks.length <= 1) return null
  // Узел с оставшимися marks (без первого)
  return { ...props.node, marks: props.node.marks.slice(1) }
})

const tag = computed(() => {
  if (!currentMark.value) return 'span'

  switch (currentMark.value.type) {
    case 'bold':      return 'strong'
    case 'italic':    return 'em'
    case 'strike':    return 's'
    case 'code':      return 'code'
    case 'link':      return 'a'
    case 'underline': return 'u'
    default:          return 'span'
  }
})

const attrs = computed(() => {
  if (currentMark.value?.type === 'link') {
    return {
      href: currentMark.value.attrs?.href as string,
      target: currentMark.value.attrs?.target as string ?? '_blank',
      rel: 'noopener noreferrer',
    }
  }
  return {}
})
</script>