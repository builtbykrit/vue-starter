<template>
  <label :for="inputId" class="text-sm font-semibold">
    <slot />
  </label>
</template>

<script setup>
defineProps({
  inputId: { type: String, required: true },
})
</script>
