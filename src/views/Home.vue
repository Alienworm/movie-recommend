<template>
  <div class="home">
    <Header></Header>
    <SideBar></SideBar>
    <transition name="slide-fade">
      <router-view class="home-content"></router-view>
    </transition>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import Header from "../components/Header";
export default {
  name: "Home",
  components: { Header, SideBar },
  mounted() {
    let homeDiv = document.getElementsByClassName("home")[0];
    let sideBarDiv = document.getElementsByClassName("home-sider-bar")[0];
    let headerDiv = document.getElementsByClassName("header")[0];
    homeDiv.addEventListener("animationend", () => {
      homeDiv.classList.add("go-bigger");
      homeDiv.addEventListener("transitionend", () => {
        sideBarDiv.classList.add("show-sider-bar");
        sideBarDiv.getElementsByClassName("home-side-bar-logo")[0].getElementsByTagName("span")[0].classList.add("font-go-bigger");
        sideBarDiv.addEventListener("transitionend", () => {
          headerDiv.classList.add("show-header");
        });
      });
    });
  }
};
</script>

<style lang="scss">
.home {
  position: absolute;
  top: 20vh;
  left: 20vw;
  width: 60vw;
  height: 60vh;
  background-color: $background-w;
  box-shadow: set-shadow(0.2);
  transition: all 0.5s;
  animation: tmp;
}

.home-content {
  position: absolute;
  top: 60px;
  left: 200px;
  right: 0;
  min-height: calc(100vh - 60px);
  transition: all 0.3s;
}

@keyframes tmp {
  from {
    top: 20vh;
    left: 20vw;
    width: 60vw;
    height: 60vh;
  }
  to {
    top: 20vh;
    left: 20vw;
    width: 60vw;
    height: 60vh;
  }
}
</style>
