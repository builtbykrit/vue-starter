<template>
  <VLabel :input-id="internalId" class="flex items-center">
    <input
      :id="internalId"
      :value="value"
      :checked="checked"
      :disabled="disabled || readonly"
      type="checkbox"
      class="rounded h-5 w-5 focus:ring-offset-0 focus:ring-blue-500/50"
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
  name: "VCheckbox",
  components: { VLabel },
  props: {
    modelValue: { type: [Boolean, Array], required: true },
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
    checked() {
      if (this.modelValue === true) return true

      return !!(
        Array.isArray(this.modelValue) && this.modelValue.includes(this.value)
      )
    },
  },
  methods: {
    onChange() {
      // when there's only a single checkbox, return a boolean
      if (typeof this.modelValue === "boolean" || !this.modelValue) {
        this.$emit("update:modelValue", !this.checked)
      } else {
        // when there's multiple checkboxes, return an array with/without this checkbox's value
        const updatedValues = Array.isArray(this.modelValue)
          ? this.modelValue
          : []

        if (this.checked) {
          this.$emit(
            "update:modelValue",
            updatedValues.filter((v) => v !== this.value)
          )
        } else {
          updatedValues.push(this.value)
          this.$emit("update:modelValue", updatedValues)
        }
      }
    },
  },
}
</script>

<style scoped></style>
