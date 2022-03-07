<template>
  <VLabel :input-id="internalId">
    <input
      :id="internalId"
      :value="value"
      :checked="selected"
      :disabled="disabled || readonly"
      type="radio"
      class="h-5 w-5 border-gray-300 focus:ring-offset-0 focus:ring-blue-500/50"
      @input="onChange"
    />
    <span class="ml-2">
      <slot name="label">{{ label }}</slot>
    </span>
  </VLabel>
</template>

<script>
import VLabel from "@/components/_library/formControls/VLabel.vue"
import { v4 as uuid } from "uuid"

export default {
  name: "VRadio",
  components: { VLabel },
  props: {
    modelValue: { type: [Boolean, Number, String], default: undefined },
    id: { type: String, default: undefined },
    label: { type: String, default: undefined },
    value: { type: [Boolean, String, Number], default: true },
    readonly: Boolean,
    disabled: Boolean,
  },
  emits: ["update:modelValue"],
  computed: {
    internalId() {
      if (this.id) return this.id
      return uuid()
    },
    selected() {
      return this.modelValue === this.value
    },
  },
  methods: {
    onChange() {
      this.$emit("update:modelValue", this.value)
    },
  },
}
</script>

<style scoped></style>
