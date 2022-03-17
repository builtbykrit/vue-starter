<template>
  <div class="bg-white min-w-[18rem] w-full rounded overflow-hidden py-3 px-5">
    <div
      :class="[
        'flex items-center my-2',
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
        <ChevronLeftIcon />
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
        <ChevronRightIcon />
      </button>
    </div>

    <slot />
  </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid"

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
