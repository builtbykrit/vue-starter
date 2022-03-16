<template>
  <Menu as="div" class="inline-block text-left">
    <MenuButton ref="trigger">
      <slot name="activator" />
    </MenuButton>

    <div ref="container">
      <MenuItems
        class="absolute w-56 bg-white divide-y divide-gray-100 rounded shadow-lg z-20 focus:outline-none overflow-hidden"
      >
        <MenuItem
          v-for="(item, index) in items"
          :key="item.name ?? index"
          v-slot="{ active }"
          :disabled="item.disabled"
        >
          <component
            :is="!!item.to ? 'a' : 'button'"
            :href="item.to"
            class="group flex items-center w-full px-2 py-2 text-sm"
            :class="[
              {
                'bg-gray-100': item.disabled,
                'bg-blue-500 text-white': active,
                'text-gray-900': !active,
              },
            ]"
          >
            <slot :name="`item.${item.name ?? index}`" v-bind="{ item, active }"
              >{{ item.text }}
            </slot>
          </component>
        </MenuItem>
      </MenuItems>
    </div>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue"
import { usePopper } from "@/composables/usePopper"

defineProps({
  items: { type: Array, default: () => [] },
})

let [trigger, container] = usePopper({
  placement: "bottom",
  modifiers: [{ name: "offset", options: { offset: [0, 4] } }],
})
</script>

<style scoped></style>
