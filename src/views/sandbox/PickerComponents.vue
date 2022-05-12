<template>
  <div>
    <h2 class="v-heading-lg">Picker Components</h2>
    <PaintUnderline class="text-primary-500 mb-6" />

    <SandboxRow title="VDayPicker">
      <VDayPicker v-model="state.dayPicker" class="max-w-[300px] shadow" />
      <VDayPicker
        v-model="state.weekPicker"
        week
        class="max-w-[300px] shadow"
      />
    </SandboxRow>
    <SandboxRow title="VMonthPicker">
      <VMonthPicker v-model="state.monthPicker" class="max-w-[300px] shadow" />
    </SandboxRow>
    <SandboxRow title="VQuarterPicker">
      <VQuarterPicker
        v-model="state.quarterPicker"
        class="max-w-[300px] shadow"
      />
    </SandboxRow>
    <SandboxRow title="VYearPicker">
      <VYearPicker v-model="state.yearPicker" class="max-w-[300px] shadow" />
    </SandboxRow>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import clock from "@/modules/clock"
import PaintUnderline from "@/assets/paint-underline.svg"

import SandboxRow from "@/views/sandbox/SandboxRow.vue"

const state = reactive({
  dayPicker: clock.format(),
  weekPicker: clock.format(),
  monthPicker: clock.format(),
  quarterPicker: clock.format(),
  yearPicker: clock.getYear(),
})
</script>
