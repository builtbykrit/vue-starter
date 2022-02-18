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
      <VCard title="Card Title">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
        tristique malesuada turpis tempor venenatis. Sed eget scelerisque purus,
        non venenatis velit. Praesent molestie condimentum maximus. Nunc
        eleifend commodo gravida. Praesent tempus molestie ultrices. Fusce vitae
        ante vehicula libero efficitur dapibus vel vitae elit. Pellentesque
        ultricies pellentesque lacus fringilla congue. Sed commodo semper neque,
        vel vestibulum urna interdum at. Sed non tellus in magna iaculis
        fermentum vel gravida mi.
        <template #actions>
          <VButton>Action Button</VButton>
        </template>
      </VCard>
    </SandboxRow>

    <FormControlsSandbox class="mt-8" />
  </div>
</template>

<script setup>
import SandboxRow from "@/views/sandbox/SandboxRow.vue"
import VButton from "@/components/_library/buttons/VButton.vue"
import VButtonGroup from "@/components/_library/buttons/VButtonGroup.vue"
import VCard from "@/components/_library/VCard.vue"
import FormControlsSandbox from "@/views/sandbox/FormControlsSandbox.vue"
</script>
