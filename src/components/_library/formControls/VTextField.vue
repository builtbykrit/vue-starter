<template>
  <VInputSkin :input-id="internalId" :label="label">
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
        :readonly="readonly"
        class="w-full rounded py-1"
        :class="{
          'border-transparent focus:border-transparent focus:ring-0 px-0':
            readonly,
          'border-gray-300 px-1.5': !readonly,
        }"
        @blur="$emit('blur')"
      />

      <div
        v-if="type === 'password'"
        class="absolute inset-y-0 right-0 flex items-center pr-2"
      >
        <button data-cy="passwordToggle" @click="toggleShowPassword">
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
import VInputSkin from "@/components/_library/formControls/VInputSkin.vue"
import { EyeIcon, EyeOffIcon } from "@heroicons/vue/solid"

const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  id: { type: String, default: undefined },
  label: { type: String, default: undefined },
  type: { type: String, default: "text" },
  step: { type: Number, default: 1 },
  readonly: Boolean,
  autofocus: Boolean,
})
const emit = defineEmits(["update:modelValue", "blur"])

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

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}

onMounted(() => {
  if (props.autofocus) {
    input.value.focus()
  }
})
</script>
