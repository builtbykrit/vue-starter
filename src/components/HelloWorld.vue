<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h1 class="text-green-600 font-bold">{{ msg }}</h1>
</template>
