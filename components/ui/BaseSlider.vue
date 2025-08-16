<template>
  <div>
    <p>{{ title }}</p>
    <p>
      <span>
        От <b>{{ minValueView }}</b>
      </span>
      <span>
        До <b>{{ maxValueView }}</b>
      </span>
    </p>

    <VueSlider
      v-model="modelValueLocal"
      :min="props.minValue"
      :max="props.maxValue"
      :railStyle="railStyle"
      :processStyle="processStyle"
      tooltip="none"
    />
  </div>
</template>

<script setup lang="ts">
import VueSlider from "vue-3-slider-component";

const railStyle = {
    opacity: 0.5
}

const processStyle = {
    background: 'rgba(62, 181, 124, 1)'
}

const props = defineProps<{
  minValue: number;
  maxValue: number;
  minValueView: string | number;
  maxValueView: string | number;
  modelValue: number[];
  title: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number[]): void;
}>();

const modelValueLocal = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>
