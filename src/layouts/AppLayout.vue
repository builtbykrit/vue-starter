<template>
  <div class="flex flex-col min-h-screen">
    <app-navbar />

    <div class="relative flex flex-row">
      <app-sidenav />
      <router-view class="grow" />
    </div>
  </div>
</template>

<script setup>
import AppNavbar from "@/components/navigation/AppNavbar.vue"
import AppSidenav from "@/components/navigation/AppSidenav.vue"
</script>
