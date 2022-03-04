<template>
  <VInputSkin :input-id="internalId" :label="label">
    <template #label>
      <slot name="label" />
    </template>

    <div class="relative">
      <input
        :id="internalId"
        ref="input"
        v-model="internalValue"
        :type="internalType"
        :step="step"
        :readonly="readonly"
        class="w-full rounded py-1"
        :class="{
          'border-transparent focus:border-transparent focus:ring-0 px-0':
            readonly,
          'border-gray-300 px-1.5': !readonly,
        }"
      />

      <div class="absolute inset-y-0 right-0 flex items-center pr-2">
        <button
          v-if="type === 'password'"
          @click="showPassword = !showPassword"
        >
          <EyeOffIcon v-if="showPassword" class="h-5 w-5 text-gray-300" />
          <EyeIcon v-else class="h-5 w-5 text-gray-300" />
        </button>
      </div>
    </div>
  </VInputSkin>
</template>

<script>
import { v4 as uuid } from "uuid"

import VInputSkin from "@/components/_library/formControls/VInputSkin.vue"
import { EyeIcon, EyeOffIcon } from "@heroicons/vue/solid"

export default {
  components: { VInputSkin, EyeIcon, EyeOffIcon },
  props: {
    modelValue: { type: [String, Number], default: "" },
    id: { type: String, default: undefined },
    label: { type: String, default: undefined },
    type: { type: String, default: "text" },
    step: { type: Number, default: 1 },
    readonly: Boolean,
    autofocus: Boolean,
  },
  emits: ["update:modelValue"],
  data: () => ({
    showPassword: false,
  }),
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
    internalType() {
      if (this.type !== "password") return this.type
      return this.showPassword ? "text" : "password"
    },
  },
  mounted() {
    if (this.autofocus) {
      this.$refs.input.focus()
    }
  },
}
</script>
