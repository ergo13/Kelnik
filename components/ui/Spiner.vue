<template>
  <div class="spiner">
    <div class="spiner__element"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.spiner {
  position: fixed;
  background-color: black;
  opacity: 0.3;
  inset: 0;
}

.spiner__element {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  border: 5px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
