<template>
  <nav v-if="items.length">
    <p class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
      Содержание
    </p>
    <ul class="space-y-1 border-l border-gray-200 dark:border-gray-700">
      <li v-for="item in items" :key="item.id">
        <a :href="`#${item.id}`" :class="[
          'block py-1 text-sm transition-colors leading-snug',
          item.level === 1 ? 'pl-3' : item.level === 2 ? 'pl-6' : 'pl-9',
          activeId === item.id
            ? 'text-primary-600 dark:text-primary-400 font-medium border-l-2 border-primary-500 -ml-px'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
        ]" @click.prevent="scrollTo(item.id)">
          {{ item.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { TocItem } from '~/composables/useToc'

const props = defineProps<{ items: TocItem[] }>()

const activeId = ref('')
let isScrollingFromClick = false
let scrollTimer: ReturnType<typeof setTimeout> | null = null

const scrollTo = (id: string) => {
  // Блокируем onScroll на время плавного скролла
  isScrollingFromClick = true
  if (scrollTimer) clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    isScrollingFromClick = false
  }, 1000) // примерно столько длится smooth scroll

  activeId.value = id
  history.replaceState(null, '', `#${id}`)
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(async () => {
  await nextTick()

  if (window.location.hash) {
    activeId.value = window.location.hash.slice(1)
  }

  const headingElements = props.items
    .map(item => document.getElementById(item.id))
    .filter((el): el is HTMLElement => el !== null)

  if (!headingElements.length) return

  const onScroll = () => {
    if (isScrollingFromClick) return // ← игнорируем скролл от клика

    const scrollY = window.scrollY + 120
    const passed = headingElements.filter(el => el.offsetTop <= scrollY)
    const closest = passed[passed.length - 1]
    if (closest) {
      activeId.value = closest.id
      history.replaceState(null, '', `#${closest.id}`)
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    if (scrollTimer) clearTimeout(scrollTimer)
  })
})
</script>