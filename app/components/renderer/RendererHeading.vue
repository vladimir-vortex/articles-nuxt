<template>
    <component :is="`h${level}`" :id="headingId" class="scroll-mt-20">
        <RendererNode v-for="(child, index) in node.content" :key="index" :node="child" />
    </component>
</template>
  
<script setup lang="ts">
import { useToc } from '~/composables/useToc';
import type { TipTapNode } from '~/types/article'

const props = defineProps<{ node: TipTapNode }>()

const level = computed(() => (props.node.attrs?.level as number) ?? 2)

const { slugify, extractText } = useToc()
const headingId = computed(() => {
  const text = extractText(props.node)
  const id = slugify(text)
  console.log('heading node:', JSON.stringify(props.node))
  console.log('extracted text:', text)
  console.log('id:', id)
  return id
})
</script>