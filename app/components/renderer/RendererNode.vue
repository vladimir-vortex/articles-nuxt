<template>
  <RendererText v-if="node.type === 'text'" :node="node" />

  <RendererParagraph v-else-if="node.type === 'paragraph'" :node="node" />
  <RendererHeading v-else-if="node.type === 'heading'" :node="node" />
  <RendererBlockquote v-else-if="node.type === 'blockquote'" :node="node" />
  <RendererCodeBlock v-else-if="node.type === 'codeBlock'" :node="node" />
  <RendererBulletList v-else-if="node.type === 'bulletList'" :node="node" />
  <RendererOrderedList v-else-if="node.type === 'orderedList'" :node="node" />
  <RendererListItem v-else-if="node.type === 'listItem'" :node="node" />
  <RendererHorizontalRule v-else-if="node.type === 'horizontalRule'" />
  <RendererImage v-else-if="node.type === 'image'" :node="node" />
  <RendererGallery v-else-if="node.type === 'gallery'" :node="node" />
  <RendererTable v-else-if="node.type === 'table'" :node="node" />
  <RendererTableRow v-else-if="node.type === 'tableRow'" :node="node" />
  <RendererTableCell v-else-if="node.type === 'tableCell'" :node="node" />
  <RendererTableHeader v-else-if="node.type === 'tableHeader'" :node="node" />
  <RendererVideo v-else-if="node.type === 'video'" :node="node" />
  <RendererCallout v-else-if="node.type === 'callout'" :node="node" />
  <RendererFile v-else-if="node.type === 'file'" :node="node" />
  <RendererBibliography v-else-if="node.type === 'bibliography'" :node="node" />

  <template v-else />
</template>

<script setup lang="ts">
import type { TipTapNode } from '~/types/article'

defineProps<{ node: TipTapNode }>()
</script>