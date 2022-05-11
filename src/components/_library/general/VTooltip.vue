<template>
  <Popper :placement="position" offset-distance="8" hover arrow>
    <template #default>
      <slot name="activator" />
    </template>
    <template #content>
      <span class="text-[12px] leading-[16px] font-medium">
        <slot name="tooltip">{{ tooltipText }}</slot>
      </span>
    </template>
  </Popper>
</template>

<script setup>
import Popper from "vue3-popper"

const props = defineProps({
  position: { type: String, default: "top" },
  tooltipText: { type: String, default: undefined },
})
</script>
