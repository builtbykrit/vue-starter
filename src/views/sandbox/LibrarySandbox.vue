<template>
  <div class="max-w-6xl mx-auto my-6">
    <SandboxRow title="VButton">
      <VButton variant="primary">Primary</VButton>
      <VButton variant="secondary">Secondary</VButton>
      <VButton variant="transparent">Transparent</VButton>
      <VButton variant="link">Link</VButton>
    </SandboxRow>

    <SandboxRow title="VButtonGroup">
      <VButtonGroup>
        <VButton variant="primary">Primary</VButton>
        <VButton variant="secondary">Secondary</VButton>
      </VButtonGroup>
    </SandboxRow>

    <SandboxRow title="VCard">
      <VCard>Example Card</VCard>
    </SandboxRow>
  </div>
</template>

<script setup>
import SandboxRow from "@/views/sandbox/SandboxRow.vue"
import VButton from "@/components/_library/buttons/VButton.vue"
import VButtonGroup from "@/components/_library/buttons/VButtonGroup.vue"
import VCard from "@/components/_library/VCard.vue"
</script>
