<template>
    <li class="text-gray-700 dark:text-gray-300">
      <RendererNode
        v-for="(child, index) in node.content"
        :key="index"
        :node="child"
      />
    </li>
  </template>
  
  <script setup lang="ts">
  import type { TipTapNode } from '~/types/article'
  defineProps<{ node: TipTapNode }>()
  </script>