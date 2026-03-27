<template>
    <blockquote class="my-6 border-l-4 border-gray-300 dark:border-gray-600 pl-5">
      <div class="text-gray-700 dark:text-gray-300 italic">
        <RendererNode
          v-for="(child, index) in node.content"
          :key="index"
          :node="child"
        />
      </div>
      <footer v-if="author || source" class="mt-3 text-sm text-gray-500 dark:text-gray-400 not-italic">
        <span v-if="author" class="font-medium">{{ author }}</span>
        <span v-if="author && source"> — </span>
        <cite v-if="source">{{ source }}</cite>
      </footer>
    </blockquote>
  </template>
  
  <script setup lang="ts">
  import type { TipTapNode } from '~/types/article'
  
  const props = defineProps<{ node: TipTapNode }>()
  
  const author = computed(() => props.node.attrs?.author as string | undefined)
  const source = computed(() => props.node.attrs?.source as string | undefined)
  </script>