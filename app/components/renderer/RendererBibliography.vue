<template>
    <section class="my-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Список литературы
      </h3>
      <ol class="space-y-3">
        <li
          v-for="(item, index) in items"
          :key="item.attrs?.id as string ?? index"
          :id="item.attrs?.id as string"
          class="flex gap-3 text-sm text-gray-700 dark:text-gray-300"
        >
          <span class="flex-shrink-0 font-medium text-gray-400 dark:text-gray-500 w-6 text-right">
            {{ index + 1 }}.
          </span>
          <div>
            <span v-if="item.attrs?.authors" class="font-medium">
              {{ item.attrs.authors }}
            </span>
            <span v-if="item.attrs?.title">
              {{ item.attrs?.authors ? ' ' : '' }}{{ item.attrs.title }}.
            </span>
            <span v-if="item.attrs?.source" class="italic text-gray-500 dark:text-gray-400">
              {{ item.attrs.source }}
            </span>
            <span v-if="item.attrs?.year" class="text-gray-500 dark:text-gray-400">
              , {{ item.attrs.year }}.
            </span>
          </div>
        </li>
      </ol>
    </section>
  </template>
  
  <script setup lang="ts">
  import type { TipTapNode } from '~/types/article'
  
  const props = defineProps<{ node: TipTapNode }>()
  
  const items = computed(() =>
    props.node.content?.filter(n => n.type === 'bibliographyItem') ?? []
  )
  </script>