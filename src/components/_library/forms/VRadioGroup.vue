<template>
  <RadioGroup
    :id="internalId"
    v-model="internalValue"
    :disabled="disabled || readonly"
  >
    <div :class="{ 'flex space-x-2': horizontal, 'space-y-2': !horizontal }">
      <RadioGroupOption
        v-for="item in items"
        :key="item[itemKey]"
        v-slot="{ active, checked }"
        :value="item[itemValue]"
      >
        <slot v-bind="{ item, active, checked }">
          <VCard
            class="cursor-pointer hover:text-primary-500"
            :class="{
              'ring-2 ring-primary-500/25': active,
              'bg-primary-500 text-white hover:text-white': checked,
            }"
          >
            <div class="flex items-center gap-3">
              {{ item[itemText] }}
              <div v-show="checked" class="flex-shrink-0 text-white">
                <CheckCircleIcon class="w-6 h-6" />
              </div>
            </div>
          </VCard>
        </slot>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script setup>
import { computed } from "vue"
import { v4 as uuid } from "uuid"
import { RadioGroup, RadioGroupOption } from "@headlessui/vue"
import { CheckCircleIcon } from "@heroicons/vue/solid"
import VCard from "@/components/_library/general/VCard.vue"

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
const emit = defineEmits(["update:modelValue"])
const internalId = computed(() => (props.id ? props.id : uuid()))
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
})
</script>
