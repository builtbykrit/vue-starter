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
import VDatePickerSkin from "@/components/_library/pickers/VDatePickerSkin.vue"
import VPickerButton from "@/components/_library/pickers/VPickerButton.vue"
import clock from "@/modules/clock"

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  /**
   * Zero-index numeric representation of a month (e.g. January = 0)
   */
  modelValue: {
    type: Number,
    validator: (val) => (val >= 0) & (val <= 11),
    required: true,
  },
})

/**
 * Returns a list of abbreviated names for the months of the year
 * @type {MonthNames}
 */
const displayableMonths = clock.monthsOfYearShort()

/**
 * Checks whether a month is the currently selected month
 * @param month
 * @returns {boolean}
 */
const isSelectedMonth = (month) =>
  props.modelValue === displayableMonths.indexOf(month)

const handleSelection = (month) => {
  const numericMonth = displayableMonths.findIndex((m) => m === month)
  emit("update:modelValue", numericMonth)
}
</script>
