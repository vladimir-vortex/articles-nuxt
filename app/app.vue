<template>
  <div>
    <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20">
      <UContainer class="h-14 flex items-center justify-between">
        <NuxtLink to="/" class="font-bold text-gray-900 dark:text-white text-lg tracking-tight">
          Articles
        </NuxtLink>
        <nav class="flex items-center gap-4">
          <NuxtLink
            to="/"
            class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Все статьи
          </NuxtLink>
        </nav>
      </UContainer>
    </header>

    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import 'highlight.js/styles/github.css'
</script>
