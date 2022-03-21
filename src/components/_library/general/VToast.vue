<template>
  <div
    class="bg-primary-700 text-white rounded px-2 py-3 group"
    data-cy="v-toast"
  >
    <div class="flex items-center justify-between">
      <p class="text-white max-w-[235px] mr-2">
        {{ notification.message }}
      </p>
      <div class="flex">
        <button
          class="ml-1"
          aria-label="Close"
          data-cy="v-toast--close"
          @click="$emit('click:close')"
        >
          <XIcon class="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"
import { XIcon } from "@heroicons/vue/solid"

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
