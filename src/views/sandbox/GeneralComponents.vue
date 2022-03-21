<template>
  <div>
    <h2 class="text-xl font-semibold">General Components</h2>
    <VDivider class="mb-3" />

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
    <SandboxRow title="VMenu">
      <VMenu :items="menuItems">
        <template #activator>
          <VButton>Menu</VButton>
        </template>
      </VMenu>
    </SandboxRow>
    <SandboxRow title="VToast">
      <VToast :notification="{ message: 'Test Toast' }" />
    </SandboxRow>
  </div>
</template>

<script setup>
import VDivider from "@/components/_library/general/VDivider.vue"
import SandboxRow from "@/views/sandbox/SandboxRow.vue"
import VButton from "@/components/_library/general/buttons/VButton.vue"
import VButtonGroup from "@/components/_library/general/buttons/VButtonGroup.vue"
import VCard from "@/components/_library/general/VCard.vue"
import VMenu from "@/components/_library/general/VMenu.vue"
import VToast from "@/components/_library/general/VToast.vue"

const menuItems = [
  { text: "Link Item", name: "link", to: "https://www.krit.com/" },
  { text: "Span Item", name: "span" },
  { text: "Disabled Item", name: "disabled", disabled: true },
]
</script>
