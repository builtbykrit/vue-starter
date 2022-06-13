<template>
  <VInputSkin :input-id="internalId" :label="label" :messages="errorMessages">
    <template #label>
      <slot name="label" />
    </template>

    <Menu>
      <MenuButton
        ref="trigger"
        class="relative w-full h-[34px] border rounded text-left py-1 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
        :disabled="isDisabled || isReadonly"
        :class="{
          'border-transparent focus:border-transparent focus:ring-0 px-0':
            isReadonly,
          'border-gray-300 px-1.5': !isReadonly,
          'border-red-500 bg-red-100/25': hasError,
        }"
      >
        <span v-if="!!displayDate" class="whitespace-nowrap mr-8">{{
          displayDate
        }}</span>
        <span v-else class="text-sm text-gray-500 whitespace-nowrap mr-8">{{
          placeholder
        }}</span>
        <div
          v-if="!isReadonly"
          class="absolute inset-y-0 right-0 flex gap-1 items-center pointer-events-none pr-2"
        >
          <button
            v-if="clearable && internalValue"
            class="pointer-events-auto"
            @click="clearInput"
          >
            <VIcon name="X" size-class="h-4 w-4" class="text-gray-400" />
          </button>

          <VIcon name="Calendar" class="text-gray-400" />
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
import { computed, inject } from "vue"
import { v4 as uuid } from "uuid"
import { Menu, MenuButton, MenuItems } from "@headlessui/vue"
import { usePopper } from "@/composables/usePopper"
import { useValidation } from "@/composables/useValidation"
import clock from "@/modules/clock"

import VDayPicker from "@/components/_library/forms/pickers/VDayPicker.vue"
import VInputSkin from "@/components/_library/forms/VInputSkin.vue"
import VIcon from "@/components/_library/general/VIcon.vue"

const props = defineProps({
  id: { type: String, default: undefined },
  modelValue: { type: String, default: undefined },
  label: { type: String, default: undefined },
  displayFormat: { type: String, default: "MMMM D, YYYY" },
  placeholder: { type: String, default: undefined },
  readonly: Boolean,
  disabled: Boolean,
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
const emit = defineEmits(["update:model-value"])

/** Inject form level state */
const formIsDisabled = inject("formIsDisabled", false)
const formIsReadonly = inject("formIsReadonly", false)
const isDisabled = computed(() => props.disabled || formIsDisabled.value)
const isReadonly = computed(() => props.readonly || formIsReadonly.value)

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
    emit("update:model-value", val)
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
