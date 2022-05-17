<template>
  <nav
    class="flex items-center justify-between bg-primary-500 shadow px-4 py-2"
    :class="{ 'fixed w-full': fixed }"
  >
    <router-link :to="{ name: 'HOME' }">
      <span class="text-xl font-bold">[App Logo]</span>
    </router-link>

    <VMenu :items="menuItems">
      <template #activator>
        <VAvatar user-name="Test User" />
      </template>
    </VMenu>
  </nav>
</template>

<script setup>
import { useAuthStore } from "@/store/authStore"

const props = defineProps({
  fixed: { type: Boolean, default: false },
})

const userStore = useAuthStore()
const menuItems = [{ text: "Logout", onClick: () => userStore.logout() }]
</script>
