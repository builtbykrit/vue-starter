<template>
  <thead>
    <tr class="border-b">
      <slot name="header" :headers="headers">
        <th
          v-for="header in headers"
          :key="header.value"
          :class="[{ 'cursor-pointer': header.sortable }, header.class]"
          class="px-2 py-1"
          @click="header.sortable ? updateSort(header.value) : null"
        >
          <div
            class="flex items-center gap-1 group"
            :class="genAlignClass(header.align)"
          >
            <slot :name="`header.${header.value}`" :header="header">
              {{ header.text }}
            </slot>
            <VIcon
              v-if="header.sortable"
              name="ArrowUp"
              size="sm"
              :class="[
                {
                  'rotate-180':
                    internalOptions.sortBy === header.value &&
                    internalOptions.sortDesc,
                  'text-gray-900': internalOptions.sortBy === header.value,
                  'text-white group-hover:text-gray-400':
                    internalOptions.sortBy !== header.value,
                },
              ]"
            />
          </div>
        </th>
      </slot>
    </tr>
  </thead>
</template>

<script setup>
import { computed } from "vue"
import VIcon from "@/components/_library/general/VIcon.vue"

const props = defineProps({
  headers: { type: Array, default: () => [] },
  options: {
    type: Object,
    default: () => ({
      page: 1,
      itemsPerPage: 10,
      sortBy: null,
      sortDesc: true,
    }),
  },
})
const emit = defineEmits(["update:options"])

const internalOptions = computed({
  get: () => props.options,
  set: (value) => emit("update:options", value),
})

/** Methods */
const genAlignClass = (alignment) => {
  switch (alignment) {
    case "center":
      return "justify-center"
    case "end":
      return "justify-end"
    default:
      return "justify-start"
  }
}
const updateSort = (value) => {
  const { sortBy, sortDesc } = internalOptions.value
  const newSort = { ...internalOptions.value }

  if (sortBy === value && sortDesc) {
    newSort.sortBy = null
  } else if (sortBy === value) {
    newSort.sortDesc = !sortDesc ? !sortDesc : null
  } else {
    newSort.sortBy = value
    newSort.sortDesc = false
  }

  internalOptions.value = newSort
}
</script>
