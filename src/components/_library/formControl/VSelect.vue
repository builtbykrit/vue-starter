<template>
  <VInputSkin :input-id="internalId" :label="label">
    <Listbox v-model="internalValue" as="div" class="relative">
      <ListboxButton
        as="div"
        class="w-full h-[34px] border border-gray-300 rounded px-1.5 py-1"
        >{{ selectedItem?.[itemText] }}
      </ListboxButton>

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
              'bg-white text-black': !active,
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
import VInputSkin from "@/components/_library/formControl/VInputSkin.vue"
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue"
import { v4 as uuid } from "uuid"

export default {
  name: "VSelect",
  components: {
    ListboxOption,
    ListboxOptions,
    ListboxButton,
    Listbox,
    VInputSkin,
  },
  props: {
    modelValue: { type: [String, Number], required: true },
    id: { type: String, default: undefined },
    label: { type: String, default: undefined },
    items: { type: Array, required: true },
    itemValue: { type: String, default: "value" },
    itemText: { type: String, default: "text" },
    itemKey: { type: String, default: "value" },
    readonly: Boolean,
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
}
</script>

<style scoped></style>
