import { ref, onMounted, watchEffect, nextTick, onUpdated } from "vue"
import { createPopper } from "@popperjs/core"

export function usePopper(options) {
  let reference = ref(null)
  let popper = ref(null)
  let popperInstance = ref(null)

  onMounted(async () => {
    await nextTick()
    watchEffect((onInvalidate) => {
      if (!popper.value) return
      if (!reference.value) return

      let popperEl = popper.value.el ?? popper.value.$el ?? popper.value
      let referenceEl =
        reference.value.el ?? reference.value.$el ?? reference.value

      if (!(referenceEl instanceof HTMLElement)) return
      if (!(popperEl instanceof HTMLElement)) return

      popperInstance = createPopper(referenceEl, popperEl, options)
      onInvalidate(() => {
        popperInstance.value?.destroy()
      })
    })
  })

  onUpdated(async () => await popperInstance.value?.update())

  return [reference, popper]
}
