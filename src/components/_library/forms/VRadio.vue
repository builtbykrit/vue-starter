<template>
  <VLabel :input-id="internalId">
    <input
      :id="internalId"
      :value="value"
      :checked="selected"
      :disabled="disabled || readonly"
      type="radio"
      class="h-5 w-5 border-gray-300 hover:bg-primary-100 focus:ring-offset-0 focus:ring-primary-100"
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
  modelValue: { type: [Boolean, Number, String], default: undefined },
  id: { type: String, default: undefined },
  label: { type: String, default: undefined },
  value: { type: [Boolean, String, Number], default: true },
  bgColor: { type: String, default: "primary" },
  readonly: Boolean,
  disabled: Boolean,
})
const emit = defineEmits(["update:modelValue"])

const internalId = computed(() => (props.id ? props.id : uuid()))
const selected = computed(() => props.modelValue === props.value)

const bgClass = computed(() => `text-${props.bgColor}-500`)

const onChange = () => emit("update:modelValue", props.value)
</script>
