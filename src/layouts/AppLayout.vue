<template>
  <div class="flex flex-col min-h-screen">
    <app-navbar />
    <router-view class="grow" />
  </div>
</template>

<script setup>
import AppNavbar from "@/components/navigation/AppNavbar.vue"
</script>
