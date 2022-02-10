<template>
  <div>
    <!-- Label -->
    <label :for="inputId">
      <slot name="label">
        {{ label }}
      </slot>
    </label>

    <!-- Input -->
    <slot />

    <!-- Error Messages -->
    <VErrorMessages :input-id="inputId" :messages="messages" />
  </div>
</template>

<script setup>
import VErrorMessages from "@/components/_library/formControl/VErrorMessages"

defineProps({
  inputId: { type: String, required: true },
  label: { type: String, default: undefined },
  messages: { type: Array, default: undefined },
})
</script>
