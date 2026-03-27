<template>
    <figure class="my-6">
      <figcaption
        v-if="caption || number"
        class="mb-2 text-sm text-gray-500 dark:text-gray-400"
      >
        <span v-if="number" class="font-medium">Табл. {{ number }}.</span>
        <span v-if="caption"> {{ caption }}</span>
      </figcaption>
  
      <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table class="w-full text-sm text-left">
          <RendererNode
            v-for="(child, index) in node.content"
            :key="index"
            :node="child"
          />
        </table>
      </div>
    </figure>
  </template>
  
  <script setup lang="ts">
  import type { TipTapNode } from '~/types/article'
  
  const props = defineProps<{ node: TipTapNode }>()
  
  const caption = computed(() => props.node.attrs?.caption as string | undefined)
  const number = computed(() => props.node.attrs?.number as string | undefined)
  </script>