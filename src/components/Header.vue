<template>
  <div class="header">
    <div class="sider-bar-button">
      <font-awesome-icon prefix="fas" icon="bars" @click="sideBarSwitch()"></font-awesome-icon>
    </div>
    <div class="header-user-avatar base-button">
      <img src="../assets/images/alien.png" width="80%" alt="alien" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    sideBarSwitch() {
      let sideBarDiv = document.getElementsByClassName("home-sider-bar")[0];
      sideBarDiv.classList.toggle("hide-sider-bar");
      let headerDiv = document.getElementsByClassName("header")[0];
      headerDiv.classList.toggle("bigger-header");
      let homeContentDiv = document.getElementsByClassName("home-content")[0];
      homeContentDiv.classList.toggle("bigger-header");
    }
  }
};
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 200px;
  right: 0;
  height: 0;
  box-shadow: set-shadow(0.2);
  background-color: $background-w;
  transition: all 0.3s;
  z-index: 3;
  opacity: 0;
  .sider-bar-button {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
    font: bolder 30px Roboto;
    display: flex;
    justify-content: center;
    align-items: center;
    svg > path {
      color: $primary;
    }
  }
  .header-user-avatar {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: $primary;
  }
}
</style>
