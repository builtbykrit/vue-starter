<template>
  <VInputSkin :input-id="internalId" :label="label" :messages="errorMessages">
    <div :id="internalId" ref="inputsContainer" class="flex items-center gap-2">
      <VOtpSingleInput
        v-for="(character, index) in characters"
        ref="inputs"
        :key="`OTP-${index}`"
        :model-value="displayValue[index]"
        :focused="state.focused"
        :readonly="readonly"
        :disabled="disabled"
        :has-error="hasError"
        @focus="onFocus(index)"
        @blur="onBlur"
        @paste="onPaste(index, $event)"
        @keydown="onKeyDown(index, $event)"
        @input="onInput(index, $event)"
      />
    </div>
  </VInputSkin>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue"
import { useValidation } from "@/composables/useValidation"
import { v4 as uuid } from "uuid"

import VInputSkin from "@/components/_library/forms/VInputSkin.vue"
import VOtpSingleInput from "@/components/_library/forms/VOtpField/VOtpSingleInput.vue"

const props = defineProps({
  id: { type: String, default: undefined },
  modelValue: {
    type: [Array, String],
    default: () => Array(6).fill(""),
    validator: (value) => value.length < 6 || value.length === 6,
  },
  label: { type: String, default: undefined },
  characters: { type: Number, default: 6 },
  readonly: Boolean,
  disabled: Boolean,
  validation: {
    type: Object,
    default: () => ({
      $dirty: false,
      $error: false,
      $errors: [],
    }),
  },
})
const emit = defineEmits(["update:modelValue", "completed"])
const { hasError, errorMessages } = useValidation(props.validation)

const inputs = ref(null)
const state = reactive({
  focused: false,
  activeInput: 0,
})

const internalId = computed(() => (props.id ? props.id : uuid()))
const displayValue = computed(() =>
  typeof props.modelValue !== "string"
    ? props.modelValue
    : [
        ...props.modelValue,
        ...Array(props.characters).fill("").splice(props.characters),
      ]
)
const isComplete = computed(() => props.modelValue.length === props.characters)
watch(isComplete, (value) => {
  if (value) emit("completed")
})

const onFocus = (index) => {
  state.focused = true
  state.activeInput = index
}

const onBlur = () => {
  state.focused = false
  state.activeInput = -1
}

const onInput = (index, char) => {
  const newValue = Object.assign([], props.modelValue)
  newValue[index] = char

  if (newValue.join("") !== props.modelValue) {
    emit("update:modelValue", newValue.join(""))
    focusNextInput()
  }
}

const onPaste = (index, event) => {
  event.preventDefault()
  const pastedData = event.clipboardData
    .getData("text/plain")
    .slice(0, props.characters - state.activeInput)
    .split("")

  // Paste data from focused input onwards
  const currentCharsInOtp = displayValue.value.slice(0, state.activeInput)
  const combinedWithPastedData = currentCharsInOtp
    .concat(pastedData)
    .slice(0, props.characters)

  const newValue = Object.assign([], displayValue.value)
  combinedWithPastedData.forEach(function (value, i) {
    newValue[i] = value
  })

  if (combinedWithPastedData.length === props.characters) {
    state.focused = false
    state.activeInput = -1
  } else {
    focusInput(combinedWithPastedData.slice(0, props.characters).length)
  }
  emit("update:modelValue", newValue.join(""))

  if (props.modelValue.length === props.characters) {
    emit("completed")
  }
}

const focusInput = (inputIndex) => {
  state.activeInput = inputIndex
  inputs.value[inputIndex].$el.focus()
  inputs.value[inputIndex].$el.select()
}

const focusNextInput = () => {
  if (state.activeInput < props.characters - 1) {
    focusInput(state.activeInput + 1)
  }
}

const focusPreviousInput = () => {
  if (state.activeInput > 0) {
    focusInput(state.activeInput - 1)
  }
}

// Handle cases of backspace, delete, left arrow, right arrow
const onKeyDown = (index, event) => {
  const BACKSPACE = 8
  const LEFT_ARROW = 37
  const RIGHT_ARROW = 39
  const DELETE = 46

  switch (event.keyCode) {
    case BACKSPACE:
      event.preventDefault()
      onInput(index, "")
      focusPreviousInput()
      break
    case DELETE:
      event.preventDefault()
      onInput(index, "")
      break
    case LEFT_ARROW:
      event.preventDefault()
      focusPreviousInput()
      break
    case RIGHT_ARROW:
      event.preventDefault()
      focusNextInput()
      break
    default:
      break
  }
}
</script>
