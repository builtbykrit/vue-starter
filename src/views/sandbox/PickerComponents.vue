<template>
  <div>
    <h2 class="v-heading-lg">Picker Components</h2>
    <PaintUnderline class="text-primary-500 mb-6" />

    <SandboxRow title="VDayPicker">
      <VDayPicker v-model="state.dayPicker" />
      <VDayPicker v-model="state.weekPicker" week />
    </SandboxRow>
    <SandboxRow title="VMonthPicker">
      <VMonthPicker v-model="state.monthPicker" />
    </SandboxRow>
    <SandboxRow title="VQuarterPicker">
      <VQuarterPicker v-model="state.quarterPicker" />
    </SandboxRow>
    <SandboxRow title="VYearPicker">
      <VYearPicker v-model="state.yearPicker" />
    </SandboxRow>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import clock from "@/modules/clock"
import PaintUnderline from "@/assets/paint-underline.svg"

import SandboxRow from "@/views/sandbox/SandboxRow.vue"
import VDayPicker from "@/components/_library/forms/pickers/VDayPicker.vue"
import VMonthPicker from "@/components/_library/forms/pickers/VMonthPicker.vue"
import VQuarterPicker from "@/components/_library/forms/pickers/VQuarterPicker.vue"
import VYearPicker from "@/components/_library/forms/pickers/VYearPicker.vue"

const state = reactive({
  dayPicker: clock.format(),
  weekPicker: clock.format(),
  monthPicker: clock.format(),
  quarterPicker: clock.format(),
  yearPicker: clock.getYear(),
})
</script>
