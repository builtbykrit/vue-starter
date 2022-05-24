<template>
  <div class="v-button-group flex">
    <slot />
  </div>
</template>

<style>
.v-button-group > * {
  border-radius: 0;
  display: block;
}

.v-button-group > *:first-child {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.v-button-group > *:last-child {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
</style>
