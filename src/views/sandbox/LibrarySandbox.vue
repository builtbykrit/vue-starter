<template>
  <div class="max-w-6xl mx-auto my-6">
    <h1 class="text-4xl border-b-2 bordergray-400">Component Library</h1>

    <div class="grid gap-4 mt-6">
      <GeneralComponents />
      <FormControlComponents />
      <PickerComponents />
    </div>
  </div>
</template>

<script setup>
import GeneralComponents from "@/views/sandbox/GeneralComponents.vue"
import FormControlComponents from "@/views/sandbox/FormControlComponents.vue"
import PickerComponents from "@/views/sandbox/PickerComponents.vue"
</script>
