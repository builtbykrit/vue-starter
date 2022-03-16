<template>
  <component
    :is="buttonComponent"
    :disabled="disabled || loading"
    class="block"
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
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "link", "transparent"].includes(value),
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
const buttonStyles = computed(() => variantStyles[props.variant])
const padding = computed(() =>
  props.icon || props.variant === "link"
    ? "p-px"
    : props.dense
    ? "px-2 py-1"
    : "px-4 py-2"
)
const borderRadius = computed(() => (props.circle ? "rounded-full" : "rounded"))

// Update variant styles to match app
const variantStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-green-600 text-white hover:bg-green-700",
  link: "text-blue-600 font-semibold underline hover:bg-blue-100",
  transparent:
    "bg-transparent font-semibold hover:bg-purple-400 hover:text-white",
}
</script>
