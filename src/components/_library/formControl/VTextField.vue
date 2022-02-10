<template>
  <VInputSkin :input-id="internalId" :label="label">
    <template #label>
      <slot name="label" />
    </template>

    <input
      :id="internalId"
      v-model="internalValue"
      :type="type"
      :step="step"
      :readonly="readonly"
      class="w-full border-gray-300 rounded px-1.5 py-1"
    />
  </VInputSkin>
</template>

<script>
import { v4 as uuid } from "uuid"

import VInputSkin from "@/components/_library/formControl/VInputSkin.vue"

export default {
  components: { VInputSkin },
  props: {
    modelValue: { type: [String, Number], required: true },
    id: { type: String, default: undefined },
    label: { type: String, default: undefined },
    type: { type: String, default: "text" },
    step: { type: Number, default: 1 },
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
  },
}
</script>
