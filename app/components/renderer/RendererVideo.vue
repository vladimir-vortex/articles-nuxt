<template>
  <figure class="my-6">
    <!-- YouTube -->
    <div v-if="provider === 'youtube'" class="relative aspect-video rounded-lg overflow-hidden">
      <iframe :src="youtubeEmbedUrl" class="absolute inset-0 w-full h-full" frameborder="0" allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
    </div>

    <!-- Vimeo -->
    <div v-else-if="provider === 'vimeo'" class="relative aspect-video rounded-lg overflow-hidden">
      <iframe :src="vimeoEmbedUrl" class="absolute inset-0 w-full h-full" frameborder="0" allowfullscreen
        allow="autoplay; fullscreen; picture-in-picture" />
    </div>

    <!-- Свой файл mp4 -->
    <video v-else-if="provider === 'file'" :src="url" controls class="w-full rounded-lg" />

    <!-- Подпись -->
    <figcaption v-if="caption" class="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
      {{ caption }}
    </figcaption>
  </figure>
</template>
  
<script setup lang="ts">
import type { TipTapNode } from '~/types/article'

const props = defineProps<{ node: TipTapNode }>()

const provider = computed(() => props.node.attrs?.provider as string ?? 'youtube')
const url = computed(() => props.node.attrs?.url as string ?? '')
const caption = computed(() => props.node.attrs?.caption as string | undefined)

// https://www.youtube.com/watch?v=ID
// https://youtu.be/ID
const youtubeEmbedUrl = computed(() => {
  const raw = url.value
  let id = ''

  const watchMatch = raw.match(/[?&]v=([^&]+)/)
  const shortMatch = raw.match(/youtu\.be\/([^?]+)/)

  if (watchMatch) id = watchMatch[1] ?? ''
  else if (shortMatch) id = shortMatch[1] ?? ''

  return id ? `https://www.youtube.com/embed/${id}` : ''
})


// https://vimeo.com/ID
const vimeoEmbedUrl = computed(() => {
  const match = url.value.match(/vimeo\.com\/(\d+)/)
  const id = match?.[1] ?? ''
  return id ? `https://player.vimeo.com/video/${id}` : ''
})
</script>