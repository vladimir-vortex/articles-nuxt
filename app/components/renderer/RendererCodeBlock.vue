<template>
    <div class="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <!-- Шапка с языком и кнопкой копирования -->
      <div class="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {{ language || 'plaintext' }}
        </span>
        <button
          class="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          @click="copy"
        >
          {{ copied ? 'Скопировано!' : 'Копировать' }}
        </button>
      </div>
  
      <!-- Код -->
      <pre class="overflow-x-auto p-4 bg-gray-50 dark:bg-gray-900 text-sm leading-relaxed"><code
        class="hljs"
        v-html="highlighted"
      /></pre>
    </div>
  </template>
  
  <script setup lang="ts">
  import hljs from 'highlight.js'
  import type { TipTapNode } from '~/types/article'
  
  const props = defineProps<{ node: TipTapNode }>()
  
  const language = computed(() => props.node.attrs?.language as string | undefined)
  
  // Извлекаем текст из дочерних text-узлов
  const code = computed(() =>
    props.node.content
      ?.filter(n => n.type === 'text')
      .map(n => n.text ?? '')
      .join('') ?? ''
  )
  
  const highlighted = computed(() => {
    if (language.value && hljs.getLanguage(language.value)) {
      return hljs.highlight(code.value, { language: language.value }).value
    }
    return hljs.highlightAuto(code.value).value
  })
  
  // Копирование
  const copied = ref(false)
  const copy = async () => {
    await navigator.clipboard.writeText(code.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
  </script>