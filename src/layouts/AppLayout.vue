<template>
  <div class="flex flex-col h-screen">
    <app-navbar />
    <div class="grow flex flex-row relative max-h-full overflow-hidden">
      <app-sidenav />
      <div class="grow overflow-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppNavbar from "@/components/navigation/AppNavbar.vue"
import AppSidenav from "@/components/navigation/AppSidenav.vue"
</script>
