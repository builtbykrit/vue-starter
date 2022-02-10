<template>
  <VInputSkin :input-id="internalId" :label="label">
    <template #label>
      <slot name="label" />
    </template>
  </VInputSkin>
</template>

<script>
import VInputSkin from "@/components/_library/formControl/VInputSkin.vue"

export default {
  components: { VInputSkin },
  props: {
    id: { type: String, default: undefined },
    label: { type: String, default: undefined },
  },
  computed: {
    internalId() {
      if (this.id) return this.id
      return uuid()
    },
  },
}
</script>
