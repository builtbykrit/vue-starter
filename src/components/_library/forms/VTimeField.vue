<template>
  <VTextField
    :id="id"
    v-bind="props"
    v-model="internalValue"
    @blur="updateExternalValue"
  />
</template>

<script setup>
import { ref } from "vue"
import clock from "@/modules/clock"
import VTextField from "@/components/_library/forms/VTextField.vue"

const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  displayFormat: { type: String, default: "h:mm A" },
  outputFormat: { type: String, default: "HH:mm" },
  id: { type: String, default: undefined },
  label: { type: String, default: undefined },
  readonly: Boolean,
  autofocus: Boolean,
})
const emit = defineEmits(["update:modelValue"])

const internalValue = ref(
  clock.format(`01-01-2020 ${props.modelValue}`, props.displayFormat)
)

const updateExternalValue = () => {
  const newDate = `01-01-2020 ${internalValue.value}`
  // Check if inputted time is valid
  const validTime = clock.isValid(newDate)

  // If valid, format and update modelValue
  if (validTime) {
    emit("update:modelValue", clock.format(newDate, props.outputFormat))
    internalValue.value = clock.format(newDate, props.displayFormat)
  }
  // Else, revert to old modelValue
  else {
    const oldDate = `01-01-2020 ${props.modelValue}`
    internalValue.value = clock.format(oldDate, props.displayFormat)
  }
}
</script>
