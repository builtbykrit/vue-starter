<template>
  <VTextField
    :id="id"
    v-bind="props"
    v-model="internalValue"
    @blur="updateExternalValue"
  />
</template>

<script setup>
import { ref, watch } from "vue"
import clock from "@/modules/clock"
import VTextField from "@/components/_library/forms/VTextField.vue"

const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  displayFormat: { type: String, default: "h:mm A" },
  outputFormat: { type: String, default: "HH:mm" },
  id: { type: String, default: undefined },
  label: { type: String, default: undefined },
  validation: { type: Object, default: () => undefined },
  readonly: Boolean,
  autofocus: Boolean,
})
const emit = defineEmits(["update:modelValue"])

const internalValue = ref(
  !!props.modelValue
    ? clock.format(props.modelValue, props.displayFormat, props.outputFormat)
    : undefined
)

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = !!newValue
      ? clock.format(newValue, props.displayFormat, props.outputFormat)
      : undefined
  }
)

const updateExternalValue = () => {
  if (!internalValue.value) {
    emit("update:modelValue", undefined)
    return
  }

  const timeFormats = ["h:mma", "h:mm a", "H:mm", "ha", "h a", "H"]
  // If user forgot "m" in "pm"
  const timeLastLetter = internalValue.value[internalValue.value.length - 1]
  const time =
    timeLastLetter === "p" ? internalValue.value + "m" : internalValue.value

  // Check if inputted time is valid
  const validTime = clock.isValid(time, timeFormats)

  // If valid, format and update modelValue
  if (validTime) {
    emit(
      "update:modelValue",
      clock.format(time, props.outputFormat, timeFormats)
    )
    internalValue.value = clock.format(time, props.displayFormat, timeFormats)
  }
  // Else, revert to old modelValue
  else {
    internalValue.value = clock.format(
      props.modelValue,
      props.displayFormat,
      "HH:mm"
    )
  }
}
</script>
