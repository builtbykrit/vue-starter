<template>
  <Menu as="div" :class="{ 'w-full': !!$slots.default }">
    <MenuButton ref="trigger" :class="{ 'w-full': !!$slots.default }">
      <slot name="activator" />
    </MenuButton>

    <div ref="container" class="absolute bg-white z-20">
      <MenuItems
        class="rounded shadow-lg z-20 focus:outline-none overflow-hidden"
      >
        <slot name="default">
          <MenuItem
            v-for="(item, index) in items"
            :key="item.name ?? index"
            v-slot="{ active }"
            :disabled="item.disabled"
            class="w-56"
          >
            <component
              :is="!!item.to ? 'a' : 'button'"
              :href="item.to"
              class="group flex items-center text-primary-500 w-full px-2 py-2 text-sm"
              :class="[
                {
                  'bg-gray-100': item.disabled,
                  'bg-primary-100': active,
                },
              ]"
            >
              <slot
                :name="`item.${item.name ?? index}`"
                v-bind="{ item, active }"
                >{{ item.text }}
              </slot>
            </component>
          </MenuItem>
        </slot>
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
