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
        :readonly="readonlyInputs"
      />
      <VTextField
        v-model="passwordField"
        label="Password Field"
        type="password"
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
      />
      <VSelect
        v-model="selectedItem"
        label="Typeahead"
        placeholder="Start typing..."
        :items="selectItems"
        :readonly="readonlyInputs"
        typeahead
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
          v-model="checkboxGroup"
          :readonly="readonlyInputs"
          label="Option 1"
          :value="1"
        />
        <VCheckbox
          v-model="checkboxGroup"
          :readonly="readonlyInputs"
          label="Option 2"
          :value="2"
        />
        <VCheckbox
          v-model="checkboxGroup"
          :readonly="readonlyInputs"
          label="Option 3"
          :value="3"
        />
        <span class="text-gray-500 ml-3">value: {{ checkboxGroup }}</span>
      </div>
    </SandboxRow>
    <SandboxRow title="VSwitch">
      <VSwitch
        v-model="switchEnabled"
        :readonly="readonlyInputs"
        label="Switch"
      />
    </SandboxRow>
    <SandboxRow title="VRadio"></SandboxRow>
  </div>
</template>

<script setup>
import { ref } from "vue"
import SandboxRow from "@/views/sandbox/SandboxRow.vue"

import VTextField from "@/components/_library/formControls/VTextField.vue"
import VTextarea from "@/components/_library/formControls/VTextarea.vue"
import VSelect from "@/components/_library/formControls/VSelect.vue"
import VCheckbox from "@/components/_library/formControls/VCheckbox.vue"
import VSwitch from "@/components/_library/formControls/VSwitch.vue"
import VDivider from "@/components/_library/VDivider.vue"

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
const textarea = ref("")
const selectedItem = ref(undefined)
const singleCheckbox = ref(true)
const checkboxGroup = ref([])
const switchEnabled = ref(false)
</script>
