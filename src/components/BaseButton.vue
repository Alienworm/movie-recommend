<template>
  <button class="base-button" type="button">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: "BaseButton"
  }
</script>

<style scoped lang="scss">
  .base-button {
    border-radius: 10px;
    background-color: $highlight;
    box-shadow: $card-box-shadow-around;
    font: bold 18px Roboto;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .3s;
    outline: none;
    border: none;
    text-decoration: none;
    &:hover {
      background-color: $highlight-dark;
    }
    svg {
      cursor: pointer;

    }
  }
</style>
