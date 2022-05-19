<template>
  <VInputSkin :input-id="internalId" :label="label" :messages="errorMessages">
    <template #label>
      <slot name="label" />
    </template>

    <Menu>
      <MenuButton
        ref="trigger"
        class="relative w-full h-[34px] border rounded text-left py-1 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
        :class="{
          'border-transparent focus:border-transparent focus:ring-0 px-0':
            readonly,
          'border-gray-300 px-1.5': !readonly,
          'border-red-500 bg-red-100/25': hasError,
        }"
      >
        <span>{{ displayDate }}</span>
        <div
          v-if="!readonly"
          class="absolute inset-y-0 right-0 flex gap-1 items-center pointer-events-none pr-2"
        >
          <button
            v-if="clearable && internalValue"
            class="pointer-events-auto"
            @click="clearInput"
          >
            <XIcon class="h-4 w-4 text-gray-400" />
          </button>

          <CalendarIcon class="h-5 w-5 text-gray-400" />
        </div>
      </MenuButton>

      <div ref="container" class="absolute bg-white z-20">
        <MenuItems
          class="rounded shadow-lg z-20 focus:outline-none overflow-hidden"
        >
          <VDayPicker v-model="internalValue" data-cy="date-picker" />
        </MenuItems>
      </div>
    </Menu>
  </VInputSkin>
</template>

<script setup>
import { computed } from "vue"
import clock from "@/modules/clock"
import { CalendarIcon, XIcon } from "@heroicons/vue/solid"
import { Menu, MenuButton, MenuItems } from "@headlessui/vue"
import { usePopper } from "@/composables/usePopper"
import VDayPicker from "@/components/_library/forms/pickers/VDayPicker.vue"
import { v4 as uuid } from "uuid"
import { useValidation } from "@/composables/useValidation"

const props = defineProps({
  id: { type: String, default: undefined },
  modelValue: { type: String, default: undefined },
  label: { type: String, default: undefined },
  displayFormat: { type: String, default: "MMMM D, YYYY" },
  readonly: Boolean,
  clearable: Boolean,
  autofocus: Boolean,
  validation: {
    type: Object,
    default: () => ({
      $dirty: false,
      $error: false,
      $errors: [],
    }),
  },
})
const emit = defineEmits(["update:modelValue"])
let [trigger, container] = usePopper({
  placement: "bottom",
  modifiers: [{ name: "offset", options: { offset: [0, 4] } }],
})
const { hasError, errorMessages } = useValidation(props.validation)

const internalId = computed(() => (props.id ? props.id : uuid()))
const internalValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit("update:modelValue", val)
  },
})

const displayDate = computed(() =>
  !!props.modelValue
    ? clock.format(props.modelValue, props.displayFormat)
    : undefined
)

const clearInput = () => {
  internalValue.value = undefined
}
</script>
