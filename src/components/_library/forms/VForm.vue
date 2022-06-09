<template>
  <form class="flex flex-col gap-2" @submit.prevent="$emit('submit')">
    <slot />
  </form>
</template>

<script setup>
import { computed, provide } from "vue"

const props = defineProps({
  disabled: Boolean,
  readonly: Boolean,
})
const emit = defineEmits(["submit"])

provide(
  "formIsDisabled",
  computed(() => props.disabled)
)
provide(
  "formIsReadonly",
  computed(() => props.readonly)
)
</script>
