<template>
  <VInputSkin :input-id="internalId" :label="label">
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
          }"
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
            v-if="!readonly"
            class="h-5 w-5 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      <ListboxOptions
        class="absolute w-full rounded shadow max-h-56 overflow-y-auto mt-1 focus:outline-0 z-10"
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

<script>
import { v4 as uuid } from "uuid"
import VInputSkin from "@/components/_library/formControls/VInputSkin.vue"
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue"
import { SelectorIcon, XIcon } from "@heroicons/vue/solid"

export default {
  components: {
    VInputSkin,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
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
    clearable: Boolean,
  },
  emits: ["update:modelValue"],
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
  },
  methods: {
    clearInput() {
      this.internalValue = null
    },
  },
}
</script>
