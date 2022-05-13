<template>
  <TabGroup :default-index="defaultIndex" :vertical="vertical" as="div">
    <div class="flex justify-between border-b">
      <slot name="prepend-tabs" />
      <TabList>
        <Tab v-for="tab in internalTabs" :key="tab.index" v-slot="{ selected }">
          <button
            class="transition-colors text-primary-500 focus:text-primary-700 px-4 py-2 rounded-t border-b-2"
            :class="[
              selected ? 'bg-primary-100 border-primary-500' : 'border-white',
              tab.disabled ? 'bg-gray-50 text-gray-400' : 'font-semibold',
            ]"
            :disabled="tab.disabled"
          >
            <slot name="tab-title" :tab="tab">
              {{ tab.title }}
            </slot>
          </button>
        </Tab>
      </TabList>
    </div>

    <TabPanels class="mt-4">
      <TabPanel v-for="tab in internalTabs" :key="tab.index">
        <slot :name="`tab.${tab.index}`" :tab="tab">
          <component :is="tab.component" />
        </slot>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import { computed } from "vue"

const props = defineProps({
  tabs: { type: Array, default: () => [] },
  defaultIndex: { type: Number, default: 0 },
  vertical: Boolean,
})
const emit = defineEmits(["update:modelValue", "change"])

const internalTabs = computed(() => {
  return props.tabs.map((tab, index) => {
    if (typeof tab === "string") {
      return {
        index,
        title: tab,
        disabled: false,
      }
    } else {
      return {
        ...tab,
        index,
        disabled: tab.disabled || false,
      }
    }
  })
})
</script>
