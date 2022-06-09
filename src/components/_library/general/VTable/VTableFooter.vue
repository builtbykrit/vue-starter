<template>
  <div class="w-full flex items-center border border-t-0 rounded-b px-2 py-1">
    <div class="grow"></div>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <span class="v-paragraph-xs">Rows per page:</span>
        <VSelect
          :model-value="internalOptions.itemsPerPage"
          :items="pagingOptions"
          class="w-12"
          dense
          @update:model-value="updatePerPage"
        />
      </div>
      <div class="v-paragraph-xs">
        <span v-if="pagination.pageStart > 0">{{ pagination.pageStart }}</span>
        -
        <span v-if="pagination.pageStop > 0">{{ pagination.pageStop }}</span>
        <span v-if="pagination.totalItems > 0">
          of {{ pagination.totalItems }}</span
        >
      </div>
      <div class="flex items-center gap-2">
        <button
          :disabled="!hasPreviousPage"
          class="rounded text-gray-900 disabled:text-gray-400"
          @click="updatePage(pagination.page - 1)"
        >
          <VIcon name="ChevronLeft" />
        </button>
        <button
          :disabled="!hasNextPage"
          class="rounded text-gray-900 disabled:text-gray-400"
          @click="updatePage(pagination.page + 1)"
        >
          <VIcon name="ChevronRight" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import VIcon from "@/components/_library/general/VIcon.vue"
import VSelect from "@/components/_library/forms/VSelect.vue"

const props = defineProps({
  options: {
    type: Object,
    default: () => ({
      page: 1,
      itemsPerPage: 10,
      sortBy: null,
      sortDesc: true,
    }),
  },
  pagingOptions: {
    type: Array,
    default: () => [
      { text: "5", value: 5 },
      { text: "10", value: 10 },
      { text: "15", value: 15 },
      { text: "All", value: -1 },
    ],
  },
  itemsLength: { type: Number, required: true },
})
const emit = defineEmits(["update:options"])

/** Internal Options */
const internalOptions = computed({
  get: () => props.options,
  set: (value) => emit("update:options", value),
})

/** Internal Pagination */
const pagination = computed(() => {
  const { page, itemsPerPage } = internalOptions.value
  const internalItemsPerPage =
    itemsPerPage === -1 ? props.itemsLength : itemsPerPage
  const totalItems = props.itemsLength
  const pageStart = (page - 1) * internalItemsPerPage
  const pageStop = Math.min(pageStart + internalItemsPerPage, totalItems)
  const totalPages = Math.ceil(totalItems / internalItemsPerPage)

  return {
    page,
    itemsPerPage,
    pageStart: totalItems > 0 ? pageStart + 1 : 0,
    pageStop,
    totalPages,
    totalItems,
  }
})
const hasPreviousPage = computed(() => pagination.value.page > 1)
const hasNextPage = computed(
  () => pagination.value.page < pagination.value.totalPages
)

/** Methods */
const updatePerPage = (perPage) => {
  internalOptions.value = { ...internalOptions.value, itemsPerPage: perPage }
}
const updatePage = (page) => {
  internalOptions.value = { ...internalOptions.value, page }
}
</script>
