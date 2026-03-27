<template>
    <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
  
      <!-- Авторы -->
      <div v-if="authors.length" class="flex items-center gap-2">
        <div class="flex -space-x-2">
          <template v-for="author in authors" :key="author.id">
            <img
              v-if="author.avatar"
              :src="author.avatar"
              :alt="author.name"
              class="w-7 h-7 rounded-full ring-2 ring-white dark:ring-gray-900 object-cover"
            />
            <div
              v-else
              class="w-7 h-7 rounded-full ring-2 ring-white dark:ring-gray-900 bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-xs font-semibold text-primary-700 dark:text-primary-300"
            >
              {{ author.name[0] }}
            </div>
          </template>
        </div>
        <span>{{ authorNames }}</span>
      </div>
  
      <!-- Дата -->
      <time v-if="date" :datetime="date">{{ formattedDate }}</time>
  
      <!-- Время чтения -->
      <span v-if="readingTime">{{ readingTime }} мин чтения</span>
  
      <!-- Теги -->
      <div v-if="tags?.length" class="flex flex-wrap gap-1">
        <UBadge
          v-for="tag in tags"
          :key="tag"
          :label="tag"
          color="neutral"
          variant="subtle"
          size="sm"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Author } from '~/types/article'
  
  const props = defineProps<{
    authors: Author[]
    date?: string
    readingTime?: number
    tags?: string[]
  }>()
  
  const authorNames = computed(() =>
    props.authors.map(a => a.name).join(', ')
  )
  
  const formattedDate = computed(() => {
    if (!props.date) return ''
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(props.date))
  })
  </script>