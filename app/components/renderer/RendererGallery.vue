<template>
  <figure class="my-6">
    <!-- Сетка -->
    <div class="grid gap-2" :class="gridClass">
      <button
        v-for="(item, index) in items"
        :key="index"
        class="overflow-hidden rounded-lg aspect-square focus:outline-none focus:ring-2 focus:ring-primary-500"
        @click="open(index)"
      >
        <img
          :src="item.attrs?.src as string"
          :alt="item.attrs?.alt as string ?? ''"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </button>
    </div>

    <!-- Лайтбокс -->
    <Teleport to="body">
      <div
        v-if="activeIndex !== null"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        @click.self="close"
        @keydown.esc="close"
        @keydown.left="prev"
        @keydown.right="next"
      >
        <button
          class="absolute top-4 right-4 text-white/70 hover:text-white text-2xl transition-colors"
          @click="close"
        >
          ✕
        </button>

        <button
          v-if="items.length > 1"
          class="absolute left-4 text-white/70 hover:text-white text-3xl transition-colors"
          @click="prev"
        >
          ‹
        </button>

        <div class="max-w-5xl max-h-screen p-8 flex flex-col items-center gap-3">
          <img
            :src="activeItem?.attrs?.src as string"
            :alt="activeItem?.attrs?.alt as string ?? ''"
            class="max-h-[80vh] max-w-full rounded-lg object-contain"
          />
          <p v-if="activeItem?.attrs?.alt" class="text-white/60 text-sm">
            {{ activeItem.attrs?.alt }}
          </p>
          <p v-if="items.length > 1" class="text-white/40 text-xs">
            {{ (activeIndex ?? 0) + 1 }} / {{ items.length }}
          </p>
        </div>

        <button
          v-if="items.length > 1"
          class="absolute right-4 text-white/70 hover:text-white text-3xl transition-colors"
          @click="next"
        >
          ›
        </button>
      </div>
    </Teleport>
  </figure>
</template>

<script setup lang="ts">
import type { TipTapNode } from '~/types/article'

const props = defineProps<{ node: TipTapNode }>()

const items = computed(() =>
  props.node.content?.filter(n => n.type === 'galleryItem') ?? []
)

// Сетка адаптируется под количество изображений
const gridClass = computed(() => {
  const count = items.value.length
  if (count === 1) return 'grid-cols-1'
  if (count === 2) return 'grid-cols-2'
  if (count === 3) return 'grid-cols-3'
  return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
})

// Лайтбокс
const activeIndex = ref<number | null>(null)

const activeItem = computed(() =>
  activeIndex.value !== null ? items.value[activeIndex.value] : null
)

const open = (index: number) => {
  activeIndex.value = index
  document.body.style.overflow = 'hidden'
}

const close = () => {
  activeIndex.value = null
  document.body.style.overflow = ''
}

const prev = () => {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value - 1 + items.value.length) % items.value.length
}

const next = () => {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value + 1) % items.value.length
}

// Клавиши работают только когда лайтбокс открыт
onMounted(() => {
  window.addEventListener('keydown', handleKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
  document.body.style.overflow = ''
})

const handleKey = (e: KeyboardEvent) => {
  if (activeIndex.value === null) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}
</script>