<template>
  <v-date-picker-skin title-text="Select a Year">
    <ul class="inline-flex w-full justify-center">
      <li v-for="year in displayableYears" :key="year">
        <v-picker-button
          :selected="isSelectedYear(year)"
          @click="$emit('update:modelValue', year)"
        >
          {{ year }}
        </v-picker-button>
      </li>
    </ul>
  </v-date-picker-skin>
</template>

<script setup>
import VDatePickerSkin from "@/components/_library/pickers/VDatePickerSkin.vue"
import VPickerButton from "@/components/_library/pickers/VPickerButton.vue"
import clock from "@/modules/clock"

defineEmits(["update:modelValue"])
const props = defineProps({
  /**
   * The first year that should be displayed
   */
  firstYear: {
    type: Number,
    default: clock.currentYear(),
  },

  /**
   * The maximum number of years that should be displayed
   */
  maxYearsToDisplay: {
    type: Number,
    default: 5,
  },

  /**
   * A year, expressed in YYYY format
   */
  modelValue: {
    type: Number,
    required: true,
  },
})

/**
 * A list of the years that are displayable
 */
const displayableYears = clock.years(props.firstYear, props.maxYearsToDisplay)

/**
 * Checks whether a year is the currently selected year
 * @param year
 * @returns {boolean}
 */
const isSelectedYear = (year) => year === props.modelValue
</script>
