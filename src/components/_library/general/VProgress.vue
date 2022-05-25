<template>
  <div
    class="relative w-full bg-gray-200 overflow-hidden"
    :class="[{ rounded: !flat }, dense ? 'h-1' : 'h-2']"
  >
    <div
      class="absolute left-0 bg-primary-500"
      :class="[
        { 'animate-indeterminate': indeterminate },
        dense ? 'h-1' : 'h-2',
      ]"
      :style="{ width: `${percentage}%` }"
    />
  </div>
</template>

<script setup>
defineProps({
  indeterminate: Boolean,
  flat: Boolean,
  dense: Boolean,
  percentage: {
    type: [Number, String],
    default: 50,
  },
})
</script>
