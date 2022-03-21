<template>
  <div class="fixed block mx-4 my-16 md:my-5" :class="locationClass">
    <transition-group
      enter-active-class="transition-all ease-in-out duration-500"
      leave-active-class="transition-all ease-in-out duration-500"
      enter-from-class="-translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="-translate-x-full opacity-0"
    >
      <v-toast
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
        class="my-2"
        @click:close="removeNotification(notification.id)"
        @expired="removeNotification(notification.id)"
      />
    </transition-group>
  </div>
</template>

<script setup>
import VToast from "@/components/_library/system/VToast.vue"
import { useStore } from "vuex"
import { computed } from "vue"

const props = defineProps({
  location: { type: String, default: "bottom-left" },
})

const store = useStore()
const notifications = computed(() => store.state.notification.notifications)
const locationClass = computed(() => {
  switch (props.location) {
    case "top-right":
      return "top-0 right-0"
    case "top-left":
      return "top-0 left-0"
    case "bottom-right":
      return "bottom-0 right-0"
    default:
      return "bottom-0 left-0"
  }
})

// Methods
const removeNotification = (notificationId) => {
  store.commit("removeNotification", notificationId)
}
</script>
