<template>
  <VInputSkin :input-id="internalId" :label="label" :messages="errorMessages">
    <template #label>
      <slot name="label" />
    </template>

    <div class="relative">
      <input
        :id="internalId"
        ref="input"
        v-model="internalValue"
        :type="internalType"
        :step="step"
        :readonly="readonly || disabled"
        class="w-full rounded py-1 focus:ring-primary-500 outline-none"
        :class="{
          'border-transparent focus:border-transparent focus:ring-0 px-0':
            readonly,
          'border-gray-300 px-1.5': !readonly,
          'border-red-500 bg-red-100/25': hasError,
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
          <EyeOffIcon v-if="showPassword" class="h-5 w-5 text-gray-300" />
          <EyeIcon v-else class="h-5 w-5 text-gray-300" />
        </button>
      </div>
    </div>
  </VInputSkin>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { v4 as uuid } from "uuid"
import VInputSkin from "@/components/_library/forms/VInputSkin.vue"
import { EyeIcon, EyeOffIcon } from "@heroicons/vue/solid"
import { useValidation } from "@/composables/useValidation"

const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  id: { type: String, default: undefined },
  label: { type: String, default: undefined },
  type: { type: String, default: "text" },
  step: { type: Number, default: 1 },
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
const emit = defineEmits(["update:modelValue", "focus", "blur"])

const input = ref(null)
const showPassword = ref(false)
const internalId = computed(() => (props.id ? props.id : uuid()))
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
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
