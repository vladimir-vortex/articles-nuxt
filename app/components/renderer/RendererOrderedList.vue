<template>
    <ol class="my-4 pl-6 list-decimal space-y-1">
      <RendererNode
        v-for="(child, index) in node.content"
        :key="index"
        :node="child"
      />
    </ol>
  </template>
  
  <script setup lang="ts">
  import type { TipTapNode } from '~/types/article'
  defineProps<{ node: TipTapNode }>()
  </script>