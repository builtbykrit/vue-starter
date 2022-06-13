<template>
  <VInputSkin
    ref="trigger"
    :input-id="internalId"
    :label="label"
    :messages="errorMessages"
  >
    <Listbox
      :id="internalId"
      v-slot="{ open }"
      v-model="internalValue"
      :disabled="isReadonly || isDisabled"
      as="div"
      class="relative"
    >
      <div class="relative">
        <ListboxButton
          class="w-full border rounded text-left flex items-center focus:border-primary-500 focus:ring-primary-500 focus:ring-1"
          :class="{
            'border-primary-500 ring-primary-500 ring-1': open,
            'border-transparent px-0': isReadonly,
            'border-gray-300 px-1.5': !isReadonly,
            'border-red-500 bg-red-100/25': hasError,
            'py-1 h-[34px]': !dense,
            'h-[28px]': dense,
          }"
        >
          <span v-if="!!selectedItem" :class="{ 'text-sm': dense }"
            >{{ selectedItem[itemText] }}
          </span>
          <span v-else class="text-sm text-gray-500">{{ placeholder }}</span>
        </ListboxButton>

        <div
          v-if="!isReadonly"
          class="absolute inset-y-0 right-0 gap-1 flex items-center"
          :class="dense ? 'pr-1' : 'pr-2'"
        >
          <button v-if="clearable && !!selectedItem" @click="clearInput">
            <VIcon name="X" size-class="h-4 w-4" class="text-gray-400" />
          </button>
          <VIcon
            name="Selector"
            :size-class="{ 'h-4': dense }"
            class="text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      <div ref="container" class="absolute w-full z-20">
        <ListboxOptions
          class="bg-white rounded shadow max-h-56 overflow-y-auto focus:outline-0"
        >
          <ListboxOption
            v-for="item in items"
            v-slot="{ active, selected }"
            :key="item[itemKey]"
            as="template"
            :value="item[itemValue]"
          >
            <li
              class="px-2 py-1 cursor-pointer"
              :class="{
                'bg-primary-500/25': selected && !active,
                'bg-primary-500 text-white': active,
                'bg-white text-black': !active && !selected,
              }"
            >
              {{ item[itemText] }}
            </li>
          </ListboxOption>
        </ListboxOptions>
      </div>
    </Listbox>
  </VInputSkin>
</template>

<script setup>
import { computed, inject } from "vue"
import { v4 as uuid } from "uuid"
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue"
import { usePopper } from "@/composables/usePopper"
import { useValidation } from "@/composables/useValidation"

import VInputSkin from "@/components/_library/forms/VInputSkin.vue"
import VIcon from "@/components/_library/general/VIcon.vue"

const props = defineProps({
  modelValue: { type: [String, Number], default: undefined },
  id: { type: String, default: undefined },
  label: { type: String, default: undefined },
  items: { type: Array, default: () => [] },
  itemValue: { type: String, default: "value" },
  itemText: { type: String, default: "text" },
  itemKey: { type: String, default: "value" },
  placeholder: { type: String, default: undefined },
  readonly: Boolean,
  disabled: Boolean,
  clearable: Boolean,
  dense: Boolean,
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
  get: () => props.modelValue,
  set: (value) => emit("update:model-value", value),
})
const selectedItem = computed(() =>
  props.items.find((item) => item[props.itemValue] === internalValue.value)
)

const clearInput = () => {
  internalValue.value = null
}
</script>
