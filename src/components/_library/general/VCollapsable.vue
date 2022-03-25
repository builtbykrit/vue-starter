<template>
  <Disclosure v-slot="{ open }" as="div" class="w-full block">
    <DisclosureButton
      class="flex justify-between w-full rounded bg-primary-100 hover:bg-primary-200 px-4 py-2"
    >
      <div>
        <slot name="button">{{ button }}</slot>
      </div>
      <ChevronUpIcon
        :class="open ? 'transform rotate-180' : ''"
        class="w-6 h-6"
      />
    </DisclosureButton>
    <DisclosurePanel class="px-4 py-2 text-sm text-gray-500">
      <slot>{{ content }}</slot>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue"
import { ChevronUpIcon } from "@heroicons/vue/solid"

const props = defineProps({
  button: { type: String, default: undefined },
  content: { type: String, default: undefined },
})
</script>
