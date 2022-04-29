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
              class="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded"
            >
              <!-- Modal Title -->
              <div class="flex justify-between px-4 pt-4">
                <DialogTitle as="h3" class="v-heading-sm">
                  <slot name="title">{{ title }}</slot>
                </DialogTitle>
                <button @click="isOpen = false">
                  <XIcon class="h-5 w-5" />
                </button>
              </div>

              <!-- Modal subtitle -->
              <DialogDescription class="v-paragraph text-gray-800 px-4">
                <slot name="subtitle">{{ subtitle }}</slot>
              </DialogDescription>

              <!-- Modal Content -->
              <div
                v-if="!!$slots.default || !!content"
                class="v-paragraph-xs text-gray-700 p-4"
              >
                <slot>
                  {{ content }}
                </slot>
              </div>

              <!-- Modal Actions -->
              <div
                v-if="!!$slots.actions"
                class="bg-gray-100 flex items-center gap-2 px-4 py-3"
              >
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
