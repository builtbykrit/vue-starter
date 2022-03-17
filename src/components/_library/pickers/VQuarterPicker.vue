<template>
  <v-date-picker-skin title-text="Select a Quarter">
    <ul class="grid grid-cols-2 w-full justify-center">
      <li v-for="quarter in quarters" :key="quarter.value">
        <v-picker-button
          :selected="isSelectedQuarter(quarter.value)"
          @click="handleSelection(quarter.value)"
        >
          {{ quarter.text }}
        </v-picker-button>
      </li>
    </ul>
  </v-date-picker-skin>
</template>

<script setup>
import VDatePickerSkin from "@/components/_library/pickers/VDatePickerSkin.vue"
import VPickerButton from "@/components/_library/pickers/VPickerButton.vue"

const quarters = [
  { text: "Q1 Jan - Mar", value: 1 },
  { text: "Q2 Apr - Jun", value: 2 },
  { text: "Q3 Jul - Sep", value: 3 },
  { text: "Q4 Oct - Nov", value: 4 },
]

const props = defineProps({
  modelValue: {
    type: Number,
    validator: (val) => (val >= 1) & (val <= 4),
    required: true,
  },
})
const emit = defineEmits(["update:modelValue"])

const isSelectedQuarter = (quarter) => props.modelValue === quarter

const handleSelection = (quarter) => {
  emit("update:modelValue", quarter)
}
</script>
