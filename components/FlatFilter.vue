<template>
  <div class="filter">
    <ul class="filter__buttons-list">
      <li class="filter__buttons-list-item">
        <UiBaseButton
          title="1"
          @click="setRoomCount(1)"
          :isActive="flatsStore.filters.roomCount === 1"
          circle
        />
      </li>
      <li class="filter__buttons-list-item">
        <UiBaseButton
          title="2"
          @click="setRoomCount(2)"
          :isActive="flatsStore.filters.roomCount === 2"
          circle
        />
      </li>
      <li class="filter__buttons-list-item">
        <UiBaseButton
          title="3"
          @click="setRoomCount(3)"
          :isActive="flatsStore.filters.roomCount === 3"
          circle
        />
      </li>
      <li class="filter__buttons-list-item">
        <UiBaseButton
          title="4"
          @click="setRoomCount(4)"
          disabled
          :isActive="flatsStore.filters.roomCount === 4"
          circle
        />
      </li>
    </ul>

    <UiBaseSlider
      v-model="priceSlider"
      :minValue="flatsStore.defaultFilters.flatPrice[0]"
      :maxValue="flatsStore.defaultFilters.flatPrice[1]"
      :minValueView="useFormatPrice(flatsStore.filters.flatPrice[0])"
      :maxValueView="useFormatPrice(flatsStore.filters.flatPrice[1])"
      title="Стоимость квартиры, ₽"
    />

    <UiBaseSlider
      v-model="squareSlider"
      :minValue="flatsStore.defaultFilters.flatSquare[0]"
      :maxValue="flatsStore.defaultFilters.flatSquare[1]"
      :minValueView="useFormatPrice(flatsStore.filters.flatSquare[0])"
      :maxValueView="useFormatPrice(flatsStore.filters.flatSquare[1])"
      title="Площадь, м²"
    />

    <button class="filter__reset-button" @click="flatsStore.resetFilters">
      Сбросить параметры
      <img src="/assets/images/cross.png" alt="Сбросить параметры" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useFlats } from "~/stores/flats";
import { useFormatPrice } from "~/composables/useFormatPrice";
import debounce from "lodash.debounce";

const flatsStore = useFlats();

function setRoomCount(count: number) {
  flatsStore.filters.roomCount = count;
}

const priceSlider = computed({
  get: () => flatsStore.filters.flatPrice,
  set: (val) => (flatsStore.filters.flatPrice = val),
});

const squareSlider = computed({
  get: () => flatsStore.filters.flatSquare,
  set: (val) => (flatsStore.filters.flatSquare = val),
});

watch(
  () => flatsStore.filters,
  debounce(() => {
    flatsStore.filterFlats();
  }, 300),
  { deep: true }
);
</script>

<style lang="scss" scoped>
.filter {
  position: sticky;
  top: 10px;
  flex: 1 1 100%;
  max-width: 399px;
  padding: 40px;
  place-self: flex-start;
  background: linear-gradient(
    135deg,
    rgba(174, 228, 178, 0.3) 0%,
    rgba(149, 208, 161, 0.3) 100%
  );
}

.filter__buttons-list {
  all: unset;
  display: flex;
  list-style: none;
  column-gap: 12px;
}

.filter__reset-button {
  all: unset;
  margin-top: 30px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
  cursor: pointer;

  img {
    width: 8px;
    height: 8px;
  }
}
</style>
