<template>
  <button
    type="button"
    :disabled="disabled"
    :class="[
      'p-2 font-semibold text-sm w-full uppercase transition-all ease-linear duration-[250] focus:ring-0 focus:bg-primary-100/50',
      {
        rounded: !oneOfSet,
        'first rounded-l': firstOfSet,
        'last rounded-r': lastOfSet,
        'bg-white text-gray-200': disabled,
        'group-hover bg-primary-100 text-gray-900': setIsHovered && !selected,
        'selected bg-primary-500 text-white': selected && !disabled,
        'bg-white text-gray-800 hover:bg-primary-100 hover:text-gray-900':
          !disabled && !selected && !setIsHovered,
        'underline decoration-2 underline-offset-2': current,
      },
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  /**
   * Whether the button is currently disabled
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the button is the last of a selection
   */
  firstOfSet: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the button is the last of a selection
   */
  lastOfSet: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether this is one of multiple buttons that are selectable together
   */
  oneOfSet: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the button is currently selected
   */
  selected: {
    type: Boolean,
    default: false,
  },

  current: Boolean,

  /**
   * Whether another button in the set is being hovered
   */
  setIsHovered: {
    type: Boolean,
    default: false,
  },
})
</script>
