<template>
  <VInputSkin
    ref="trigger"
    :input-id="internalId"
    :label="label"
    :messages="errorMessages"
  >
    <Combobox
      v-model="internalValue"
      :disabled="isReadonly || isDisabled"
      as="div"
    >
      <div class="relative">
        <ComboboxInput
          :id="internalId"
          :display-value="itemDisplay"
          :placeholder="placeholder"
          class="w-full placeholder:text-sm h-[34px] border rounded py-1"
          :class="{
            'border-transparent focus:border-transparent focus:ring-0 px-0':
              isReadonly,
            'border-gray-300 px-1.5': !isReadonly,
            'border-red-500 bg-red-100/25': hasError,
          }"
          @change="onChange"
        />
        <div
          v-if="!isReadonly"
          class="absolute inset-y-0 right-0 pr-2 gap-1 flex items-center"
        >
          <button v-if="!!selectedItem" @click="clearInput">
            <VIcon name="X" size-class="h-4 w-4" class="text-gray-400" />
          </button>
          <VIcon
            v-if="!isReadonly"
            name="Selector"
            class="text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      <div ref="container" class="absolute w-full z-20">
        <ComboboxOptions
          class="bg-white rounded shadow max-h-56 overflow-y-auto focus:outline-0"
        >
          <ComboboxOption
            v-for="item in filteredItems"
            v-slot="{ active, selected }"
            :key="item[itemKey]"
            as="template"
            :value="item[itemValue]"
          >
            <li
              class="px-2 py-1"
              :class="{
                'bg-primary-500/25': selected && !active,
                'bg-primary-500 text-white': active,
                'bg-white text-black': !active && !selected,
              }"
            >
              {{ item[itemText] }}
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
  </VInputSkin>
</template>

<script setup>
import { ref, computed, inject } from "vue"
import { v4 as uuid } from "uuid"
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
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

const searchText = ref("")
const internalId = computed(() => (props.id ? props.id : uuid()))
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:model-value", value),
})
const selectedItem = computed(() =>
  props.items.find((item) => item[props.itemValue] === internalValue.value)
)
const filteredItems = computed(() => {
  if (searchText.value === "") return props.items

  return props.items.filter((item) =>
    item[props.itemText].toLowerCase().includes(searchText.value?.toLowerCase())
  )
})

const itemDisplay = () => {
  return selectedItem.value?.[props.itemText] ?? ""
}
const onChange = (event) => {
  searchText.value = event.target.value
}
const clearInput = () => {
  searchText.value = ""
  internalValue.value = null
}
</script>
