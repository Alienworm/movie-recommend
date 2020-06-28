<template>
  <div class="home-sider-bar">
    <div class="home-side-bar-logo home-sider-bar-item">
      <span><font-awesome-icon prefix="fax" icon="film"></font-awesome-icon> ZZZWT</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar"
};
</script>

<style lang="scss">
.home-sider-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(60vw * 0.35);
  height: 100%;
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);
  background-color: $background-w;
  transition: all 0.3s;
  z-index: 4;
  .home-sider-bar-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    padding: 10px 20px 10px 20px;
    transition: all 0.3s;
  }
  .home-side-bar-logo {
    display: flex;
    justify-content: left;
    align-items: center;
    span {
      font: bolder 22px Roboto;
      color: $primary;
      transition: all 0.3s;
      svg > path {
        color: $primary;
      }
    }
  }
}
</style>
