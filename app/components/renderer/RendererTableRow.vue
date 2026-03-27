<template>
    <tr class="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <RendererNode
        v-for="(child, index) in node.content"
        :key="index"
        :node="child"
      />
    </tr>
  </template>
  
  <script setup lang="ts">
  import type { TipTapNode } from '~/types/article'
  defineProps<{ node: TipTapNode }>()
  </script>