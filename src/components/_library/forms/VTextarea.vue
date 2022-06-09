<template>
  <VInputSkin :input-id="internalId" :label="label" :messages="errorMessages">
    <template #label>
      <slot name="label" />
    </template>

    <textarea
      :id="internalId"
      ref="textarea"
      v-model="internalValue"
      :rows="rows"
      :readonly="isReadonly"
      :disabled="isDisabled"
      :placeholder="placeholder"
      class="w-full placeholder:text-sm rounded py-1 min-h-[34px] resize-none"
      :class="{
        'border-transparent focus:border-transparent focus:ring-0 px-0':
          isReadonly,
        'border-gray-300 px-1.5': !isReadonly,
        'border-red-500 bg-red-100/25': hasError,
        'hover:resize-y': !autoGrow && !isReadonly,
      }"
    />
  </VInputSkin>
</template>

<script setup>
import { computed, onMounted, watch, ref, inject } from "vue"
import { v4 as uuid } from "uuid"
import VInputSkin from "@/components/_library/forms/VInputSkin.vue"
import { useValidation } from "@/composables/useValidation"

const props = defineProps({
  modelValue: { type: String, default: "" },
  id: { type: String, default: undefined },
  label: { type: String, default: undefined },
  rows: { type: Number, default: 2 },
  placeholder: { type: String, default: undefined },
  autoGrow: Boolean,
  autoFocus: Boolean,
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
const emit = defineEmits(["update:model-value"])

/** Inject form level state */
const formIsDisabled = inject("formIsDisabled", false)
const formIsReadonly = inject("formIsReadonly", false)
const isDisabled = computed(() => props.disabled || formIsDisabled.value)
const isReadonly = computed(() => props.readonly || formIsReadonly.value)

const textarea = ref(null)
const internalId = computed(() => (props.id ? props.id : uuid()))
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:model-value", value),
})
const { hasError, errorMessages } = useValidation(props.validation)

const resizeTextarea = () => {
  const textareaValue = internalValue.value

  if (textareaValue.length === 0) {
    textarea.value.rows = props.rows
    return
  }

  textarea.value.rows = props.rows

  const styles = window.getComputedStyle(textarea.value)
  const paddingTop = parseInt(styles.paddingTop)
  const paddingBottom = parseInt(styles.paddingBottom)
  const padding = paddingTop + paddingBottom
  const height = !!styles.height ? styles.height : padding * 2
  const initialHeight = (parseInt(height) - padding) / textarea.value.rows
  let scrollHeight = textarea.value.scrollHeight - padding
  textarea.value.rows = Math.ceil(scrollHeight / initialHeight) ?? props.rows
}

onMounted(() => {
  if (props.autoGrow) {
    resizeTextarea()
  }
  if (props.autoFocus) {
    textarea.value.focus()
  }
})

watch(internalValue, () => {
  if (props.autoGrow) {
    resizeTextarea()
  }
})
</script>
