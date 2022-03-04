<template>
  <SwitchGroup as="div" class="flex items-center gap-2">
    <SwitchLabel>
      <VLabel :input-id="internalId">{{ label }}</VLabel>
    </SwitchLabel>
    <Switch
      :id="internalId"
      v-model="internalValue"
      :class="internalValue ? 'bg-blue-600' : 'bg-gray-200'"
      class="relative inline-flex items-center h-6 transition-colors rounded-full w-11 focus:outline-none focus:ring-2 focus:ring-offset-0"
    >
      <span
        :class="internalValue ? 'translate-x-6' : 'translate-x-1'"
        class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full"
      />
    </Switch>
  </SwitchGroup>
</template>

<script>
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue"
import VLabel from "@/components/_library/formControls/VLabel.vue"
import { v4 as uuid } from "uuid"

export default {
  name: "VSwitch",
  components: { SwitchLabel, VLabel, SwitchGroup, Switch },
  props: {
    id: { type: String, default: undefined },
    modelValue: { type: Boolean, required: true },
    label: { type: String, default: undefined },
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
