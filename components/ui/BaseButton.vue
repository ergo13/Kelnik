<template>
  <button
    :class="[
      'base-button',
      {
        'base-button--active': isActive,
        'base-button--bordered': bordered,
        'base-button--circle': circle,
      },
    ]"
    :disabled="disabled"
    type="button"
    @click="emit('click')"
  >
    {{ props.title }}
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "click"): void;
}>();

const props = defineProps<{
  title?: string;
  isActive?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  circle?: boolean;
}>();
</script>

<style lang="scss" scoped>
.base-button {
  padding: 10px 12px;
  width: fit-content;
  height: 44px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;

  &:hover,
  &:active,
  &--active {
    background-color: #3eb57c;
    color: white;
  }
}

.base-button--bordered {
  border: 1px solid #3eb57c;
}

.base-button--circle {
  border-radius: 50%;
  width: 44px;
}

.base-button[disabled] {
  pointer-events: none;
  opacity: 0.5;
}
</style>
