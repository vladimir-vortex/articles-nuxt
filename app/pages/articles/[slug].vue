<template>
    <UContainer class="py-10">
      <!-- Загрузка -->
      <div v-if="pending" class="animate-pulse space-y-4">
        <div class="h-8 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
        <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
        <div class="h-64 bg-gray-100 dark:bg-gray-800 rounded" />
      </div>
  
      <!-- Ошибка -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-gray-500 dark:text-gray-400">Статья не найдена</p>
        <UButton class="mt-4" variant="outline" to="/">← Вернуться</UButton>
      </div>
  
      <div v-else-if="article" class="flex gap-12">
        <!-- Основной контент -->
        <main class="flex-1 min-w-0">
          <!-- Теги -->
          <div v-if="article.tags?.length" class="flex flex-wrap gap-1 mb-4">
            <UBadge
              v-for="tag in article.tags"
              :key="tag"
              :label="tag"
              color="primary"
              variant="subtle"
            />
          </div>
  
          <!-- Заголовок -->
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            {{ article.title }}
          </h1>
  
          <!-- Описание -->
          <p v-if="article.description" class="text-lg text-gray-500 dark:text-gray-400 mb-6">
            {{ article.description }}
          </p>
  
          <!-- Мета -->
          <ArticleMeta
            :authors="article.authors"
            :date="article.publishedAt"
            :reading-time="article.readingTime"
            class="pb-6 mb-6 border-b border-gray-200 dark:border-gray-700"
          />
  
          <!-- Обложка -->
          <img
            v-if="article.coverImage"
            :src="article.coverImage"
            :alt="article.title"
            class="w-full aspect-video object-cover rounded-xl mb-8"
          />
  
          <!-- Содержимое статьи -->
          <ArticleReader :content="article.content" />
  
          <!-- Авторы -->
          <div v-if="article.authors.length" class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Об авторах
            </h3>
            <div
              v-for="author in article.authors"
              :key="author.id"
              class="flex items-start gap-4"
            >
              <img
                v-if="author.avatar"
                :src="author.avatar"
                :alt="author.name"
                class="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div
                v-else
                class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 font-semibold flex-shrink-0"
              >
                {{ author.name[0] }}
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white">{{ author.name }}</p>
                <p v-if="author.bio" class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {{ author.bio }}
                </p>
              </div>
            </div>
          </div>
        </main>
  
        <!-- Сайдбар — оглавление -->
        <aside v-if="toc.length" class="hidden lg:block w-56 flex-shrink-0">
          <div class="sticky top-20">
            <ArticleToc :items="toc" />
          </div>
        </aside>
      </div>
    </UContainer>
  </template>
  
  <script setup lang="ts">
  import { useArticles } from '~/composables/useArticles'
  import { useToc } from '~/composables/useToc'
  
  const route = useRoute()
  const { getArticle } = useArticles()
  const { extractToc } = useToc()
  
  const { data: article, pending, error } = useAsyncData(
    `article-${route.params.slug}`,
    () => getArticle(route.params.slug as string)
  )
  
  const toc = computed(() =>
    article.value ? extractToc(article.value.content) : []
  )
  
  useHead(() => ({
    title: article.value?.title ?? 'Статья',
    meta: [
      { name: 'description', content: article.value?.description },
      { property: 'og:title', content: article.value?.title },
      { property: 'og:description', content: article.value?.description },
      { property: 'og:image', content: article.value?.coverImage },
    ],
  }))
  </script>