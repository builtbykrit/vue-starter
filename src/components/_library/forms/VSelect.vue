<template>
  <VInputSkin
    ref="trigger"
    :input-id="internalId"
    :label="label"
    :messages="errorMessages"
  >
    <Listbox
      :id="internalId"
      v-model="internalValue"
      :disabled="readonly || disabled"
      as="div"
      class="relative"
    >
      <div class="relative">
        <ListboxButton
          as="div"
          class="w-full h-[34px] border rounded py-1"
          :class="{
            'border-transparent px-0': readonly,
            'border-gray-300 px-1.5': !readonly,
            'border-red-500 bg-red-100/25': hasError,
          }"
        >
          <template v-if="!!selectedItem"
            >{{ selectedItem[itemText] }}
          </template>
          <span v-else class="text-sm text-gray-500">{{ placeholder }}</span>
        </ListboxButton>

        <div
          v-if="!readonly"
          class="absolute inset-y-0 right-0 pr-2 gap-1 flex items-center"
        >
          <button v-if="clearable && !!selectedItem" @click="clearInput">
            <XIcon class="h-4 w-4 text-gray-400" />
          </button>
          <SelectorIcon
            class="h-5 w-5 text-gray-400 pointer-events-none"
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
              class="px-2 py-1"
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
import { computed } from "vue"
import { v4 as uuid } from "uuid"
import VInputSkin from "@/components/_library/forms/VInputSkin.vue"
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue"
import { SelectorIcon, XIcon } from "@heroicons/vue/solid"
import { usePopper } from "@/composables/usePopper"
import { useValidation } from "@/composables/useValidation"

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
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
})
const selectedItem = computed(() =>
  props.items.find((item) => item[props.itemValue] === internalValue.value)
)

const clearInput = () => {
  internalValue.value = null
}
</script>
