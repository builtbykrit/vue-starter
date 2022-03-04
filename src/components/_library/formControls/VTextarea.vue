<template>
  <VInputSkin :input-id="internalId" :label="label">
    <template #label>
      <slot name="label" />
    </template>

    <textarea
      :id="internalId"
      ref="textarea"
      v-model="internalValue"
      :rows="rows"
      :readonly="readonly"
      class="w-full rounded py-1 min-h-[34px] resize-none"
      :class="{
        'border-transparent focus:border-transparent focus:ring-0 px-0':
          readonly,
        'border-gray-300 px-1.5': !readonly,
        'hover:resize-y': !autoGrow && !readonly,
      }"
    />
  </VInputSkin>
</template>

<script>
import { v4 as uuid } from "uuid"
import VInputSkin from "@/components/_library/formControls/VInputSkin.vue"

export default {
  name: "VTextarea",
  components: { VInputSkin },
  props: {
    modelValue: { type: String, default: "" },
    id: { type: String, default: undefined },
    label: { type: String, default: undefined },
    rows: { type: Number, default: 2 },
    autoGrow: Boolean,
    autoFocus: Boolean,
    readonly: Boolean,
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
  watch: {
    internalValue(val) {
      if (this.autoGrow) {
        this.resizeTextarea(val)
      }
    },
  },
  mounted() {
    if (this.autoGrow) {
      this.resizeTextarea(this.internalValue)
    }
    if (this.autofocus) {
      this.$refs.textarea.focus()
    }
  },
  methods: {
    resizeTextarea(val = "") {
      const textarea = this.$refs.textarea

      if (val.length === 0) {
        textarea.rows = this.rows
        return
      }

      textarea.rows = this.rows

      const styles = window.getComputedStyle(textarea)
      const paddingTop = parseInt(styles.paddingTop)
      const paddingBottom = parseInt(styles.paddingBottom)
      const padding = paddingTop + paddingBottom
      const height = !!styles.height ? styles.height : padding * 2
      const initialHeight = (parseInt(height) - padding) / textarea.rows
      let scrollHeight = textarea.scrollHeight - padding
      textarea.rows = Math.ceil(scrollHeight / initialHeight) ?? this.rows
    },
  },
}
</script>
