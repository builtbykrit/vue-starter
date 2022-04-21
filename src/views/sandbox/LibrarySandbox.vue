<template>
  <div class="max-w-6xl mx-auto my-6">
    <h1 class="text-4xl">Component Library</h1>
    <div class="mt-6">
      <GeneralComponents />
      <FormControlComponents class="mt-8" />
      <PickerComponents class="mt-8" />
    </div>
  </div>
</template>

<script setup>
import GeneralComponents from "@/views/sandbox/GeneralComponents.vue"
import FormControlComponents from "@/views/sandbox/FormControlComponents.vue"
import PickerComponents from "@/views/sandbox/PickerComponents.vue"
</script>
