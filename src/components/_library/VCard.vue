<template>
  <div class="flex p-3 shadow">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  orientation: { type: String, default: "vertical" },
})
</script>
