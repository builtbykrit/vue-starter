<template>
  <div class="lg:grid grid-cols-7 my-4 lg:my-2">
    <div v-if="title" class="v-paragraph font-semibold text-gray-800">
      {{ title }}
    </div>
    <div class="col-span-6 flex flex-wrap lg:flex-nowrap items-center gap-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: undefined },
})
</script>
