<template>
  <div class="grid grid-cols-2 md:grid-cols-7 my-2">
    <div v-if="title" class="text-lg font-semibold">{{ title }}</div>
    <div class="md:col-span-6 flex items-center gap-2">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: undefined },
})
</script>
