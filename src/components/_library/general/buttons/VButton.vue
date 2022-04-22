<template>
  <component
    :is="buttonComponent"
    :disabled="disabled || loading"
    class="block border"
    :class="[{ 'w-full': block }, buttonStyles, padding, borderRadius]"
  >
    <div class="flex items-center justify-center">
      <span v-if="loading">Loading...</span>
      <slot v-else />
    </div>
  </component>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  variant: {
    type: String,
    default: "default",
    // eslint-disable-next-line vue/valid-define-props
    validator: (value) => ["default", "outline", "transparent"].includes(value),
  },
  color: {
    type: String,
    default: "primary",
    // eslint-disable-next-line vue/valid-define-props
    validator: (value) =>
      [
        "primary",
        "secondary",
        "tertiary",
        "success",
        "warning",
        "error",
      ].includes(value),
  },
  type: { type: String, default: "button" },
  to: { type: [String, Object], default: undefined },
  block: Boolean,
  circle: Boolean,
  disabled: Boolean,
  icon: Boolean,
  loading: Boolean,
  dense: Boolean,
})

const buttonComponent = computed(() => (!!props.to ? "RouterLink" : "button"))
const buttonStyles = computed(() => variantStyles.value[props.variant])
const padding = computed(() => {
  if (props.icon) return "p-px"
  else return props.dense ? "px-2 py-1" : "px-3 py-1.5"
})

const borderRadius = computed(() => (props.circle ? "rounded-full" : "rounded"))

// Update variant styles to match app
// Remember to write out everything so PurgeCSS doesn't remove them
const variantStyles = computed(() => {
  switch (props.color) {
    default:
      return {
        default: `bg-primary-500 border-primary-500 text-white hover:bg-primary-400 hover:border-primary-400 active:bg-primary-600 active:border-primary-600`,
        outline: `bg-transparent border-primary-500 text-primary-500 hover:bg-primary-500/10 active:bg-primary-500 active:text-white`,
        transparent: `bg-transparent border-transparent hover:bg-gray-500/10 hover:text-primary-500 active:bg-primary-500/10 active:text-primary-500`,
      }
    case "secondary":
      return {
        default: `bg-secondary-500 border-secondary-500 text-white hover:bg-secondary-400 hover:border-secondary-400 active:bg-secondary-600 active:border-secondary-600`,
        outline: `bg-transparent border-secondary-500 text-secondary-500 hover:bg-secondary-500/10 active:bg-secondary-500 active:text-white`,
        transparent: `bg-transparent border-transparent hover:bg-gray-500/10 hover:text-secondary-500 active:bg-secondary-500/10 active:text-secondary-500`,
      }
    case "tertiary":
      return {
        default: `bg-tertiary-500 border-tertiary-500 text-white hover:bg-tertiary-400 hover:border-tertiary-400 active:bg-tertiary-600 active:border-tertiary-600`,
        outline: `bg-transparent border-tertiary-500 text-tertiary-500 hover:bg-tertiary-500/10 active:bg-tertiary-500 active:text-white`,
        transparent: `bg-transparent border-transparent hover:bg-gray-500/10 hover:text-tertiary-500 active:bg-tertiary-500/10 active:text-tertiary-500`,
      }
    case "success":
      return {
        default: `bg-success-500 border-success-500 text-white hover:bg-success-400 hover:border-success-400 active:bg-success-600 active:border-success-600`,
        outline: `bg-transparent border-success-500 text-success-500 hover:bg-success-500/10 active:bg-success-500 active:text-white`,
        transparent: `bg-transparent border-transparent hover:bg-gray-500/10 hover:text-success-500 active:bg-success-500/10 active:text-success-500`,
      }
    case "warning":
      return {
        default: `bg-warning-500 border-warning-500 text-white hover:bg-warning-400 hover:border-warning-400 active:bg-warning-600 active:border-warning-600`,
        outline: `bg-transparent border-warning-500 text-warning-500 hover:bg-warning-500/10 active:bg-warning-500 active:text-white`,
        transparent: `bg-transparent border-transparent hover:bg-gray-500/10 hover:text-warning-500 active:bg-warning-500/10 active:text-warning-500`,
      }
    case "error":
      return {
        default: `bg-error-500 border-error-500 text-white hover:bg-error-400 hover:border-error-400 active:bg-error-600 active:border-error-600`,
        outline: `bg-transparent border-error-500 text-error-500 hover:bg-error-500/10 active:bg-error-500 active:text-white`,
        transparent: `bg-transparent border-transparent hover:bg-gray-500/10 hover:text-error-500 active:bg-error-500/10 active:text-error-500`,
      }
  }
})
</script>
