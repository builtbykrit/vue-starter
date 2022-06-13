<template>
  <TransitionRoot
    :key="`drawer-${position}`"
    appear
    :show="isOpen"
    as="template"
  >
    <Dialog as="div" @close="isOpen = false">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen w-screen">
          <TransitionChild
            as="template"
            enter="duration-500 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-500 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <TransitionChild as="template" v-bind="drawerTransition">
            <div
              class="absolute bg-white divide-y shadow-xl overflow-hidden text-left z-20"
              :class="[positionClass, sizeClass]"
            >
              <!-- Drawer Header -->
              <div
                v-if="!!$slots.header || !!heading || showClose"
                class="flex justify-between p-4"
              >
                <DialogTitle as="h3" class="v-heading-sm">
                  <slot name="header">{{ heading }}</slot>
                </DialogTitle>
                <button v-if="showClose" @click="isOpen = false">
                  <VIcon name="X" />
                </button>
              </div>

              <!-- Drawer Content -->
              <div class="flex-grow v-paragraph-xs text-gray-700 p-4">
                <slot />
              </div>

              <!-- Drawer Footer -->
              <div v-if="!!$slots.footer" class="p-4">
                <slot name="footer" />
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue"
import { computed } from "vue"
import VIcon from "@/components/_library/general/VIcon.vue"

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  position: { type: String, default: "left" },
  showClose: { type: Boolean, default: false },
  heading: { type: String, default: undefined },
})
const emit = defineEmits(["update:model-value"])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:model-value", val),
})

const positionClass = computed(() => {
  switch (props.position) {
    case "top":
      return "inset-x-0 top-0"
    case "bottom":
      return "inset-x-0 bottom-0"
    case "right":
      return "inset-y-0 right-0"
    default:
      return "inset-y-0 left-0"
  }
})

const sizeClass = computed(() => {
  switch (props.position) {
    case "top":
    case "bottom":
      return "w-screen min-h-[75px]"
    case "right":
    default:
      return "h-screen w-full max-w-xs"
  }
})

const drawerTransition = computed(() => {
  switch (props.position) {
    case "top":
      return {
        enter: "transition-transform ease-in-out duration-500",
        enterFrom: "-translate-y-full",
        enterTo: "translate-y-0",
        leave: "transition-transform ease-in-out duration-500",
        leaveFrom: "translate-y-0",
        leaveTo: "-translate-y-full",
      }
    case "bottom":
      return {
        enter: "transition-transform ease-in-out duration-500",
        enterFrom: "translate-y-full",
        enterTo: "translate-y-0",
        leave: "transition-transform ease-in-out duration-500",
        leaveFrom: "translate-y-0",
        leaveTo: "translate-y-full",
      }
    case "right":
      return {
        enter: "transition-transform ease-in-out duration-500",
        enterFrom: "translate-x-full",
        enterTo: "translate-x-0",
        leave: "transition-transform ease-in-out duration-500",
        leaveFrom: "translate-x-0",
        leaveTo: "translate-x-full",
      }
    default:
      return {
        enter: "transition-transform ease-in-out duration-500",
        enterFrom: "-translate-x-full",
        enterTo: "translate-x-0",
        leave: "transition-transform ease-in-out duration-500",
        leaveFrom: "translate-x-0",
        leaveTo: "-translate-x-full",
      }
  }
})
</script>
