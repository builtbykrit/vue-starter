<template>
  <div>
    <h3 class="v-heading-lg">Fonts</h3>
    <PaintUnderline class="text-primary-500 mb-6" />

    <SandboxRow title="Heading Font">
      <div class="v-heading-md">Roboto</div>
    </SandboxRow>
    <SandboxRow title="Paragraph Font">
      <div class="v-paragraph">Roboto</div>
    </SandboxRow>
  </div>

  <div>
    <h3 class="v-heading-lg">Colors</h3>
    <PaintUnderline class="text-primary-500 mb-6" />

    <SandboxRow title="Primary">
      <div class="h-16 w-16 bg-primary-900"></div>
      <div class="h-16 w-16 bg-primary-800"></div>
      <div class="h-16 w-16 bg-primary-700"></div>
      <div class="h-16 w-16 bg-primary-600"></div>
      <div class="h-16 w-16 bg-primary-500"></div>
      <div class="h-16 w-16 bg-primary-400"></div>
      <div class="h-16 w-16 bg-primary-300"></div>
      <div class="h-16 w-16 bg-primary-200"></div>
      <div class="h-16 w-16 bg-primary-100"></div>
    </SandboxRow>
    <SandboxRow title="Secondary">
      <div class="h-16 w-16 bg-secondary-900"></div>
      <div class="h-16 w-16 bg-secondary-800"></div>
      <div class="h-16 w-16 bg-secondary-700"></div>
      <div class="h-16 w-16 bg-secondary-600"></div>
      <div class="h-16 w-16 bg-secondary-500"></div>
      <div class="h-16 w-16 bg-secondary-400"></div>
      <div class="h-16 w-16 bg-secondary-300"></div>
      <div class="h-16 w-16 bg-secondary-200"></div>
      <div class="h-16 w-16 bg-secondary-100"></div>
    </SandboxRow>
    <SandboxRow title="Tertiary">
      <div class="h-16 w-16 bg-tertiary-900"></div>
      <div class="h-16 w-16 bg-tertiary-800"></div>
      <div class="h-16 w-16 bg-tertiary-700"></div>
      <div class="h-16 w-16 bg-tertiary-600"></div>
      <div class="h-16 w-16 bg-tertiary-500"></div>
      <div class="h-16 w-16 bg-tertiary-400"></div>
      <div class="h-16 w-16 bg-tertiary-300"></div>
      <div class="h-16 w-16 bg-tertiary-200"></div>
      <div class="h-16 w-16 bg-tertiary-100"></div>
    </SandboxRow>
    <SandboxRow title="Success">
      <div class="h-16 w-16 bg-success-900"></div>
      <div class="h-16 w-16 bg-success-800"></div>
      <div class="h-16 w-16 bg-success-700"></div>
      <div class="h-16 w-16 bg-success-600"></div>
      <div class="h-16 w-16 bg-success-500"></div>
      <div class="h-16 w-16 bg-success-400"></div>
      <div class="h-16 w-16 bg-success-300"></div>
      <div class="h-16 w-16 bg-success-200"></div>
      <div class="h-16 w-16 bg-success-100"></div>
    </SandboxRow>
    <SandboxRow title="Warning">
      <div class="h-16 w-16 bg-warning-900"></div>
      <div class="h-16 w-16 bg-warning-800"></div>
      <div class="h-16 w-16 bg-warning-700"></div>
      <div class="h-16 w-16 bg-warning-600"></div>
      <div class="h-16 w-16 bg-warning-500"></div>
      <div class="h-16 w-16 bg-warning-400"></div>
      <div class="h-16 w-16 bg-warning-300"></div>
      <div class="h-16 w-16 bg-warning-200"></div>
      <div class="h-16 w-16 bg-warning-100"></div>
    </SandboxRow>
    <SandboxRow title="Error">
      <div class="h-16 w-16 bg-error-900"></div>
      <div class="h-16 w-16 bg-error-800"></div>
      <div class="h-16 w-16 bg-error-700"></div>
      <div class="h-16 w-16 bg-error-600"></div>
      <div class="h-16 w-16 bg-error-500"></div>
      <div class="h-16 w-16 bg-error-400"></div>
      <div class="h-16 w-16 bg-error-300"></div>
      <div class="h-16 w-16 bg-error-200"></div>
      <div class="h-16 w-16 bg-error-100"></div>
    </SandboxRow>
    <SandboxRow title="Gray">
      <div class="h-16 w-16 bg-gray-900"></div>
      <div class="h-16 w-16 bg-gray-800"></div>
      <div class="h-16 w-16 bg-gray-700"></div>
      <div class="h-16 w-16 bg-gray-600"></div>
      <div class="h-16 w-16 bg-gray-500"></div>
      <div class="h-16 w-16 bg-gray-400"></div>
      <div class="h-16 w-16 bg-gray-300"></div>
      <div class="h-16 w-16 bg-gray-200"></div>
      <div class="h-16 w-16 bg-gray-100"></div>
    </SandboxRow>
  </div>
</template>

<script setup>
import PaintUnderline from "@/assets/paint-underline.svg"
import SandboxRow from "@/views/sandbox/SandboxRow.vue"
</script>
