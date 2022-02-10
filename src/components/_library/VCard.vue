<template>
  <div class="flex shadow" :class="{ 'flex-col': orientation === 'vertical' }">
    <div v-if="$slots['title'] || title" class="px-2 pb-1 pt-2">
      <slot name="title">
        <div class="text-lg font-semibold">{{ title }}</div>
      </slot>
    </div>
    <div v-if="$slots['default']" class="px-2 py-1">
      <slot></slot>
    </div>
    <div v-if="$slots['actions']" class="p-2">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  orientation: { type: String, default: "vertical" },
  title: { type: String, default: undefined },
})
</script>
