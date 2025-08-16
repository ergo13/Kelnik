import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import {useIsScrollAble} from '~/composables/useIsScrollAble'
import type { Flat } from "~/types/Flat";

export const useFlats = defineStore("flats", () => {
  // Состояние
  const flats = ref<Flat[]>([]);
  const visibleCount = ref(5);
  const isLoading = ref(false);
  const filterDisable = ref(false);

  const defaultFilters = reactive({
    roomCount: 2,
    flatPrice: [0, 50_000_000] as [number, number],
    flatSquare: [0, 300] as [number, number],
  });

  const filters = reactive({
    roomCount: 2,
    flatPrice: [0, 50_000_000] as [number, number],
    flatSquare: [0, 300] as [number, number],
  });

  const {isScrollAble} = useIsScrollAble();

  // Действия
  async function fetchFlats() {
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response:{flats:Flat[]} = await $fetch("/flats.json");
      flats.value = response.flats || [];
    } catch (error) {
      console.error("Failed to fetch flats:", error);
    } finally {
      isLoading.value = false;
    }
  }

  function loadMore() {
    visibleCount.value += 20;
  }

  async function filterFlats() {
    await fetchFlats();
    flats.value = flats.value.filter((flat) => {
      return (
        flat.roomCount === filters.roomCount &&
        flat.flatPrice >= filters.flatPrice[0] &&
        flat.flatPrice <= filters.flatPrice[1] &&
        flat.flatSquare >= filters.flatSquare[0] &&
        flat.flatSquare <= filters.flatSquare[1]
      );
    });
  }

  function resetFilters() {
    Object.assign(filters, JSON.parse(JSON.stringify(defaultFilters)));
    visibleCount.value = 5;
    filterFlats();
  }

  // Геттеры
  const visibleFlats = computed(() => flats.value.slice(0, visibleCount.value));

  // Экспорт
  return {
    flats,
    visibleCount,
    isLoading,
    defaultFilters,
    filters,
    filterDisable,
    isScrollAble,
    fetchFlats,
    loadMore,
    filterFlats,
    resetFilters,
    visibleFlats
  };
});
