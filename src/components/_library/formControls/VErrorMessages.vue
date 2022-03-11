<template>
  <ul v-if="messages.length > 0" :id="`${inputId}-errors`" class="mt-1">
    <li
      v-for="(message, index) in messages"
      :key="index"
      class="text-red-500 text-xs"
    >
      {{ message }}
    </li>
  </ul>
</template>

<script setup>
defineProps({
  inputId: { type: String, required: true },
  messages: { type: Array, default: () => [] },
})
</script>
