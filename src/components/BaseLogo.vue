<template>
  <div class="base-logo" :style="{height: height, width: width}">
    <div :style="{fontSize: fontSize}">
      ZZZWT<span>Hub</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BaseLogo",
    props: {
      fontSize: String,
      height: String,
      width: String
    }
  }
</script>

<style lang="scss">
  .base-logo {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    padding: 10px 20px 10px 20px;
    overflow: hidden;
    flex-wrap: nowrap;
    cursor: pointer;
    div {
      font: bolder 18px Roboto;
      transition: all 0.3s;
      span {
        background-color: #ee2b47;
        padding: 0 5px 0 5px;
        border-radius: 5px;
      }
    }
  }
</style>
