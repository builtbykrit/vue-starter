<template>
  <input
    ref="input"
    v-model="internalValue"
    :readonly="readonly || disabled"
    type="text"
    maxlength="1"
    pattern="[0-9]"
    class="border rounded w-10 h-10 py-1 text-center outline-none"
    :class="{
      'border-transparent focus:border-transparent focus:ring-0 px-0': readonly,
      'border-gray-300 px-1.5': !readonly,
      'border-red-500 bg-red-100/25': hasError,
      'border-primary-500 ring-primary-500 ring-1': focused,
    }"
    @focus="onFocus"
    @blur="$emit('blur')"
    @paste="$emit('paste', $event)"
  />
</template>

<script setup>
import { computed, watch, ref } from "vue"

const props = defineProps({
  modelValue: { type: String, default: "" },
  focused: Boolean,
  readonly: Boolean,
  disabled: Boolean,
  hasError: Boolean,
})
const emit = defineEmits(["input", "focus", "blur", "paste"])

const input = ref(null)
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("input", value),
})

const onFocus = (event) => {
  input.value.select()
  emit("focus", event)
}

watch(
  () => props.focused,
  (value) => {
    if (!value) {
      input.value.blur()
    }
  }
)
</script>
