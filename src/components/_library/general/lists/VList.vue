<template>
  <ul>
    <slot />
  </ul>
</template>

<script setup>
import { computed, provide } from "vue"

const props = defineProps({
  dense: Boolean,
})

provide(
  "listIsDense",
  computed(() => props.dense)
)
</script>
