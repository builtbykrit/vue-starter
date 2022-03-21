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
import VDatePickerSkin from "@/components/_library/forms/pickers/VDatePickerSkin.vue"
import VPickerButton from "@/components/_library/forms/pickers/VPickerButton.vue"
import clock from "@/modules/clock"
import { computed } from "vue"

defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  firstYear: {
    type: Number,
    default: clock.getYear(),
  },
  maxYearsToDisplay: {
    type: Number,
    default: 5,
  },
})

const displayableYears = computed(() => {
  let startYear = props.firstYear
  const years = []
  for (let i = 0; i < props.maxYearsToDisplay; i++) years.push(startYear++)
  return years
})
const isSelectedYear = (year) => year === props.modelValue
</script>
