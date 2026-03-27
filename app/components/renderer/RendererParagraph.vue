<template>
    <p>
      <RendererNode
        v-for="(child, index) in node.content"
        :key="index"
        :node="child"
      />
    </p>
  </template>
  
  <script setup lang="ts">
  import type { TipTapNode } from '~/types/article'
  
  defineProps<{ node: TipTapNode }>()
  </script>