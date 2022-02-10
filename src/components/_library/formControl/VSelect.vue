<template>
  <VInputSkin :input-id="internalId" :label="label">
    <Listbox v-model="internalValue">
      <ListboxButton class="w-full border-gray-300 rounded px-1.5 py-1"
        >{{ selectedItem?.[itemText] }}
      </ListboxButton>
    </Listbox>
  </VInputSkin>
</template>

<script>
import VInputSkin from "@/components/_library/formControl/VInputSkin.vue"
import { Listbox, ListboxButton } from "@headlessui/vue"
import { v4 as uuid } from "uuid"

export default {
  name: "VSelect",
  components: { ListboxButton, Listbox, VInputSkin },
  props: {
    modelValue: { type: [String, Number], required: true },
    id: { type: String, default: undefined },
    label: { type: String, default: undefined },
    items: { type: Array, required: true },
    itemValue: { type: String, default: "value" },
    itemText: { type: String, default: "text" },
    itemKey: { type: String, default: "id" },
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
