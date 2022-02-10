<template>
  <SandboxRow title="VTextField">
    <VTextField v-model="textField" label="Text Field" />
    <VTextField v-model="numberField" label="Number Field" type="number" />
    <VTextField
      v-model="passwordField"
      label="Password Field"
      type="password"
    />
  </SandboxRow>
  <SandboxRow title="VTextarea">
    <VTextarea v-model="textarea" label="Textarea" />
    <VTextarea v-model="textarea" label="Autogrow Textarea" auto-grow />
  </SandboxRow>
  <SandboxRow title="VSelect">
    <VSelect v-model="selectedItem" label="Select" :items="selectItems" />
  </SandboxRow>
  <SandboxRow title="VCheckbox"></SandboxRow>
  <SandboxRow title="VRadio"></SandboxRow>
  <SandboxRow title="VSwitch"></SandboxRow>
</template>

<script setup>
import { ref } from "vue"
import SandboxRow from "@/views/sandbox/SandboxRow.vue"

import VTextField from "@/components/_library/formControl/VTextField.vue"
import VTextarea from "@/components/_library/formControl/VTextarea.vue"
import VSelect from "@/components/_library/formControl/VSelect.vue"

const selectItems = []

const textField = ref("")
const numberField = ref(0)
const passwordField = ref("password")
const textarea = ref("")
const selectedItem = ref(0)
</script>
