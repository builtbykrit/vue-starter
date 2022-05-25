<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <TransitionChild as="template" v-bind="transition">
      <div
        class="min-h-full w-64 shadow-md flex flex-col overflow-hidden"
        v-bind="$attrs"
      >
        <slot name="header" />
        <div class="flex-grow">
          <VList>
            <VListItem :to="{ name: 'HOME' }">Sandbox</VListItem>
            <VListItem :to="{ name: '404Error' }">404 Error Page</VListItem>
            <VListItem :to="{ name: '500Error' }">500 Error Page</VListItem>
          </VList>
        </div>
        <slot name="footer" />
      </div>
    </TransitionChild>
  </TransitionRoot>
</template>

<script setup>
import { TransitionChild, TransitionRoot } from "@headlessui/vue"
import { computed } from "vue"

const props = defineProps({
  modelValue: { type: Boolean, default: true },
  static: { type: Boolean, default: false },
})

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
})
const transition = computed(
  () =>
    !props.static && {
      enter: "transition-transform ease-in-out duration-500",
      enterFrom: "-translate-x-full",
      enterTo: "translate-x-0",
      leave: "transition-transform ease-in-out duration-500",
      leaveFrom: "translate-x-0",
      leaveTo: "-translate-x-full",
    }
)
</script>
