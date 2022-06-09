<template>
  <Disclosure v-slot="{ open }" as="div" class="w-full block">
    <DisclosureButton
      class="flex items-center justify-between w-full rounded-sm bg-primary-500 px-2 py-1"
    >
      <div class="text-white">
        <slot name="button">{{ button }}</slot>
      </div>
      <VIcon
        name="ChevronDown"
        :class="{ 'rotate-180': open }"
        class="text-white transition-transform"
      />
    </DisclosureButton>
    <DisclosurePanel class="px-4 py-2 text-sm text-gray-500">
      <slot>{{ content }}</slot>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue"
import VIcon from "@/components/_library/general/VIcon.vue"

const props = defineProps({
  button: { type: String, default: undefined },
  content: { type: String, default: undefined },
})
</script>
