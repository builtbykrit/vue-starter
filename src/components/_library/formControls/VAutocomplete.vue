<template>
  <VInputSkin :input-id="internalId" :label="label">
    <Combobox
      v-model="internalValue"
      :disabled="readonly || disabled"
      as="div"
      class="relative"
    >
      <div class="relative">
        <ComboboxInput
          :id="internalId"
          :display-value="() => selectedItem?.[itemText] ?? ''"
          :placeholder="placeholder"
          class="w-full placeholder:text-sm h-[34px] border rounded py-1"
          :class="{
            'border-transparent focus:border-transparent focus:ring-0 px-0':
              readonly,
            'border-gray-300 px-1.5': !readonly,
          }"
          @change="searchText = $event.target.value"
        />
        <div class="absolute inset-y-0 right-0 pr-2 gap-1 flex items-center">
          <button v-if="!!selectedItem" @click="clearInput">
            <XIcon class="h-4 w-4 text-gray-400" />
          </button>
          <SelectorIcon
            v-if="!readonly"
            class="h-5 w-5 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      <ComboboxOptions
        class="absolute w-full rounded shadow max-h-56 overflow-y-auto mt-1 focus:outline-0 z-10"
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
              'bg-blue-500/25': selected && !active,
              'bg-blue-500 text-white': active,
              'bg-white text-black': !active && !selected,
            }"
          >
            {{ item[itemText] }}
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </Combobox>
  </VInputSkin>
</template>

<script>
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue"
import { SelectorIcon, XIcon } from "@heroicons/vue/solid"

import VInputSkin from "@/components/_library/formControls/VInputSkin.vue"
import { v4 as uuid } from "uuid"

export default {
  name: "VAutocomplete",
  components: {
    ComboboxOption,
    ComboboxOptions,
    ComboboxInput,
    VInputSkin,
    Combobox,
    SelectorIcon,
    XIcon,
  },
  props: {
    modelValue: { type: [String, Number], default: undefined },
    id: { type: String, default: undefined },
    label: { type: String, default: undefined },
    items: { type: Array, required: true },
    itemValue: { type: String, default: "value" },
    itemText: { type: String, default: "text" },
    itemKey: { type: String, default: "value" },
    placeholder: { type: String, default: undefined },
    readonly: Boolean,
    disabled: Boolean,
  },
  emits: ["update:modelValue"],
  data: () => ({
    searchText: "",
  }),
  computed: {
    internalId() {
      if (this.id) return this.id
      return uuid()
    },
    internalValue: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit("update:modelValue", val)
      },
    },
    selectedItem() {
      return this.items.find(
        (item) => item[this.itemValue] === this.internalValue
      )
    },
    filteredItems() {
      if (this.searchText === "") return this.items

      return this.items.filter((item) =>
        item[this.itemText]
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      )
    },
  },
  methods: {
    clearInput() {
      this.searchText = ""
      this.internalValue = null
    },
  },
}
</script>

<style scoped></style>
