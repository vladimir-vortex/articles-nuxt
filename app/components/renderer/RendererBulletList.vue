<template>
    <ul class="my-4 pl-6 list-disc space-y-1">
      <RendererNode
        v-for="(child, index) in node.content"
        :key="index"
        :node="child"
      />
    </ul>
  </template>
  
  <script setup lang="ts">
  import type { TipTapNode } from '~/types/article'
  defineProps<{ node: TipTapNode }>()
  </script>