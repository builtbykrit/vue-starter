<template>
  <div class="bg-white min-w-[18rem] w-full rounded overflow-hidden py-3 px-5">
    <div
      class="flex items-center m-2"
      :class="[
        props.canGoBack || props.canGoForward
          ? 'justify-between'
          : 'justify-center',
      ]"
    >
      <button
        v-if="props.canGoBack"
        type="button"
        data-cy="picker-btn-prev"
        @click="$emit('picker:goBack')"
      >
        <VIcon name="ChevronLeft" />
      </button>

      <transition
        enter-active-class="transition-opacity ease-in-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-in-out duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <h3 :key="props.titleText">{{ props.titleText }}</h3>
      </transition>

      <button
        v-if="props.canGoForward"
        type="button"
        data-cy="picker-btn-next"
        @click="$emit('picker:goForward')"
      >
        <VIcon name="ChevronRight" />
      </button>
    </div>

    <transition
      enter-active-class="transition-all ease-in-out duration-150"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-all ease-in-out duration-150"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="-translate-x-full opacity-0"
      mode="out-in"
    >
      <slot />
    </transition>
  </div>
</template>

<script setup>
import VIcon from "@/components/_library/general/VIcon.vue"

const emit = defineEmits(["picker:goBack", "picker:goForward"])
const props = defineProps({
  canGoBack: {
    type: Boolean,
    default: false,
  },
  canGoForward: {
    type: Boolean,
    default: false,
  },
  titleText: {
    type: String,
    required: true,
  },
})
</script>
