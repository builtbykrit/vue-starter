<template>
  <div>
    <h3 class="v-heading-lg">Table Components</h3>
    <PaintUnderline class="text-primary-500 mb-6" />

    <SandboxRow title="VTable">
      <div class="w-full">
        <VTable :headers="headers" :items="[]" loading />
        <VTable :headers="headers" :items="items" show-expand class="mt-4">
          <template #header.customFormat="{ header }">
            <EmojiHappyIcon class="h-4 w-4" />
            {{ header.text }}
          </template>
          <template #item.customFormat="{ item }">
            {{ item.text }} : {{ item.number }} : {{ item.date }}
          </template>
          <template #item.data-table-expand="{ item }">
            <span class="text-gray-600"
              >Additional details about {{ item.text }}...</span
            >
          </template>
        </VTable>
      </div>
    </SandboxRow>
  </div>
</template>

<script setup>
import PaintUnderline from "@/assets/paint-underline.svg"
import SandboxRow from "./SandboxRow.vue"

import { EmojiHappyIcon } from "@heroicons/vue/outline"
import VTable from "@/components/_library/general/VTable/VTable.vue"

const headers = [
  { text: "Text", value: "text" },
  { text: "Number", value: "number" },
  { text: "Date", value: "date" },
  {
    text: "Custom Format",
    value: "customFormat",
    align: "end",
    cellClass: "text-right",
    sortable: false,
  },
]

const items = [
  {
    id: 1,
    text: "Item 1",
    number: 5,
    date: "2020-01-04",
    customFormat: "Custom Format",
  },
  {
    id: 2,
    text: "Item 2",
    number: 4,
    date: "2020-01-03",
    customFormat: "Custom Format",
  },
  {
    id: 3,
    text: "Item 3",
    number: 3,
    date: "2020-01-05",
    customFormat: "Custom Format",
  },
  {
    id: 4,
    text: "Item 4",
    number: 2,
    date: "2020-01-01",
    customFormat: "Custom Format",
  },
  {
    id: 5,
    text: "Item 5",
    number: 1,
    date: "2020-01-02",
    customFormat: "Custom Format",
  },
  {
    id: 6,
    text: "Item 6",
    number: 6,
    date: "2020-01-04",
    customFormat: "Custom Format",
  },
  {
    id: 7,
    text: "Item 7",
    number: 7,
    date: "2020-01-03",
    customFormat: "Custom Format",
  },
  {
    id: 8,
    text: "Item 8",
    number: 8,
    date: "2020-01-05",
    customFormat: "Custom Format",
  },
  {
    id: 9,
    text: "Item 9",
    number: 9,
    date: "2020-01-01",
    customFormat: "Custom Format",
  },
  {
    id: 10,
    text: "Item 10",
    number: 10,
    date: "2020-01-02",
    customFormat: "Custom Format",
  },
]
</script>
