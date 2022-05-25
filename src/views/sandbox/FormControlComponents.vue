<template>
  <div>
    <div class="flex justify-between flex-wrap mb-6">
      <div>
        <h2 class="v-heading-lg">Form Control Components</h2>
        <PaintUnderline class="text-primary-500" />
      </div>
      <div class="flex items-center gap-4">
        <VSwitch v-model="readonlyInputs" label="Read Only" />
        <VButtonGroup>
          <VButton dense @click="validate">Validate</VButton>
          <VButton variant="outline" dense @click="resetValidation"
            >Reset
          </VButton>
        </VButtonGroup>
      </div>
    </div>

    <SandboxRow title="VTextField">
      <VTextField
        v-model="form.textField"
        label="Text Field"
        :readonly="readonlyInputs"
        :validation="v$.textField"
      />
      <VTextField
        v-model="form.numberField"
        label="Number Field"
        type="number"
        :step="0.5"
        :readonly="readonlyInputs"
        :validation="v$.numberField"
      />
      <VTextField
        v-model="form.passwordField"
        type="password"
        label="Password Field"
        :readonly="readonlyInputs"
        :validation="v$.passwordField"
      />
    </SandboxRow>
    <SandboxRow title="VTextarea">
      <VTextarea
        v-model="form.textarea"
        label="Textarea"
        :readonly="readonlyInputs"
        :validation="v$.textarea"
      />
      <VTextarea
        v-model="form.textarea"
        label="Autogrow Textarea"
        auto-grow
        :readonly="readonlyInputs"
        :validation="v$.textarea"
      />
    </SandboxRow>
    <SandboxRow title="VSelect">
      <VSelect
        v-model="form.selectedItem"
        label="Select"
        placeholder="Select an item"
        :items="selectItems"
        :readonly="readonlyInputs"
        :validation="v$.selectedItem"
        clearable
      />
    </SandboxRow>
    <SandboxRow title="VAutocomplete">
      <VAutocomplete
        v-model="form.autocompleteItem"
        label="Autocomplete (typeahead)"
        placeholder="Start typing..."
        :items="selectItems"
        :readonly="readonlyInputs"
        :validation="v$.autocompleteItem"
        clearable
      />
    </SandboxRow>
    <SandboxRow title="VDateField">
      <VDateField
        id="test"
        v-model="form.dateField"
        label="Date Field"
        :readonly="readonlyInputs"
        :validation="v$.dateField"
        clearable
      />
    </SandboxRow>
    <SandboxRow title="VTimeField">
      <VTimeField
        v-model="form.timeField"
        label="Time Field"
        :readonly="readonlyInputs"
        :validation="v$.timeField"
      />
      <VTimeField
        v-model="form.timeField"
        label="Time Field (24h)"
        display-format="HH:mm"
        :readonly="readonlyInputs"
        :validation="v$.timeField"
      />
    </SandboxRow>
    <SandboxRow title="VOtpField">
      <VOtpField
        v-model="form.otpField"
        label="One Time Password Field"
        :readonly="readonlyInputs"
        :validation="v$.otpField"
        @completed="alertComplete"
      />
    </SandboxRow>
    <SandboxRow title="VCheckbox">
      <div class="flex items-center gap-2">
        <VCheckbox
          v-model="form.singleCheckbox"
          :readonly="readonlyInputs"
          label="Checkbox"
        />
        <span class="text-gray-500">value: {{ form.singleCheckbox }}</span>
      </div>
      <div class="flex items-center gap-2">
        <VCheckbox
          v-for="n in 3"
          :key="n"
          v-model="form.checkboxGroup"
          :readonly="readonlyInputs"
          :label="`Option ${n}`"
          :value="n"
        />
        <span class="text-gray-500 ml-3">value: {{ form.checkboxGroup }}</span>
      </div>
    </SandboxRow>
    <SandboxRow title="VRadio">
      <div class="flex items-center gap-2">
        <VRadio
          v-model="form.singleRadio"
          :readonly="readonlyInputs"
          label="Radio"
        />
        <span class="text-gray-500">value: {{ form.singleRadio }}</span>
      </div>
      <div class="flex items-center gap-2">
        <VRadio
          v-for="n in 3"
          :key="n"
          v-model="form.radioMultiple"
          :value="n"
          :readonly="readonlyInputs"
          :label="`Option ${n}`"
        />
        <span class="text-gray-500 ml-3">value: {{ form.radioMultiple }}</span>
      </div>
    </SandboxRow>
    <SandboxRow title="VRadioGroup">
      <VRadioGroup
        v-model="form.radioGroup"
        :items="selectItems"
        :readonly="readonlyInputs"
        horizontal
      />
    </SandboxRow>
    <SandboxRow title="VSwitch">
      <VSwitch
        v-model="form.switchEnabled"
        :readonly="readonlyInputs"
        label="Switch"
      />
    </SandboxRow>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue"
import { minLength, required } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import PaintUnderline from "@/assets/paint-underline.svg"
import SandboxRow from "@/views/sandbox/SandboxRow.vue"

/** Components */
import VTextField from "@/components/_library/forms/VTextField.vue"
import VTextarea from "@/components/_library/forms/VTextarea.vue"
import VSelect from "@/components/_library/forms/VSelect.vue"
import VAutocomplete from "@/components/_library/forms/VAutocomplete.vue"
import VDateField from "@/components/_library/forms/VDateField.vue"
import VTimeField from "@/components/_library/forms/VTimeField.vue"
import VCheckbox from "@/components/_library/forms/VCheckbox.vue"
import VRadio from "@/components/_library/forms/VRadio.vue"
import VRadioGroup from "@/components/_library/forms/VRadioGroup.vue"
import VSwitch from "@/components/_library/forms/VSwitch.vue"

import VButton from "@/components/_library/general/buttons/VButton.vue"
import VButtonGroup from "@/components/_library/general/buttons/VButtonGroup.vue"

const selectItems = [
  { text: "Item 1", value: 1 },
  { text: "Item 2", value: 2 },
  { text: "Item 3", value: 3 },
  { text: "Item 4", value: 4 },
]

const readonlyInputs = ref(false)
const form = reactive({
  textField: "",
  numberField: 0,
  passwordField: "password",
  timeField: undefined,
  dateField: undefined,
  otpField: undefined,
  textarea:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor accumsan velit ac faucibus. Curabitur luctus, felis eu placerat suscipit, leo magna gravida lectus, non volutpat lacus nibh sed risus. Nulla eget sapien dignissim erat fringilla pretium. Proin aliquam accumsan dolor. Integer feugiat malesuada vehicula. Quisque lacinia vestibulum vehicula. Sed euismod aliquet tellus, nec rutrum velit ultrices at. Nulla ex ipsum, hendrerit sed mauris eget, faucibus malesuada est. Pellentesque vel nisi vel eros tempus feugiat.",
  selectedItem: undefined,
  autocompleteItem: 1,
  singleCheckbox: true,
  checkboxGroup: [],
  switchEnabled: false,
  singleRadio: true,
  radioMultiple: 1,
  radioGroup: 1,
})

const rules = computed(() => ({
  textField: { required },
  numberField: { required },
  passwordField: { required },
  timeField: { required },
  dateField: { required },
  otpField: { required, minLength: minLength(6) },
  textarea: { required },
  selectedItem: { required },
  autocompleteItem: { required },
}))

const v$ = useVuelidate(rules, form, {
  $autoDirty: true,
})

const validate = () => {
  v$.value.$validate()
}
const resetValidation = () => {
  v$.value.$reset()
}

const alertComplete = () => {
  alert("OTP Complete!")
}
</script>
