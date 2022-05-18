<template>
  <div class="min-h-full w-64 shadow-md" :class="{ fixed: fixed }"></div>
</template>

<script setup>
defineProps({
  fixed: { type: Boolean, default: false },
})
</script>
