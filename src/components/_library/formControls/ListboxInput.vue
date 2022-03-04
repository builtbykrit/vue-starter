<template>
  <div ref="listboxInputRef" class="pointer-events-none relative">
    <input
      v-model="searchText"
      type="text"
      :placeholder="placeholder"
      :readonly="readonly"
      class="pointer-events-auto block w-full rounded py-1 placeholder:text-sm"
      :class="{
        'border-transparent focus:border-transparent focus:ring-0 px-0':
          readonly,
        'border-gray-300 px-1.5': !readonly,
      }"
      @click="openListbox"
      @focus="openListbox"
      @keydown="onKeydown"
    />
  </div>
</template>

<script setup>
import { inject, getCurrentInstance, watch, ref, onMounted } from "vue"

const props = defineProps({
  id: { type: String, required: true },
  selectedText: { type: String, default: undefined },
  placeholder: { type: String, default: undefined },
  readonly: Boolean,
})
const emit = defineEmits(["update:modelValue"])
const symbols = Object.getOwnPropertySymbols(
  getCurrentInstance().parent.provides
)
const listboxSymbol = symbols.find(
  (symbol) => symbol.toString() === "Symbol(ListboxContext)"
)
var api = inject(listboxSymbol)

const searchText = ref(props.selectedText)
const listboxInputRef = ref(null)

// to prevent closing options on 2nd click in input
onMounted(() => {
  api.buttonRef.value = listboxInputRef.value
})

function openListbox() {
  api.openListbox()
}

function onKeydown(event) {
  if (event.key === " ") return
  api.optionsRef.value.dispatchEvent(new event.constructor(event.type, event))
}

watch(searchText, (value) => {
  if (props.selectedText === value) return
  api.clearSearch()
  api.openListbox()
  api.search(value)
})

watch(
  () => props.selectedText,
  (value) => {
    searchText.value = value
  }
)
</script>
