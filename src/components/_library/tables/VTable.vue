<template>
  <table class="w-full table-auto border-collapse border rounded">
    <thead>
      <tr class="border-b-2">
        <slot name="header" :headers="internalHeaders">
          <th
            v-for="header in internalHeaders"
            :key="header.value"
            :class="[{ 'cursor-pointer': header.sortable }, header.class]"
            class="px-2 py-1"
            @click="header.sortable ? updateSort(header.value) : null"
          >
            <div class="flex items-center gap-1 group">
              <slot :name="`header.${header.value}`" :header="header">
                {{ header.text }}
              </slot>
              <ArrowUpIcon
                v-if="header.sortable"
                class="h-4 w-4"
                :class="[
                  {
                    'rotate-180':
                      state.sortBy === header.value && state.sortDesc,
                    'text-gray-900': state.sortBy === header.value,
                    'text-white group-hover:text-gray-400':
                      state.sortBy !== header.value,
                  },
                ]"
              />
            </div>
          </th>
        </slot>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in internalItems"
        :key="item.id"
        class="hover:bg-gray-100"
      >
        <slot name="item" :item="item">
          <td
            v-for="header in internalHeaders"
            :key="header.value"
            :class="header.cellClass"
            class="px-2 py-1"
          >
            <slot :name="`item.${header.value}`" :item="item"
              >{{ item[header.value] }}
            </slot>
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed, reactive } from "vue"
import { ArrowUpIcon } from "@heroicons/vue/solid"

const props = defineProps({
  headers: { type: Array, required: true },
  items: { type: Array, required: true },
})
const state = reactive({
  sortBy: null,
  sortDesc: false,
})

/** Internal Header normalization */
const baseHeader = {
  text: undefined, // Text that is displayed in the header
  value: undefined, // Item Value that it corresponds to
  sortable: true, // Can the table be sorted by this column
  class: undefined, // Class to be applied to the header
  cellClass: undefined, // Class to be applied to the cell
}
const internalHeaders = computed(() =>
  props.headers.map((header) => ({ ...baseHeader, ...header }))
)

/** Internal Items */
const internalItems = computed(() => {
  const sortBy = state.sortBy
  const sortDesc = state.sortDesc
  const items = [...props.items]

  if (!sortBy) return items

  return items.sort((a, b) => {
    if (typeof a[sortBy] === "string") {
      return sortDesc
        ? b[sortBy].localeCompare(a[sortBy])
        : a[sortBy].localeCompare(b[sortBy])
    } else {
      return sortDesc ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
    }
  })
})

/** Methods */
const updateSort = (value) => {
  if (state.sortBy === value && state.sortDesc) {
    state.sortBy = null
  } else if (state.sortBy === value) {
    state.sortDesc = !state.sortDesc ? !state.sortDesc : null
  } else {
    state.sortBy = value
    state.sortDesc = false
  }
}
</script>
