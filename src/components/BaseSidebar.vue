<template>
  <div class="base-sidebar">
    <BaseLogo font-size="22px" height="60px" width="100%"></BaseLogo>
    <div class="base-sidebar-container">
      <slot></slot>
    </div>
    <div class="base-sidebar-image">
      <img :src="baseSidebarImageUrl" width="100%" alt="side-bar-image"/>
    </div>
  </div>
</template>

<script>
  import BaseLogo from "./BaseLogo";
  export default {
    name: "BaseSidebar",
    components: {BaseLogo},
    props: {
      baseSidebarImageUrl: String
    }
  }
</script>

<style scoped lang="scss">
  .base-sidebar {
    background-color: $card-background;
    box-shadow: $card-box-shadow-right;
    .base-logo {
      position: absolute;
      top: 0;
      left: 0;
    }
    .base-sidebar-container {
      position: absolute;
      top: 60px;
      width: 100%;
      height: auto;
      display: flex;
      justify-content: left;
      flex-direction: column;
      padding: 10px 20px 10px 20px;
      span {
        font: bolder 40px Roboto;
        color: $highlight;
      }
      p {
        font: 16px Roboto;
        color: $card-sub-text;
      }
      i {
        width: 100%;
        height: 40px;
        margin-bottom: 20px;
        transition: all 0.3s;
        font: bold 18px Roboto;
        line-height: 40px;
        cursor: pointer;
        &:hover {
          color: $highlight;
          svg > path {
            color: $highlight;
          }
        }
      }
      .i-selected {
        padding-left: 10px;
        border-left: 10px $highlight solid;
        color: $highlight;
        svg > path {
          color: $highlight;
        }
      }
    }
    .base-sidebar-image {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: auto;
      padding: 10px 20px 10px 20px;
    }
  }
</style>
