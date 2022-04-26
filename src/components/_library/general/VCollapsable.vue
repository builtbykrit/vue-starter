<template>
  <Disclosure v-slot="{ open }" as="div" class="w-full block">
    <DisclosureButton
      class="flex justify-between w-full rounded-sm bg-primary-500 px-2 py-1"
    >
      <div class="text-white">
        <slot name="button">{{ button }}</slot>
      </div>
      <ChevronDownIcon
        :class="open ? 'transform rotate-180' : ''"
        class="w-6 h-6 text-white"
      />
    </DisclosureButton>
    <DisclosurePanel class="px-4 py-2 text-sm text-gray-500">
      <slot>{{ content }}</slot>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue"
import { ChevronDownIcon } from "@heroicons/vue/solid"

const props = defineProps({
  button: { type: String, default: undefined },
  content: { type: String, default: undefined },
})
</script>
