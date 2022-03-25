<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="isOpen = false">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded"
            >
              <!-- Modal Title -->
              <div class="flex justify-between">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  <slot name="title">{{ title }}</slot>
                </DialogTitle>
                <button @click="isOpen = false">
                  <XIcon class="h-5 w-5" />
                </button>
              </div>

              <!-- Modal subtitle -->
              <DialogDescription class="text-sm">
                <slot name="subtitle">{{ subtitle }}</slot>
              </DialogDescription>

              <!-- Modal Content -->
              <div v-if="!!$slots.default || !!content" class="mt-2">
                <slot>
                  {{ content }}
                </slot>
              </div>

              <!-- Modal Actions -->
              <div v-if="!!$slots.actions" class="mt-3">
                <slot name="actions" />
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
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue"
import { XIcon } from "@heroicons/vue/solid"
import { computed } from "vue"

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: undefined },
  subtitle: { type: String, default: undefined },
  content: { type: String, default: undefined },
})
const emit = defineEmits(["update:modelValue"])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
})
</script>
