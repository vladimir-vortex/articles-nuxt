<template>
    <div class="my-6 rounded-lg border p-4 flex gap-3" :class="styles.wrapper">
      <span class="text-xl flex-shrink-0 mt-0.5">{{ styles.icon }}</span>
      <div class="flex-1 min-w-0">
        <p v-if="styles.label" class="text-xs font-semibold uppercase tracking-wide mb-1" :class="styles.label">
          {{ styles.labelText }}
        </p>
        <div class="text-sm" :class="styles.text">
          <RendererNode
            v-for="(child, index) in node.content"
            :key="index"
            :node="child"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { TipTapNode } from '~/types/article'
  
  const props = defineProps<{ node: TipTapNode }>()
  
  const type = computed(() => props.node.attrs?.type as string ?? 'info')
  
  const styles = computed(() => {
    switch (type.value) {
      case 'warning':
        return {
          wrapper: 'bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800',
          icon: '⚠️',
          label: 'text-amber-700 dark:text-amber-400',
          labelText: 'Внимание',
          text: 'text-amber-900 dark:text-amber-200',
        }
      case 'danger':
        return {
          wrapper: 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800',
          icon: '🚫',
          label: 'text-red-700 dark:text-red-400',
          labelText: 'Важно',
          text: 'text-red-900 dark:text-red-200',
        }
      case 'note':
        return {
          wrapper: 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700',
          icon: '📝',
          label: 'text-gray-600 dark:text-gray-400',
          labelText: 'Примечание',
          text: 'text-gray-800 dark:text-gray-200',
        }
      case 'info':
      default:
        return {
          wrapper: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
          icon: 'ℹ️',
          label: 'text-blue-700 dark:text-blue-400',
          labelText: 'Информация',
          text: 'text-blue-900 dark:text-blue-200',
        }
    }
  })
  </script>