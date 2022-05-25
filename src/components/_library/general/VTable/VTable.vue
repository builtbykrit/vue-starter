<template>
  <div class="w-full">
    <table class="w-full table-auto border-collapse border border rounded-t">
      <VTableHeader
        v-if="!hideHeader"
        v-model:options="internalOptions"
        :headers="internalHeaders"
      >
        <template v-for="(_, name) in headerSlots" #[name]="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </VTableHeader>
      <tbody>
        <tr v-if="loading">
          <td :colspan="internalHeaders.length" class="p-0">
            <VProgress indeterminate flat dense />
          </td>
        </tr>
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
        <tr v-if="internalItems.length === 0">
          <td
            :colspan="internalHeaders.length"
            class="text-center v-paragraph-sm text-gray-500 p-4"
          >
            <span v-if="loading">{{ loadingText }}</span>
            <span v-else>{{ noDataText }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <VTableFooter
      v-model:options="internalOptions"
      :items-length="totalItemCount"
    />
  </div>
</template>

<script setup>
import { computed, reactive, useSlots, watch } from "vue"
import VTableHeader from "@/components/_library/general/VTable/VTableHeader.vue"
import VTableFooter from "@/components/_library/general/VTable/VTableFooter.vue"
import VProgress from "@/components/_library/general/VProgress.vue"

const props = defineProps({
  headers: { type: Array, required: true },
  items: { type: Array, required: true },
  options: {
    type: Object,
    default: () => ({
      page: 1,
      itemsPerPage: 10,
      sortBy: null,
      sortDesc: true,
    }),
  },
  serverItemsLength: { type: Number, default: undefined },
  loadingText: { type: String, default: "Loading... Please Wait" },
  noDataText: { type: String, default: "No Items..." },
  hideHeader: Boolean,
  hideFooter: Boolean,
  loading: Boolean,
})
const emit = defineEmits(["update:options"])

const state = reactive({
  options: {
    page: 1,
    itemsPerPage: 10,
    sortBy: null,
    sortDesc: true,
  },
})
const isServerControlled = computed(() => !!props.serverItemsLength)
const totalItemCount = computed(
  () => props.serverItemsLength ?? props.items.length
)

const slots = useSlots()
const headerSlots = computed(() =>
  Object.fromEntries(
    Object.entries(slots).filter(([key]) => key.startsWith("header"))
  )
)

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

/** Internal Options */
const internalOptions = computed({
  get: () => state.options,
  set: (options) => {
    state.options = options
    emit("update:options", options)
  },
})
watch(
  () => props.options,
  (newValue) => (state.options = newValue)
)

/** Internal Items */
const internalItems = computed(() => {
  const items = [...props.items]

  if (!isServerControlled.value) {
    const { sortBy, sortDesc, page, itemsPerPage } = state.options
    if (!sortBy)
      return items.slice((page - 1) * itemsPerPage, page * itemsPerPage)

    // Sort & Page the items
    return items
      .sort((a, b) => {
        if (typeof a[sortBy] === "string") {
          return sortDesc
            ? b[sortBy].localeCompare(a[sortBy])
            : a[sortBy].localeCompare(b[sortBy])
        } else {
          return sortDesc ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
        }
      })
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
  }

  return items
})
</script>
