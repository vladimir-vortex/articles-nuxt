<template>
  
  <a :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="my-6 flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
  >
    <!-- Иконка -->
    <div class="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center flex-shrink-0">
      <span class="text-xl">{{ icon }}</span>
    </div>

    <!-- Инфо -->
    <div class="flex-1 min-w-0">
      <p class="font-medium text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {{ name }}
      </p>
      <p v-if="formattedSize" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
        {{ formattedSize }}
      </p>
    </div>

    <!-- Стрелка скачивания -->
    <span class="text-gray-400 dark:text-gray-500 group-hover:text-primary-500 transition-colors flex-shrink-0">
      ↓
    </span>
  </a>
</template>

<script setup lang="ts">
import type { TipTapNode } from '~/types/article'

const props = defineProps<{ node: TipTapNode }>()

const url = computed(() => props.node.attrs?.url as string ?? '')
const name = computed(() => props.node.attrs?.name as string ?? 'Файл')
const size = computed(() => props.node.attrs?.size as number | undefined)

// Иконка по расширению файла
const icon = computed(() => {
  const ext = url.value.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'pdf':  return '📄'
    case 'doc':
    case 'docx': return '📝'
    case 'xls':
    case 'xlsx': return '📊'
    case 'zip':
    case 'rar':
    case '7z':   return '🗜️'
    case 'mp4':
    case 'avi':
    case 'mov':  return '🎬'
    case 'mp3':
    case 'wav':  return '🎵'
    default:     return '📎'
  }
})

// Форматирование размера файла
const formattedSize = computed(() => {
  if (!size.value) return undefined
  if (size.value < 1024) return `${size.value} Б`
  if (size.value < 1024 * 1024) return `${(size.value / 1024).toFixed(1)} КБ`
  return `${(size.value / (1024 * 1024)).toFixed(1)} МБ`
})
</script>