<template>
  <div class="container">
    <UiSpiner v-if="flatsStore.isLoading" />
    <main class="main-content">
      <div class="flats-list">
        <h1>Квартиры</h1>
  
        <div v-show="flatsStore.isLoading" style="height: 300px" />
        <div v-show="!flatsStore.isLoading">
          <FlatCard
            :flats="flatsStore.visibleFlats"
          />
        </div>

        <UiBaseButton
          v-if="flatsStore.visibleCount < flatsStore.flats.length"
          class="show-more-button"
          bordered
          title="Показать еще"
          @click="flatsStore.loadMore"
        />
      </div>
      <FlatFilter />
    </main>
    <UiBaseButton v-if="flatsStore.isScrollAble" circle isActive @click="scrollTop" class="scroll-top-button">
      <img src="/assets/images/arrow-up.png" alt="Наверх" />
    </UiBaseButton>
  </div>
</template>

<script setup lang="ts">
import { useFlats } from "~/stores/flats";

const flatsStore = useFlats();
flatsStore.fetchFlats();

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};


</script>

<style lang="scss">
.container {
  max-width: 1440px;
  margin: 0 auto;
}

.main-content {
  display: flex;
  justify-content: center;
  column-gap: 80px;

  .flats-list {
    flex: 1 1 100%;
    max-width: 801px;
  }
}

.scroll-top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.show-more-button {
  margin-top: 34px;
}
</style>
