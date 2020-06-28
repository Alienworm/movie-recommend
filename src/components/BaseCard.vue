<template>
  <div class="base-card">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "BaseCard"
  }
</script>

<style scoped lang="scss">
  .base-card {
    background-color: $card-background;
    box-shadow: $card-box-shadow-around;
    border-radius: 10px;
    .base-card-title {
      position: absolute;
      top: 0;
      left: 0;
      width: calc(100% - 40px);
      height: 40px;
      padding: 10px 20px 0 20px;
      display: flex;
      justify-content: right;
      align-items: center;
      font: bold 20px Roboto;
    }
    .base-card-button {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 40px;
      border-radius: 0 10px 0 40px;
      z-index: 2;
    }
  }
</style>
