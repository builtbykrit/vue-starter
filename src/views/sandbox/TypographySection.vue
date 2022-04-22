<template>
  <div>
    <h3 class="v-heading-lg">Text Styles</h3>
    <PaintUnderline class="text-primary-500 mb-6" />

    <SandboxRow
      v-for="typoClass in typographyClasses"
      :key="typoClass"
      :title="`.${typoClass}`"
    >
      <div :class="typoClass">
        The quick brown fox jumped over the lazy dog.
      </div>
    </SandboxRow>
  </div>
</template>

<script setup>
import PaintUnderline from "@/assets/paint-underline.svg"
import SandboxRow from "@/views/sandbox/SandboxRow.vue"

const typographyClasses = [
  "v-heading-lg",
  "v-heading-md",
  "v-heading-sm",
  "v-paragraph",
  "v-paragraph-sm",
  "v-paragraph-xs",
  "v-link",
  "v-link-sm",
  "v-link-xs",
  "v-overline",
  "v-overline-sm",
  "v-overline-xs",
  "v-caption",
]
</script>
