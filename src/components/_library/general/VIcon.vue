<template>
  <component :is="iconComponent" v-if="!isLoading" :class="sizeClass" />
</template>

<script setup>
import { computed, defineAsyncComponent, onMounted, ref } from "vue"
import * as heroIcons from "@heroicons/vue/solid"

const props = defineProps({
  name: { type: String, required: true },
  sizeClass: { type: [String, Object], default: "h-5 w-5" },
  internal: Boolean,
})
const isLoading = ref(true)

const iconComponent = computed(() =>
  !props.internal
    ? heroIcons[`${props.name}Icon`]
    : defineAsyncComponent(() =>
        import(`./../../../assets/icons/${props.icon}.svg`)
      )
)

onMounted(() => (isLoading.value = false))
</script>
