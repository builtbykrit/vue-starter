<template>
  <div>
    <h3 class="v-heading-lg">Base Components</h3>
    <PaintUnderline class="text-primary-500 mb-6" />

    <SandboxRow title="VButton">
      <div class="flex flex-col gap-2">
        <div class="flex items-center flex-wrap lg:flex-nowrap gap-2">
          <VButton
            v-for="color in colorOptions"
            :key="`default-${color}`"
            variant="default"
            :color="color"
            >Default
          </VButton>
        </div>
        <div class="flex items-center flex-wrap lg:flex-nowrap gap-2">
          <VButton
            v-for="color in colorOptions"
            :key="`outline-${color}`"
            variant="outline"
            :color="color"
            >Outline
          </VButton>
        </div>
        <div class="flex items-center flex-wrap lg:flex-nowrap gap-2">
          <VButton
            v-for="color in colorOptions"
            :key="`transparent-${color}`"
            variant="transparent"
            :color="color"
          >
            Transparent
          </VButton>
        </div>
      </div>
    </SandboxRow>

    <SandboxRow title="VButtonGroup">
      <VButtonGroup>
        <VButton>Default</VButton>
        <VButton variant="outline">Outline</VButton>
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
    <SandboxRow title="VTooltip">
      <VTooltip>
        <template #activator>Text with Tooltip!</template>
        <span>Test Tooltip</span>
      </VTooltip>
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
      >
        <template #actions>
          <VButton>Default</VButton>
          <VButton variant="outline">Outline</VButton>
        </template>
      </VModal>
    </SandboxRow>
    <SandboxRow title="VProgress">
      <VProgress indeterminate />
      <VProgress percentage="25" />
      <VProgress percentage="75" />
    </SandboxRow>
    <SandboxRow title="VTabs">
      <VTabs :tabs="['Tab 1', 'Tab 2', 'Tab 3']" />
    </SandboxRow>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import PaintUnderline from "@/assets/paint-underline.svg"
import SandboxRow from "@/views/sandbox/SandboxRow.vue"

const colorOptions = [
  "primary",
  "secondary",
  "tertiary",
  "success",
  "warning",
  "error",
]
const menuItems = [
  { text: "Link Item", name: "link", to: "https://www.krit.com/" },
  { text: "Span Item", name: "span" },
  { text: "Disabled Item", name: "disabled", disabled: true },
]

const state = reactive({
  showModal: false,
})
</script>
