<template>
    <div class="article-renderer">
      <RendererNode
        v-for="(node, index) in content.content"
        :key="index"
        :node="node"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import type { TipTapJSON } from '~/types/article'
  
  defineProps<{ content: TipTapJSON }>()
  </script>