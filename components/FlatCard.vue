<template>
  <div class="flat-card">
    <ul class="flat-card__header">
      <li class="flat-card__item flat-card__item--mobile-hidden">Планировка</li>
      <li class="flat-card__item flat-card__item--mobile-hidden">Квартира</li>
      <li class="flat-card__item">S, м²</li>
      <li class="flat-card__item">Этаж</li>
      <li class="flat-card__item">Цена, ₽</li>
    </ul>

    <ul v-for="flat in flats" :key="flat.id" class="flat-card__row">
      <li class="flat-card__item flat-scheme">
        <img src="/assets/images/image.png" alt="схема квартиры" />
      </li>
      <li class="flat-card__item flat-id">
        {{ flat.roomCount }}-комнатная №{{ flat.id }}
      </li>
      <li class="flat-card__item square">{{ flat.flatSquare }}</li>
      <li class="flat-card__item floor-count">
        {{ flat.flatFloor }}<span class="secondary">&nbsp;из 17</span>
      </li>
      <li class="flat-card__item flat-price">
        {{ useFormatPrice(flat.flatPrice) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Flat } from "~/types/Flat";
import { useFormatPrice } from "~/composables/useFormatPrice";
const props = defineProps<{ flats: Flat[] }>();
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.flat-card {
  display: grid;
}

.flat-card__header,
.flat-card__row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 17px;
}

.flat-card__header {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  font-size: 14px;
}

.flat-card__row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  font-size: 16px;
}

@media (max-width: 1440px) {
  .flat-card__item--mobile-hidden {
    display: none;
  }

  .flat-card__header {
    border: 0;
    font-size: 14px;
  }

  .flat-card__row {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 16px 24px;
    margin-bottom: 4px;
    grid-template-rows: repeat(2, 1fr);

    & .flat-scheme {
      grid-area: 1/5/3/6;
    }

    & .flat-id {
      grid-area: 1/1/2/4;
    }

    & .square {
      grid-area: 2/1/3/2;
    }

    & .floor-count {
      grid-area: 2/2/3/3;
    }

    & .flat-price {
      grid-area: 2/3/3/4;
    }
  }
}
</style>
