<template>
    <UContainer class="py-10">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Статьи
        </h1>
      </div>
  
      <!-- Скелетон загрузки -->
      <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="i in 6"
          :key="i"
          class="rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse h-64"
        />
      </div>
  
      <!-- Ошибка -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-gray-500 dark:text-gray-400">Не удалось загрузить статьи</p>
        <UButton class="mt-4" variant="outline" @click="() => refresh()">
          Попробовать снова
        </UButton>
      </div>
  
      <!-- Пусто -->
      <div v-else-if="!articles?.data?.length" class="text-center py-20">
        <p class="text-gray-400 dark:text-gray-500 text-lg">Статей пока нет</p>
      </div>
  
      <!-- Список -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <ArticleCard
          v-for="article in articles.data"
          :key="article.id"
          :article="article"
        />
      </div>
  
      <!-- Пагинация -->
      <div v-if="articles && articles.lastPage > 1" class="flex justify-center gap-2 mt-10">
        <UButton
          v-for="p in articles.lastPage"
          :key="p"
          :variant="p === page ? 'solid' : 'outline'"
          :label="String(p)"
          size="sm"
          @click="page = p"
        />
      </div>
    </UContainer>
  </template>
  
  <script setup lang="ts">
  import { useArticles } from '~/composables/useArticles'
  
  useHead({ title: 'Статьи' })
  
  const { getArticles } = useArticles()
  const page = ref(1)
  
  const { data: articles, pending, error, refresh } = useAsyncData(
    () => `articles-page-${page.value}`,
    () => getArticles(page.value),
    { watch: [page] }
  )
  </script>