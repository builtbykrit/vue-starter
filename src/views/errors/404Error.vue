<template>
  <div class="h-screen flex items-center justify-center gap-12">
    <PuzzleIcon class="h-48 w-48 text-gray-700" />
    <div class="max-w-[596px]">
      <h1 class="font-fancy font-semibold text-8xl tracking-[0.07em]">404</h1>
      <h2 class="font-fancy text-2xl leading-[36px] tracking-[0.07em] mt-6">
        We couldn't find the page that you're looking for.
      </h2>
    </div>
  </div>
</template>

<script setup>
import { PuzzleIcon } from "@heroicons/vue/outline";
</script>
