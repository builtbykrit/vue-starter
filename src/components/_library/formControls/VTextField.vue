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
      class="w-full rounded py-1"
      :class="{
        'border-transparent px-0': readonly,
        'border-gray-300 px-1.5': !readonly,
      }"
    />
  </VInputSkin>
</template>

<script>
import { v4 as uuid } from "uuid"

import VInputSkin from "@/components/_library/formControls/VInputSkin.vue"

export default {
  components: { VInputSkin },
  props: {
    modelValue: { type: [String, Number], default: "" },
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
