<template>
  <div class="w-full overflow-hidden">
    <table
      class="w-full table-auto border-collapse border border rounded-t"
      :class="{ 'rounded-b': hideFooter }"
    >
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
        <template v-for="item in internalItems" :key="item.id">
          <tr class="hover:bg-primary-500/10">
            <slot name="item" :item="item">
              <td
                v-for="header in internalHeaders"
                :key="header.value"
                :class="header.cellClass"
                class="px-2 py-1"
              >
                <button
                  v-if="header.value === 'data-table-expand'"
                  class="rounded"
                >
                  <ChevronDownIcon
                    class="w-6 transition-transform duration-300"
                    :class="{ 'rotate-180': state.expanded.includes(item.id) }"
                    @click="toggleExpand(item.id)"
                  />
                </button>

                <slot v-else :name="`item.${header.value}`" :item="item"
                  >{{ item[header.value] }}
                </slot>
              </td>
            </slot>
          </tr>
          <tr v-if="state.expanded.includes(item.id)" class="bg-gray-100">
            <td :colspan="internalHeaders.length" class="px-2 py-1">
              <slot :name="`item.data-table-expand`" :item="item" />
            </td>
          </tr>
        </template>

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
      v-if="!hideFooter"
      v-model:options="internalOptions"
      :items-length="totalItemCount"
    />
  </div>
</template>

<script setup>
import { computed, reactive, useSlots, watch } from "vue"
import { ChevronDownIcon } from "@heroicons/vue/solid"
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
  hideHeader: Boolean, // Hides the default header
  hideFooter: Boolean, // Hides the default footer
  showExpand: Boolean, // Shows the expand toggle in default rows
  loading: Boolean, // Shows the loading bar
})
const emit = defineEmits(["update:options"])

const state = reactive({
  options: {
    page: 1,
    itemsPerPage: 10,
    sortBy: null,
    sortDesc: true,
  },
  expanded: [],
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
const internalHeaders = computed(() => {
  const internalHeaders = props.headers.map((header) => ({
    ...baseHeader,
    ...header,
  }))

  if (props.showExpand) {
    internalHeaders.push({
      text: null,
      value: "data-table-expand",
      cellClass: "w-8",
    })
  }

  return internalHeaders
})

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

/** Methods */
const toggleExpand = (id) => {
  if (state.expanded.includes(id)) {
    state.expanded = state.expanded.filter((item) => item !== id)
  } else {
    state.expanded.push(id)
  }
}
</script>
