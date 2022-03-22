<template>
  <v-date-picker-skin
    :title-text="`${displayYear}`"
    can-go-back
    can-go-forward
    @picker:go-back="prevYear"
    @picker:go-forward="nextYear"
  >
    <ul :key="displayYear" class="grid grid-cols-2 w-full justify-center">
      <li v-for="quarter in quarters" :key="quarter.value">
        <v-picker-button
          :selected="isSelectedQuarter(quarter.value)"
          :current="isCurrentQuarter(quarter.value)"
          @click="handleSelection(quarter.value)"
        >
          {{ quarter.text }}
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

const quarters = [
  { text: "Q1 Jan - Mar", value: 1 },
  { text: "Q2 Apr - Jun", value: 2 },
  { text: "Q3 Jul - Sep", value: 3 },
  { text: "Q4 Oct - Nov", value: 4 },
]

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(["update:modelValue"])

const currentDate = clock.format()
const displayYear = ref(clock.getYear(props.modelValue))

const isSelectedQuarter = (quarter) =>
  clock.getQuarter(props.modelValue) === quarter
const isCurrentQuarter = (quarter) =>
  clock.getQuarter(currentDate) === quarter &&
  clock.getYear(currentDate) === displayYear.value

const prevYear = () => {
  displayYear.value = displayYear.value - 1
}
const nextYear = () => {
  displayYear.value = displayYear.value + 1
}

const handleSelection = (quarter) => {
  const newDate = clock.setYear(
    clock.setQuarter(props.modelValue, quarter),
    displayYear.value
  )
  emit("update:modelValue", newDate)
}
</script>
