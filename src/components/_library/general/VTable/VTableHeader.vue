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
            :class="`justify-${header.align ?? 'start'}`"
          >
            <slot :name="`header.${header.value}`" :header="header">
              {{ header.text }}
            </slot>
            <ArrowUpIcon
              v-if="header.sortable"
              class="h-4 w-4"
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
import { ArrowUpIcon } from "@heroicons/vue/solid"

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
