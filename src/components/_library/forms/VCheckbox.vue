<template>
  <VLabel :input-id="internalId" class="flex items-center">
    <input
      :id="internalId"
      :value="value"
      :checked="checked"
      :disabled="disabled || readonly"
      type="checkbox"
      class="rounded h-5 w-5 border-gray-300 focus:ring-offset-0 focus:ring-primary-500/50"
      :class="bgClass"
      @input="onChange"
    />
    <span class="ml-2">
      <slot name="label">{{ label }}</slot>
    </span>
  </VLabel>
</template>

<script setup>
import { computed } from "vue"
import { v4 as uuid } from "uuid"
import VLabel from "@/components/_library/forms/VLabel.vue"

const props = defineProps({
  modelValue: { type: [Boolean, Array], default: undefined },
  id: { type: String, default: undefined },
  label: { type: String, default: undefined },
  value: { type: [Boolean, String, Number], default: true },
  bgColor: { type: String, default: "primary" },
  readonly: Boolean,
  disabled: Boolean,
})
const emit = defineEmits(["update:modelValue"])

const internalId = computed(() => (props.id ? props.id : uuid()))
const checked = computed(() => {
  if (props.modelValue === true) return true
  return !!(
    Array.isArray(props.modelValue) && props.modelValue.includes(props.value)
  )
})
const bgClass = computed(() => `text-${props.bgColor}-500`)

const onChange = () => {
  // when there's only a single checkbox, return a boolean
  if (typeof props.modelValue === "boolean" || !props.modelValue) {
    emit("update:modelValue", !checked.value)
  } else {
    // when there's multiple checkboxes, return an array with/without this checkbox's value
    const updatedValues = Array.isArray(props.modelValue)
      ? props.modelValue
      : []

    if (checked.value) {
      emit(
        "update:modelValue",
        updatedValues.filter((v) => v !== props.value)
      )
    } else {
      updatedValues.push(props.value)
      emit("update:modelValue", updatedValues)
    }
  }
}
</script>
