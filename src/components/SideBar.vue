<template>
  <div class="side-bar">
    <Logo height="60px" font-size="25px"></Logo>
    <div class="side-bar-container">
      <slot></slot>
    </div>
    <div class="side-bar-image">
      <img :src="sideBarImageUrl" width="100%" alt="side-bar-image"/>
    </div>
  </div>
</template>

<script>
  import Logo from "./Logo";
  export default {
    name: "SideBar",
    props: {
      sideBarImageUrl: String
    },
    components: {Logo}
  }
</script>

<style scoped lang="scss">
  .side-bar {
    box-shadow: $card-box-shadow-right;
    .logo {
      position: absolute;
      top: 0;
      left: 0;
    }
    .side-bar-container {
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
    .side-bar-image {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: auto;
      padding: 10px 20px 10px 20px;
    }
  }
</style>
