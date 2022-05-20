<template>
  <Menu as="div">
    <MenuButton ref="trigger" :class="{ 'rounded-full': circleButton }">
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
              @click="
                !!item.onClick ? item.onClick() : $emit('item-clicked', item)
              "
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

const props = defineProps({
  position: { type: String, default: "bottom-end" },
  items: { type: Array, default: () => [] },
  circleButton: { type: Boolean, default: false },
})
defineEmits(["item-clicked"])

let [trigger, container] = usePopper({
  placement: props.position,
  modifiers: [{ name: "offset", options: { offset: [0, 4] } }],
})
</script>
