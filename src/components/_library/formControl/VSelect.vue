<template>
  <VInputSkin :input-id="internalId" :label="label">
    <Listbox v-model="internalValue" as="div" class="relative">
      <div class="relative">
        <ListboxInput
          v-if="typeahead"
          :id="internalId"
          :selected-text="selectedItem?.[itemText]"
          :placeholder="placeholder"
        />
        <ListboxButton
          v-else
          as="div"
          class="w-full h-[34px] border border-gray-300 rounded px-1.5 py-1"
        >
          <template v-if="!!selectedItem"
            >{{ selectedItem[itemText] }}
          </template>
          <span v-else class="text-sm text-gray-500">{{ placeholder }}</span>
        </ListboxButton>

        <div class="absolute inset-y-0 right-0 pr-2 gap-1 flex items-center">
          <button v-if="clearable && !!selectedItem" @click="clearInput">
            <XIcon class="h-4 w-4 text-gray-400" />
          </button>
          <SelectorIcon
            class="h-5 w-5 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      <ListboxOptions
        class="absolute w-full rounded shadow max-h-56 overflow-y-auto mt-1 focus:outline-0"
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
              'bg-blue-500/25': selected && !active,
              'bg-blue-500 text-white': active,
              'bg-white text-black': !active && !selected,
            }"
          >
            {{ item[itemText] }}
          </li>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </VInputSkin>
</template>

<script setup>
import { v4 as uuid } from "uuid"
import VInputSkin from "@/components/_library/formControl/VInputSkin.vue"
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue"
import ListboxInput from "@/components/_library/formControl/ListboxInput.vue"
import { SelectorIcon, XIcon } from "@heroicons/vue/solid"
import { computed } from "vue"

const props = defineProps({
  modelValue: { type: [String, Number], default: undefined },
  id: { type: String, default: undefined },
  label: { type: String, default: undefined },
  items: { type: Array, required: true },
  itemValue: { type: String, default: "value" },
  itemText: { type: String, default: "text" },
  itemKey: { type: String, default: "value" },
  placeholder: { type: String, default: undefined },
  readonly: Boolean,
  typeahead: Boolean,
  clearable: Boolean,
})
const emit = defineEmits(["update:modelValue"])

const internalId = computed(() => {
  if (props.id) return props.id
  return uuid()
})

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
})

const selectedItem = computed(() =>
  props.items.find((item) => item[props.itemValue] === internalValue.value)
)

const clearInput = () => {
  internalValue.value = null
}
</script>

<style scoped></style>
