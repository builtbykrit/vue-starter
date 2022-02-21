<template>
  <div class="flex flex-col w-full">
    <!-- Label -->
    <VLabel :input-id="inputId">
      <slot name="label">
        {{ label }}
      </slot>
    </VLabel>

    <!-- Input -->
    <slot />

    <!-- Error Messages -->
    <VErrorMessages :input-id="inputId" :messages="messages" />
  </div>
</template>

<script setup>
import VErrorMessages from "@/components/_library/formControls/VErrorMessages.vue"
import VLabel from "@/components/_library/formControls/VLabel.vue"

defineProps({
  inputId: { type: String, required: true },
  label: { type: String, default: undefined },
  messages: { type: Array, default: undefined },
})
</script>
