<template>
  <v-date-picker-skin
    :title-text="displayedMonthName"
    can-go-back
    can-go-forward
    @picker:go-back="goBackMonth()"
    @picker:go-forward="goForwardMonth()"
  >
    <transition
      enter-active-class="transition-all ease-in-out duration-150"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-all ease-in-out duration-150"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="-translate-x-full opacity-0"
      mode="out-in"
    >
      <ul :key="displayedMonthName" class="grid grid-cols-7">
        <li
          v-for="(dayOfWeek, index) in orderedDaysOfWeek()"
          :key="`${randomKey}-${index}`"
          class="text-center text-primary-base text-xs font-fancy font-semibold py-2 col-span-1"
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
    </transition>
  </v-date-picker-skin>
</template>

<script setup>
import VDatePickerSkin from "@/components/_library/pickers/VDatePickerSkin.vue"
import VPickerButton from "@/components/_library/pickers/VPickerButton.vue"
import clock from "@/modules/clock"
import { v4 as uuid } from "uuid"
import { computed, reactive } from "vue"

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  /** The selected date: YYYY-MM-DD */
  modelValue: { type: String, default: undefined },
  /** When true, the entire week of the selected date will appear selected. */
  week: Boolean,
  /** Minimum date, everything before this will be disabled */
  min: { type: String, default: undefined },
  /** Maximum date, everything after this will be disabled */
  max: { type: String, default: undefined },
  weekStartDay: {
    type: String,
    default: "sunday",
    validator: (value) => value === "sunday" || value === "monday",
  },
})

/**
 * A date representing the currently displayed month
 */
const state = reactive({
  displayedMonth: props.modelValue ?? props.min,
  hoverDate: null,
})

/**
 * Returns a list of numeric dates in the displayed month (e.g. [1, 2, 3, ...31]
 * @type {ComputedRef<*>}
 */
const displayableDays = computed(() =>
  clock.getDaysInMonth(state.displayedMonth)
)

/**
 * Returns the name of the currently displayed month
 * @type {ComputedRef<*>}
 */
const displayedMonthName = computed(() =>
  clock.format(state.displayedMonth, "MMMM")
)

/**
 * Calculates the selected date
 * @param day
 * @returns {string}
 */
const selectedDate = (day) => {
  const selectedYearAndMonth = clock.format(state.displayedMonth, "YYYY-MM")
  return clock.format(`${selectedYearAndMonth}-${day}`)
}

/**
 * Handler for date selection
 * @param day
 */
const pickDate = (day) => {
  emit("update:modelValue", selectedDate(day))
}

/**
 * Checks if a date is the currently selected date
 * @param day
 * @returns {boolean}
 */
const isSelectedDate = (day) => selectedDate(day) === props.modelValue

/**
 * Checks if a date is in the same week as the currently selected date
 * @param day
 * @param dateInWeek
 * @returns {boolean}
 */
const isInSameWeek = (day, dateInWeek = props.modelValue) => {
  const weekFunc =
    props.weekStartDay === "monday" ? clock.isoWeek : clock.weekOfYear
  return weekFunc(selectedDate(day)) === weekFunc(dateInWeek)
}

/**
 * Checks if a date is the first day of the selected week
 * @param day
 * @returns {boolean}
 */
const isFirstDayOfSelectedWeek = (day) => {
  const dayOfWeek = clock.getDayOfWeek(selectedDate(day))
  return dayOfWeek === clock.weekStartDay()
}

/**
 * Checks if a date is the last day of the selected week
 * @param day
 * @returns {boolean}
 */
const isLastDayOfSelectedWeek = (day) => {
  const dayOfWeek = clock.getDayOfWeek(selectedDate(day))
  return dayOfWeek === clock.weekEndDay()
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

/**
 * Regresses the displayed month
 * @returns {dayjs.Dayjs}
 */
const goBackMonth = () =>
  (state.displayedMonth = clock.getPrevious("month", state.displayedMonth))

/**
 * Advances the displayed month
 * @returns {dayjs.Dayjs}
 */
const goForwardMonth = () =>
  (state.displayedMonth = clock.getNext("month", state.displayedMonth))

/**
 * Calculates the 1-indexed column number where the first day of the month should be displayed
 * @param day
 * @returns {string|number}
 */
const offset = (day) => {
  if (day !== 1) return "auto"
  const monthStartsOn = clock.getMonthStartDay(state.displayedMonth)
  const weekStartsOn = clock.getWeekStartDay()
  let offset
  if (monthStartsOn >= weekStartsOn) {
    offset = monthStartsOn - weekStartsOn
  } else {
    offset = 6 - weekStartsOn + monthStartsOn + 1
  }
  return Math.min(++offset, 7)
}

/**
 * A list of weekday abbreviations based on the preferred first day of the week
 * @returns {*[]}
 */
const orderedDaysOfWeek = () => {
  const arr = [...clock.daysOfWeek()]
  if (props.weekStartDay === "monday") arr.push(arr.shift())
  return arr
}

/**
 * Sets the date being hovered over
 * @param day
 */
const setHoverDate = (day = null) => {
  state.hoverDate = day ? selectedDate(day) : null
}

const randomKey = uuid()
</script>
