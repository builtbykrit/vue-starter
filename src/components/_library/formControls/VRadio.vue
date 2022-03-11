<template>
  <VLabel :input-id="internalId">
    <input
      :id="internalId"
      :value="value"
      :checked="selected"
      :disabled="disabled || readonly"
      type="radio"
      class="h-5 w-5 border-gray-300 focus:ring-offset-0 focus:ring-blue-500/50"
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
import VLabel from "@/components/_library/formControls/VLabel.vue"

const props = defineProps({
  modelValue: { type: [Boolean, Number, String], default: undefined },
  id: { type: String, default: undefined },
  label: { type: String, default: undefined },
  value: { type: [Boolean, String, Number], default: true },
  readonly: Boolean,
  disabled: Boolean,
})
const emit = defineEmits(["update:modelValue"])

const internalId = computed(() => (props.id ? props.id : uuid()))
const selected = computed(() => props.modelValue === props.value)

const onChange = () => emit("update:modelValue", props.value)
</script>
