<template>
    <th class="px-4 py-3 font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 whitespace-nowrap">
      <RendererNode
        v-for="(child, index) in node.content"
        :key="index"
        :node="child"
      />
    </th>
  </template>
  
  <script setup lang="ts">
  import type { TipTapNode } from '~/types/article'
  defineProps<{ node: TipTapNode }>()
  </script>