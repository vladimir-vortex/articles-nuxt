<template>
    <figure class="my-6">
      <img
        :src="src"
        :alt="alt"
        class="w-full rounded-lg"
      />
      <figcaption
        v-if="caption || number"
        class="mt-2 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        <span v-if="number" class="font-medium">Рис. {{ number }}.</span>
        <span v-if="caption"> {{ caption }}</span>
      </figcaption>
    </figure>
  </template>
  
  <script setup lang="ts">
  import type { TipTapNode } from '~/types/article'
  
  const props = defineProps<{ node: TipTapNode }>()
  
  const src = computed(() => props.node.attrs?.src as string ?? '')
  const alt = computed(() => props.node.attrs?.alt as string ?? '')
  const caption = computed(() => props.node.attrs?.caption as string | undefined)
  const number = computed(() => props.node.attrs?.number as string | undefined)
  </script>