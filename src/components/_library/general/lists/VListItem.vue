<template>
  <component
    :is="element"
    :to="to"
    :exact="exact"
    class="block hover:bg-primary-500/25 hover:text-primary-900 focus:bg-primary-500/25 focus:ring-0"
    exact-active-class="bg-primary-200 text-primary-900 font-semibold hover:bg-primary-200 focus:bg-primary-300"
    :class="paddingClass"
    role="listitem"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed, inject } from "vue"

const props = defineProps({
  to: { type: [String, Object], default: undefined },
  dense: Boolean,
  exact: Boolean,
})
const listIsDense = inject("listIsDense", false)

const element = computed(() => (!!props.to ? "RouterLink" : "li"))
const paddingClass = computed(() =>
  listIsDense.value || props.dense ? "px-2 py-1" : "px-3 py-2"
)
</script>
