<template>
  <div class="bg-primary-300 rounded-sm px-2 py-1 group" data-cy="v-toast">
    <div class="flex items-center justify-between">
      <p class="max-w-[235px] mr-2">
        {{ notification.message }}
      </p>
      <div class="flex">
        <button
          class="ml-1"
          aria-label="Close"
          data-cy="v-toast--close"
          @click="$emit('click:close')"
        >
          <VIcon name="X" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"
import VIcon from "@/components/_library/general/VIcon.vue"

const emit = defineEmits(["click:undo", "click:close", "expired"])
const props = defineProps({
  notification: { type: Object, required: true },
})

let timeInterval = ref(undefined)
onMounted(
  () =>
    (timeInterval = setTimeout(
      () => emit("expired"),
      props.notification.duration
    ))
)
onBeforeUnmount(() => clearInterval(timeInterval))
</script>
