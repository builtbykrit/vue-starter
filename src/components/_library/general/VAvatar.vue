<template>
  <div
    class="rounded-full bg-primary-200/75 overflow-hidden flex justify-center items-center"
    :class="sizes[size]"
  >
    <img v-if="!!imageUrl" :src="imageUrl" alt="user" />
    <div v-else class="font-semibold text-primary-800" :class="textSizes[size]">
      {{ initials }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  imageUrl: { type: String, default: undefined },
  userName: { type: String, default: undefined },
  size: { type: String, default: "md" },
})

const sizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
}
const textSizes = {
  xs: "v-paragraph-xs",
  sm: "v-paragraph-sm",
  md: "v-paragraph",
  lg: "v-heading-sm",
}

const initials = computed(() => {
  const name = props.userName
  if (!name) return ""
  const [first, ...rest] = name.split(" ")
  return first[0] + rest.map((word) => word[0]).join("")
})
</script>
