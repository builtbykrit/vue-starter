<template>
  <v-date-picker-skin title-text="Select a Month">
    <ul class="grid grid-cols-3 w-full justify-center">
      <li v-for="month in displayableMonths" :key="month">
        <v-picker-button
          :selected="isSelectedMonth(month)"
          @click="handleSelection(month)"
        >
          {{ month }}
        </v-picker-button>
      </li>
    </ul>
  </v-date-picker-skin>
</template>

<script setup>
import VDatePickerSkin from "@/components/_library/forms/pickers/VDatePickerSkin.vue"
import VPickerButton from "@/components/_library/forms/pickers/VPickerButton.vue"
import clock from "@/modules/clock"

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    type: Number,
    validator: (val) => (val >= 0) & (val <= 11),
    required: true,
  },
})

const displayableMonths = clock.monthsOfYear(true)

const isSelectedMonth = (month) =>
  props.modelValue === displayableMonths.indexOf(month)

const handleSelection = (month) => {
  const numericMonth = displayableMonths.findIndex((m) => m === month)
  emit("update:modelValue", numericMonth)
}
</script>
