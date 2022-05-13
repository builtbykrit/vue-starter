<template>
  <div>
    <h3 class="v-heading-lg">Table Components</h3>
    <PaintUnderline class="text-primary-500 mb-6" />

    <SandboxRow title="VTable">
      <VTable :headers="headers" :items="items">
        <template #item.customFormat="{ item }">
          {{ item.text }} : {{ item.number }} : {{ item.date }}
        </template>
      </VTable>
    </SandboxRow>
  </div>
</template>

<script setup>
import PaintUnderline from "@/assets/paint-underline.svg"
import SandboxRow from "./SandboxRow.vue"

const headers = [
  { text: "Text", value: "text", class: "text-left" },
  { text: "Number", value: "number", class: "text-left" },
  { text: "Date", value: "date", class: "text-left" },
  {
    text: "Custom Format",
    value: "customFormat",
    class: "text-left",
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
]
</script>
