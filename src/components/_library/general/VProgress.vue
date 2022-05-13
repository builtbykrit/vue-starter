<template>
  <div class="relative w-full h-2 rounded bg-gray-200 overflow-hidden">
    <div
      class="absolute left-0 h-2 bg-primary-500"
      :class="[{ 'animate-indeterminate': indeterminate }]"
      :style="{ width: `${percentage}%` }"
    />
  </div>
</template>

<script setup>
defineProps({
  indeterminate: Boolean,
  percentage: {
    type: [Number, String],
    default: 50,
  },
})
</script>
