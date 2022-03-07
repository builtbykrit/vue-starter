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
            class="cursor-pointer"
            :class="{
              'ring-2 ring-offset-2 ring-offset-blue-500': active,
              'bg-blue-500 bg-opacity-75 text-white': checked,
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

<script>
import { RadioGroup, RadioGroupOption } from "@headlessui/vue"
import { v4 as uuid } from "uuid"
import VCard from "@/components/_library/VCard.vue"
import { CheckCircleIcon } from "@heroicons/vue/solid"

export default {
  name: "VRadioGroup",
  components: { VCard, RadioGroupOption, RadioGroup, CheckCircleIcon },
  props: {
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
  },
  emits: ["update:modelValue"],
  computed: {
    internalId() {
      if (this.id) return this.id
      return uuid()
    },
    internalValue: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit("update:modelValue", val)
      },
    },
  },
}
</script>

<style scoped></style>
