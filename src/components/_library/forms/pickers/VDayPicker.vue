<template>
  <v-date-picker-skin
    :title-text="displayedMonthName"
    can-go-back
    can-go-forward
    @picker:go-back="goBackMonth()"
    @picker:go-forward="goForwardMonth()"
  >
    <ul :key="displayedMonthName" class="grid grid-cols-7">
      <li
        v-for="(dayOfWeek, index) in orderedDaysOfWeek()"
        :key="`${randomKey}-${index}`"
        class="text-center text-gray-900 text-xs font-semibold py-2 col-span-1"
      >
        {{ dayOfWeek }}
      </li>
      <li
        v-for="(day, index) in displayableDays"
        :key="index"
        :class="['text-center', `col-start-${offset(day)}`]"
      >
        <v-picker-button
          :one-of-set="props.week"
          :first-of-set="isFirstDayOfSelectedWeek(day)"
          :last-of-set="isLastDayOfSelectedWeek(day)"
          :set-is-hovered="props.week && isInSameWeek(day, state.hoverDate)"
          :selected="isSelectedDate(day) || (props.week && isInSameWeek(day))"
          :disabled="isDisabled(day)"
          @click="pickDate(day)"
          @mouseover="setHoverDate(day)"
          @mouseleave="setHoverDate()"
        >
          {{ day }}
        </v-picker-button>
      </li>
    </ul>
  </v-date-picker-skin>
</template>

<script setup>
import VDatePickerSkin from "@/components/_library/forms/pickers/VDatePickerSkin.vue"
import VPickerButton from "@/components/_library/forms/pickers/VPickerButton.vue"
import clock from "@/modules/clock"
import { v4 as uuid } from "uuid"
import { computed, reactive } from "vue"

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: { type: String, default: undefined },
  week: Boolean,
  min: { type: String, default: undefined },
  max: { type: String, default: undefined },
})

const state = reactive({
  displayedMonth: props.modelValue ?? props.min,
  hoverDate: null,
})

const displayableDays = computed(() =>
  clock.getDaysInMonth(state.displayedMonth)
)
const displayedMonthName = computed(() =>
  clock.format(state.displayedMonth, "MMMM")
)

const selectedDate = (day) => {
  const selectedYearAndMonth = clock.format(state.displayedMonth, "YYYY-MM")
  return clock.format(`${selectedYearAndMonth}-${day}`)
}
const pickDate = (day) => {
  emit("update:modelValue", selectedDate(day))
}
const isSelectedDate = (day) => selectedDate(day) === props.modelValue

const isInSameWeek = (day, dateInWeek = props.modelValue) =>
  clock.isSame(selectedDate(day), dateInWeek, "week")

const isFirstDayOfSelectedWeek = (day) => {
  const dayOfWeek = clock.getDayOfWeek(selectedDate(day))
  return dayOfWeek === 0
}
const isLastDayOfSelectedWeek = (day) => {
  const dayOfWeek = clock.getDayOfWeek(selectedDate(day))
  return dayOfWeek === 6
}
const isDisabled = (day) => {
  if (!props.min && !props.max) return false

  const date = selectedDate(day)
  if (props.min && props.max) {
    return clock.isBefore(date, props.min) || clock.isAfter(date, props.max)
  } else if (props.min) {
    return clock.isBefore(date, props.min)
  } else if (props.max) {
    return clock.isAfter(date, props.max)
  }
}

const goBackMonth = () =>
  (state.displayedMonth = clock.getPrevious("month", state.displayedMonth))
const goForwardMonth = () =>
  (state.displayedMonth = clock.getNext("month", state.displayedMonth))

const offset = (day) => {
  if (day !== 1) return "auto"
  const monthStartsOn = clock.getMonthStartDay(state.displayedMonth)
  const weekStartsOn = 0
  let offset
  if (monthStartsOn >= weekStartsOn) {
    offset = monthStartsOn - weekStartsOn
  } else {
    offset = 6 - weekStartsOn + monthStartsOn + 1
  }
  return Math.min(++offset, 7)
}

const orderedDaysOfWeek = () => {
  return [...clock.daysOfWeek()].map((day) => day[0])
}

const setHoverDate = (day = null) => {
  state.hoverDate = day ? selectedDate(day) : null
}
const randomKey = uuid()
</script>
