<template>
  <RadioGroup
    :id="internalId"
    v-model="internalValue"
    :disabled="isDisabled || isReadonly"
  >
    <div :class="{ 'flex space-x-2': horizontal, 'space-y-2': !horizontal }">
      <RadioGroupOption
        v-for="item in internalItems"
        :key="item[itemKey]"
        v-slot="{ checked, active }"
        :value="item[itemValue]"
      >
        <slot v-bind="{ item, checked, active }">
          <VCard
            class="cursor-pointer hover:text-white hover:bg-primary-500/75"
            :class="{
              'bg-primary-500 text-white hover:text-white': checked,
            }"
          >
            <div class="flex items-center gap-3">
              {{ item[itemText] }}
              <div v-show="checked" class="flex-shrink-0 text-white">
                <VIcon name="CheckCircle" />
              </div>
            </div>
          </VCard>
        </slot>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script setup>
import { computed, inject } from "vue"
import { v4 as uuid } from "uuid"
import { RadioGroup, RadioGroupOption } from "@headlessui/vue"

import VCard from "@/components/_library/general/VCard.vue"
import VIcon from "@/components/_library/general/VIcon.vue"

const props = defineProps({
  modelValue: { type: [String, Number], default: undefined },
  id: { type: String, default: undefined },
  label: { type: String, default: undefined },
  items: { type: Array, required: true },
  itemValue: { type: String, default: "value" },
  itemText: { type: String, default: "text" },
  itemKey: { type: String, default: "value" },
  horizontal: Boolean,
  readonly: Boolean,
  disabled: Boolean,
})
const emit = defineEmits(["update:model-value"])

/** Inject form level state */
const formIsDisabled = inject("formIsDisabled", false)
const formIsReadonly = inject("formIsReadonly", false)
const isDisabled = computed(() => props.disabled || formIsDisabled.value)
const isReadonly = computed(() => props.readonly || formIsReadonly.value)

const internalId = computed(() => (props.id ? props.id : uuid()))
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:model-value", value),
})
const internalItems = computed(() => {
  if (typeof props.items[0] === "string") {
    return props.items.map((item) => ({
      [props.itemValue]: item,
      [props.itemText]: item,
    }))
  }
  return props.items
})
</script>
