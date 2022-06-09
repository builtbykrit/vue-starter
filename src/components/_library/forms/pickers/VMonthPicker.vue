<template>
  <v-date-picker-skin
    :title-text="`${displayYear}`"
    can-go-back
    can-go-forward
    @picker:go-back="prevYear"
    @picker:go-forward="nextYear"
  >
    <ul :key="displayYear" class="grid grid-cols-3 w-full justify-center">
      <li v-for="month in displayableMonths" :key="month">
        <v-picker-button
          :selected="isSelectedMonth(month)"
          :current="isCurrentMonth(month)"
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
import { ref } from "vue"

const emit = defineEmits(["update:model-value"])
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const currentDate = clock.format()
const displayableMonths = clock.monthsOfYear(true)

const displayYear = ref(clock.getYear(props.modelValue))

const isSelectedMonth = (month) =>
  clock.getMonth(props.modelValue) === displayableMonths.indexOf(month)
const isCurrentMonth = (month) =>
  clock.getMonth(currentDate) === displayableMonths.indexOf(month) &&
  clock.getYear(currentDate) === displayYear.value

const prevYear = () => {
  displayYear.value = displayYear.value - 1
}
const nextYear = () => {
  displayYear.value = displayYear.value + 1
}

const handleSelection = (month) => {
  const numericMonth = displayableMonths.findIndex((m) => m === month)
  const newDate = clock.setYear(
    clock.setMonth(props.modelValue, numericMonth),
    displayYear.value
  )
  emit("update:model-value", newDate)
}
</script>
