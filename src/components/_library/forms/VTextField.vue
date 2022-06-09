<template>
  <VInputSkin :input-id="internalId" :label="label" :messages="errorMessages">
    <template #label>
      <slot name="label" />
    </template>

    <div class="relative">
      <div
        v-if="$slots['prepend-icon'] || prependIcon"
        class="absolute inset-y-0 left-0 flex items-center px-1.5"
      >
        <slot name="prepend-icon">
          <VIcon :name="prependIcon" class="text-gray-400" />
        </slot>
      </div>
      <input
        :id="internalId"
        ref="input"
        v-model="internalValue"
        :type="internalType"
        :step="step"
        :readonly="isReadonly || isDisabled"
        :placeholder="placeholder"
        class="w-full placeholder:text-sm rounded py-1 focus:ring-primary-500 outline-none"
        :class="{
          'border-transparent focus:border-transparent focus:ring-0 px-0':
            isReadonly,
          'border-gray-300 px-1.5': !isReadonly,
          'border-red-500 bg-red-100/25': hasError,
          'pl-8': $slots['prepend-icon'] || prependIcon,
        }"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      />

      <div
        class="absolute inset-y-0 right-0 flex gap-1 items-center pointer-events-none pr-2"
      >
        <slot name="append-inner-icon" />

        <button
          v-if="type === 'password'"
          data-cy="passwordToggle"
          class="pointer-events-auto"
          @click="toggleShowPassword"
        >
          <VIcon v-if="showPassword" name="EyeOff" class="text-gray-300" />
          <VIcon v-else name="Eye" class="text-gray-300" />
        </button>
      </div>
    </div>
  </VInputSkin>
</template>

<script setup>
import { computed, onMounted, ref, inject } from "vue"
import { v4 as uuid } from "uuid"
import { useValidation } from "@/composables/useValidation"

import VInputSkin from "@/components/_library/forms/VInputSkin.vue"
import VIcon from "@/components/_library/general/VIcon.vue"

const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  id: { type: String, default: undefined },
  label: { type: String, default: undefined },
  type: { type: String, default: "text" },
  step: { type: Number, default: 1 },
  prependIcon: { type: String, default: undefined },
  placeholder: { type: String, default: undefined },
  readonly: Boolean,
  disabled: Boolean,
  autofocus: Boolean,
  validation: {
    type: Object,
    default: () => ({
      $dirty: false,
      $error: false,
      $errors: [],
    }),
  },
})
const emit = defineEmits(["update:model-value", "focus", "blur"])

/** Inject form level state */
const formIsDisabled = inject("formIsDisabled", false)
const formIsReadonly = inject("formIsReadonly", false)
const isDisabled = computed(() => props.disabled || formIsDisabled.value)
const isReadonly = computed(() => props.readonly || formIsReadonly.value)

const input = ref(null)
const showPassword = ref(false)
const internalId = computed(() => (props.id ? props.id : uuid()))
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:model-value", value),
})
const internalType = computed(() => {
  if (props.type !== "password") return props.type
  return showPassword.value ? "text" : "password"
})

const { hasError, errorMessages } = useValidation(props.validation)

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}

onMounted(() => {
  if (props.autofocus) {
    input.value.focus()
  }
})
</script>
