<template>
  <div class="logo" :style="{height: height}">
    <span :style="{fontSize: fontSize}">
      <font-awesome-icon prefix="fax" icon="film"></font-awesome-icon> ZZZWT
    </span>
  </div>
</template>

<script>
  export default {
    name: "Logo",
    props: {
      fontSize: String,
      height: String
    }
  }
</script>

<style lang="scss">
  .logo {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    padding: 10px 20px 10px 20px;
    overflow: hidden;
    flex-wrap: nowrap;
    cursor: pointer;
    span {
      font: bolder 22px Roboto;
      transition: all 0.3s;
      color: $highlight;
      svg > path {
        color: $highlight;
      }
    }
  }
</style>
