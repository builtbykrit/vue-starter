<template>
  <VMenu>
    <template #activator>
      <VTextField v-bind="props" :model-value="displayDate" disabled>
        <template v-if="!readonly" #append-inner-icon>
          <button
            v-if="clearable && internalValue"
            class="pointer-events-auto"
            @click="clearInput"
          >
            <XIcon class="h-4 w-4 text-gray-400" />
          </button>

          <CalendarIcon class="h-5 w-5 text-gray-400" />
        </template>
      </VTextField>
    </template>

    <template #default>
      <VDayPicker v-model="internalValue" data-cy="date-picker" />
    </template>
  </VMenu>
</template>

<script setup>
import { computed } from "vue"
import clock from "@/modules/clock"
import { CalendarIcon, XIcon } from "@heroicons/vue/solid"

import VMenu from "@/components/_library/general/VMenu.vue"
import VTextField from "@/components/_library/forms/VTextField.vue"
import VDayPicker from "@/components/_library/forms/pickers/VDayPicker.vue"

const props = defineProps({
  id: { type: String, default: undefined },
  modelValue: { type: String, default: undefined },
  label: { type: String, default: undefined },
  validation: { type: Object, default: () => undefined },
  displayFormat: { type: String, default: "MMMM D, YYYY" },
  readonly: Boolean,
  clearable: Boolean,
})

const emit = defineEmits(["update:modelValue"])

const internalValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit("update:modelValue", val)
  },
})

const displayDate = computed(() =>
  !!props.modelValue
    ? clock.format(props.modelValue, props.displayFormat)
    : undefined
)

const clearInput = () => {
  internalValue.value = undefined
}
</script>
