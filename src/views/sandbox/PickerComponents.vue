<template>
  <div>
    <h2 class="text-xl font-semibold">Picker Components</h2>
    <VDivider class="mb-3" />
    <SandboxRow title="VDayPicker">
      <VDayPicker />
      <VDayPicker week />
    </SandboxRow>
    <SandboxRow title="VMonthPicker" />
    <SandboxRow title="VQuarterPicker" />
    <SandboxRow title="VYearPicker" />
  </div>
</template>

<script setup>
import SandboxRow from "@/views/sandbox/SandboxRow.vue"
import VDivider from "@/components/_library/general/VDivider.vue"
import VDayPicker from "@/components/_library/pickers/VDayPicker.vue"
</script>
