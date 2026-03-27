<template>
    <NuxtLink :to="`/articles/${article.slug}`" class="group block h-full">
      <UCard class="h-full flex flex-col transition-shadow hover:shadow-md">
  
        <!-- Обложка -->
        <template v-if="article.coverImage" #header>
          <div class="aspect-video overflow-hidden rounded-t-lg -mx-4 -mt-4">
            <img
              :src="article.coverImage"
              :alt="article.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </template>
  
        <!-- Контент -->
        <div class="flex flex-col flex-1 gap-3">
          <!-- Теги -->
          <div v-if="article.tags?.length" class="flex flex-wrap gap-1">
            <UBadge
              v-for="tag in article.tags.slice(0, 3)"
              :key="tag"
              :label="tag"
              color="primary"
              variant="subtle"
              size="sm"
            />
          </div>
  
          <!-- Заголовок -->
          <h2 class="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {{ article.title }}
          </h2>
  
          <!-- Описание -->
          <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 flex-1">
            {{ article.description }}
          </p>
  
          <!-- Мета -->
          <ArticleMeta
            :authors="article.authors"
            :date="article.publishedAt"
            :reading-time="article.readingTime"
          />
        </div>
      </UCard>
    </NuxtLink>
  </template>
  
  <script setup lang="ts">
  import type { ArticleListItem } from '~/types/article'
  
  defineProps<{ article: ArticleListItem }>()
  </script>