<template>
  <div class="max-w-6xl mx-auto my-6 px-4">
    <div class="flex items-center flex-wrap gap-6">
      <KritLogo />
      <div>
        <h1 class="v-heading-lg">Style Sandbox</h1>
        <PaintUnderline class="text-primary-500" />
      </div>
    </div>

    <div class="grid gap-12 mt-12">
      <ThemeSection />
      <TypographySection />
      <GeneralComponents />
      <TableComponents />
      <FormControlComponents />
      <PickerComponents />
    </div>
  </div>
</template>

<script setup>
import KritLogo from "@/assets/krit-logo.svg"
import PaintUnderline from "@/assets/paint-underline.svg"

import ThemeSection from "@/views/sandbox/ThemeSection.vue"
import TypographySection from "@/views/sandbox/TypographySection.vue"
import GeneralComponents from "@/views/sandbox/GeneralComponents.vue"
import TableComponents from "@/views/sandbox/TableComponents.vue"
import FormControlComponents from "@/views/sandbox/FormControlComponents.vue"
import PickerComponents from "@/views/sandbox/PickerComponents.vue"
</script>
