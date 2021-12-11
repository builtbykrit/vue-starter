<script setup>
import chevronIcon from "@/assets/chevron.svg?component"

defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h1 class="text-green-600 font-bold">{{ msg }}</h1>
  <chevronIcon class="stroke-black" />
</template>
