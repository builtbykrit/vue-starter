<template>
  <SwitchGroup as="div" class="flex items-center gap-2">
    <SwitchLabel>
      <VLabel :input-id="internalId">{{ label }}</VLabel>
    </SwitchLabel>
    <Switch
      :id="internalId"
      v-model="internalValue"
      :class="internalValue ? 'bg-primary-500' : 'bg-gray-400'"
      class="relative inline-flex items-center h-6 transition-colors rounded-full w-11 ring-primary-500/25 focus:outline-none focus:ring-2 focus:ring-offset-0"
    >
      <span
        :class="internalValue ? 'translate-x-6' : 'translate-x-1'"
        class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full"
      />
    </Switch>
  </SwitchGroup>
</template>

<script setup>
import { computed } from "vue"
import { v4 as uuid } from "uuid"
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue"
import VLabel from "@/components/_library/forms/VLabel.vue"

const props = defineProps({
  id: { type: String, default: undefined },
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: undefined },
})
const emit = defineEmits(["update:model-value"])

const internalId = computed(() => (props.id ? props.id : uuid()))
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:model-value", value),
})
</script>
