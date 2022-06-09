<template>
  <div class="flex items-center justify-center gap-12 h-full">
    <VIcon name="Fire" size-class="h-48 w-48" class="text-gray-700" />
    <div class="max-w-[596px]">
      <h1 class="font-fancy font-semibold text-8xl tracking-[0.07em]">500</h1>
      <h2 class="font-fancy text-2xl leading-[36px] tracking-[0.07em] mt-6">
        Our application’s web server had trouble communicating with your
        browser.
      </h2>
    </div>
  </div>
</template>

<script setup>
import VIcon from "@/components/_library/general/VIcon.vue"
</script>
