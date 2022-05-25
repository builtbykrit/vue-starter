<template>
  <nav
    class="flex items-center justify-between bg-primary-500 shadow px-4 py-2 z-10"
  >
    <router-link :to="{ name: 'HOME' }">
      <span class="text-xl font-bold text-primary-400 drop-shadow"
        >[App Logo]</span
      >
    </router-link>

    <VMenu :items="menuItems" circle-button>
      <template #activator>
        <VAvatar user-name="Test User" />
      </template>
    </VMenu>
  </nav>
</template>

<script setup>
import { useAuthStore } from "@/store/authStore"

const userStore = useAuthStore()
const menuItems = [{ text: "Logout", onClick: () => userStore.logout() }]
</script>
