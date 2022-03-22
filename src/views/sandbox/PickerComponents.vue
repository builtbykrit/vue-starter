<template>
  <div>
    <h2 class="text-xl font-semibold">Picker Components</h2>
    <VDivider class="mb-3" />
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

import SandboxRow from "@/views/sandbox/SandboxRow.vue"
import VDivider from "@/components/_library/general/VDivider.vue"
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
