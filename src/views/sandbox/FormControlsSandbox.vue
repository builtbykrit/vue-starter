<template>
  <div>
    <div class="flex justify-between">
      <h2 class="text-xl font-semibold">Form Controls</h2>
      <VSwitch v-model="readonlyInputs" label="Read Only" />
    </div>
    <VDivider class="mb-3" />
    <SandboxRow title="VTextField">
      <VTextField
        v-model="textField"
        label="Text Field"
        :readonly="readonlyInputs"
      />
      <VTextField
        v-model="numberField"
        label="Number Field"
        type="number"
        :step="0.5"
        :readonly="readonlyInputs"
      />
      <VTextField
        v-model="passwordField"
        type="password"
        label="Password Field"
        :readonly="readonlyInputs"
      />
    </SandboxRow>
    <SandboxRow title="VTextarea">
      <VTextarea
        v-model="textarea"
        label="Textarea"
        :readonly="readonlyInputs"
      />
      <VTextarea
        v-model="textarea"
        label="Autogrow Textarea"
        auto-grow
        :readonly="readonlyInputs"
      />
    </SandboxRow>
    <SandboxRow title="VSelect">
      <VSelect
        v-model="selectedItem"
        label="Select"
        placeholder="Select an item"
        :items="selectItems"
        :readonly="readonlyInputs"
        clearable
      />
    </SandboxRow>
    <SandboxRow title="VAutocomplete">
      <VAutocomplete
        v-model="autocompleteItem"
        label="Autocomplete (typeahead)"
        placeholder="Start typing..."
        :items="selectItems"
        :readonly="readonlyInputs"
        clearable
      />
    </SandboxRow>
    <SandboxRow title="VCheckbox">
      <div class="flex items-center gap-2">
        <VCheckbox
          v-model="singleCheckbox"
          :readonly="readonlyInputs"
          label="Checkbox"
        />
        <span class="text-gray-500">value: {{ singleCheckbox }}</span>
      </div>
      <div class="flex items-center gap-2">
        <VCheckbox
          v-for="n in 3"
          :key="n"
          v-model="checkboxGroup"
          :readonly="readonlyInputs"
          :label="`Option ${n}`"
          :value="n"
        />
        <span class="text-gray-500 ml-3">value: {{ checkboxGroup }}</span>
      </div>
    </SandboxRow>
    <SandboxRow title="VRadio">
      <div class="flex items-center gap-2">
        <VRadio
          v-model="singleRadio"
          :readonly="readonlyInputs"
          label="Radio"
        />
        <span class="text-gray-500">value: {{ singleRadio }}</span>
      </div>
      <div class="flex items-center gap-2">
        <VRadio
          v-for="n in 3"
          :key="n"
          v-model="radioMultiple"
          :value="n"
          :readonly="readonlyInputs"
          label="Radio"
        />
        <span class="text-gray-500 ml-3">value: {{ radioMultiple }}</span>
      </div>
    </SandboxRow>
    <SandboxRow title="VRadioGroup">
      <VRadioGroup
        v-model="radioGroup"
        :items="selectItems"
        :readonly="readonlyInputs"
        horizontal
      />
    </SandboxRow>
    <SandboxRow title="VSwitch">
      <VSwitch
        v-model="switchEnabled"
        :readonly="readonlyInputs"
        label="Switch"
      />
    </SandboxRow>
  </div>
</template>

<script setup>
import { ref } from "vue"
import SandboxRow from "@/views/sandbox/SandboxRow.vue"

import VTextField from "@/components/_library/formControls/VTextField.vue"
import VTextarea from "@/components/_library/formControls/VTextarea.vue"
import VSelect from "@/components/_library/formControls/VSelect.vue"
import VAutocomplete from "@/components/_library/formControls/VAutocomplete.vue"
import VCheckbox from "@/components/_library/formControls/VCheckbox.vue"
import VSwitch from "@/components/_library/formControls/VSwitch.vue"
import VDivider from "@/components/_library/VDivider.vue"
import VRadio from "@/components/_library/formControls/VRadio.vue"
import VRadioGroup from "@/components/_library/formControls/VRadioGroup.vue"

const selectItems = [
  { text: "Item 1", value: 1 },
  { text: "Item 2", value: 2 },
  { text: "Item 3", value: 3 },
  { text: "Item 4", value: 4 },
]

const readonlyInputs = ref(false)

const textField = ref("")
const numberField = ref(0)
const passwordField = ref("password")
const textarea = ref(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor accumsan velit ac faucibus. Curabitur luctus, felis eu placerat suscipit, leo magna gravida lectus, non volutpat lacus nibh sed risus. Nulla eget sapien dignissim erat fringilla pretium. Proin aliquam accumsan dolor. Integer feugiat malesuada vehicula. Quisque lacinia vestibulum vehicula. Sed euismod aliquet tellus, nec rutrum velit ultrices at. Nulla ex ipsum, hendrerit sed mauris eget, faucibus malesuada est. Pellentesque vel nisi vel eros tempus feugiat."
)
const selectedItem = ref(undefined)
const autocompleteItem = ref(1)
const singleCheckbox = ref(true)
const checkboxGroup = ref([])
const switchEnabled = ref(false)
const singleRadio = ref(true)
const radioMultiple = ref(1)
const radioGroup = ref(1)
</script>
