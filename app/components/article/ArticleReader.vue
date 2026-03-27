<template>
  <div class="article-reader">
    <RendererArticleRenderer :content="content" />
  </div>
</template>

<script setup lang="ts">
import type { TipTapJSON } from '~/types/article'

defineProps<{ content: TipTapJSON }>()
</script>
  
<style>
.article-reader {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--color-gray-700);
}

.dark .article-reader {
  color: var(--color-gray-300);
}

/* Заголовки */
.article-reader h1 {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.25;
  margin: 2rem 0 1rem;
  color: var(--color-gray-900);
}

.article-reader h2 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.33;
  margin: 1.75rem 0 0.75rem;
  color: var(--color-gray-900);
}

.article-reader h3 {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 1.5rem 0 0.5rem;
  color: var(--color-gray-900);
}

.dark .article-reader h1,
.dark .article-reader h2,
.dark .article-reader h3 {
  color: var(--color-gray-100);
}

/* Параграфы */
.article-reader p {
  margin: 0.75rem 0;
}

/* Ссылки */
.article-reader a {
  color: var(--color-primary-600);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.article-reader a:hover {
  color: var(--color-primary-700);
}

/* Inline код */
.article-reader code {
  font-family: var(--font-mono, monospace);
  font-size: 0.875em;
  background: var(--color-gray-100);
  padding: 0.15em 0.4em;
  border-radius: 0.25rem;
}

.dark .article-reader code {
  background: var(--color-gray-800);
}

/* Горизонтальная линия */
.article-reader hr {
  margin: 2rem 0;
}

/* Первый и последний элемент без лишних отступов */
.article-reader>*:first-child {
  margin-top: 0;
}

.article-reader>*:last-child {
  margin-bottom: 0;
}</style>

