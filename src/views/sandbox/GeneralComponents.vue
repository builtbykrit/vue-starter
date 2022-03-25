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
    <SandboxRow title="VCollapsable">
      <VCollapsable
        button="Example Collapsable"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia
        eget nunc lacinia volutpat. Fusce laoreet neque quis varius venenatis.
        Nunc ultricies, risus nec auctor interdum, quam urna viverra justo, id
        posuere leo urna vel orci. Aliquam vel ultrices lacus, a fringilla
        turpis. Duis nisi lacus, varius sed tortor ac, imperdiet dapibus erat.
        Donec felis arcu, semper nec felis sed, tincidunt accumsan sem. Quisque
        metus arcu, congue in est at, rhoncus facilisis ante. Nunc lorem metus,
        elementum vitae varius at, lacinia tincidunt arcu."
      />
      <VCollapsable>
        <template #button> Example Collapsable</template>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia
        eget nunc lacinia volutpat. Fusce laoreet neque quis varius venenatis.
        Nunc ultricies, risus nec auctor interdum, quam urna viverra justo, id
        posuere leo urna vel orci. Aliquam vel ultrices lacus, a fringilla
        turpis. Duis nisi lacus, varius sed tortor ac, imperdiet dapibus erat.
        Donec felis arcu, semper nec felis sed, tincidunt accumsan sem. Quisque
        metus arcu, congue in est at, rhoncus facilisis ante. Nunc lorem metus,
        elementum vitae varius at, lacinia tincidunt arcu."
      </VCollapsable>
    </SandboxRow>
    <SandboxRow title="VToast">
      <VToast :notification="{ message: 'Example Notification' }" />
    </SandboxRow>
    <SandboxRow title="VMenu">
      <VMenu :items="menuItems">
        <template #activator>
          <VButton>Menu</VButton>
        </template>
      </VMenu>
    </SandboxRow>
    <SandboxRow title="VModal">
      <VButton @click="state.showModal = true">Open Modal</VButton>
      <VModal
        v-model="state.showModal"
        title="Example Modal"
        subtitle="This is just a test."
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia
        eget nunc lacinia volutpat. Fusce laoreet neque quis varius venenatis.
        Nunc ultricies, risus nec auctor interdum, quam urna viverra justo, id
        posuere leo urna vel orci. Aliquam vel ultrices lacus, a fringilla
        turpis. Duis nisi lacus, varius sed tortor ac, imperdiet dapibus erat.
        Donec felis arcu, semper nec felis sed, tincidunt accumsan sem. Quisque
        metus arcu, congue in est at, rhoncus facilisis ante. Nunc lorem metus,
        elementum vitae varius at, lacinia tincidunt arcu."
      />
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
import VCollapsable from "@/components/_library/general/VCollapsable.vue"
import VModal from "@/components/_library/general/VModal.vue"
import { reactive } from "vue"

const menuItems = [
  { text: "Link Item", name: "link", to: "https://www.krit.com/" },
  { text: "Span Item", name: "span" },
  { text: "Disabled Item", name: "disabled", disabled: true },
]

const state = reactive({
  showModal: false,
})
</script>
