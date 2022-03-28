<template>
  <div data-cy="v-tooltip" class="group">
    <!-- Tooltip -->
    <div
      ref="container"
      class="hidden group-hover:inline-block absolute rounded-sm bg-gray-900 shadow py-0.5 p-2.5 z-10"
    >
      <p class="v-paragraph--lg text-white">
        <slot />
      </p>
    </div>
    <!-- Activator -->
    <div ref="trigger">
      <slot name="activator" />
    </div>
  </div>
</template>

<script setup>
import { usePopper } from "@/composables/usePopper"

const props = defineProps({
  position: { type: String, default: "top" },
})

let [trigger, container] = usePopper({
  placement: props.position,
  modifiers: [{ name: "offset", options: { offset: [0, 4] } }],
})
</script>
