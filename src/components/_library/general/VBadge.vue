<template>
  <div :class="[variantStyles, 'rounded-sm v-overline-xs py-px px-1']">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  color: { type: String, default: "primary" },
})

// Update variant styles to match app
// Remember to write out everything so PurgeCSS doesn't remove them
const variantStyles = computed(() => {
  switch (props.color) {
    default:
      return "bg-primary-500 text-white"
    case "secondary":
      return "bg-secondary-500 text-white"
    case "tertiary":
      return "bg-tertiary-500 text-white"
    case "success":
      return "bg-success-500 text-white"
    case "warning":
      return "bg-warning-500 text-white"
    case "error":
      return "bg-error-500 text-white"
  }
})
</script>
