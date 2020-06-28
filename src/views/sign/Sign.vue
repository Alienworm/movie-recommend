<template>
  <div class="sign">
    <SignIn class="sign-content"></SignIn>
    <SignUp class="sign-content"></SignUp>
  </div>
</template>

<script>
import SignIn from "./SignIn";
import SignUp from "./SignUp";
export default {
  name: "Sign",
  components: { SignUp, SignIn }
};
</script>

<style lang="scss">
.sign {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($primary, 1);
  z-index: 2;
}

.sign-content {
  position: absolute;
  width: 60vw;
  height: 60vh;
  background-color: $background-w;
  box-shadow: set-shadow(0.2);
  border-radius: 5px;
  transition: all 0.3s;
  .switch-button {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    background-color: $primary;
    border-radius: 0 5px 0 50px;
    svg {
      position: absolute;
      top: 10px;
      right: 10px;
      path {
        color: $background-w;
      }
    }
    z-index: 3;
    font: bolder 22px Roboto;
  }
}

.hide {
  height: 0;
  opacity: 0;
  pointer-events: none;
}

.go-bigger {
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  background-color: $primary !important;
}

.show-sider-bar {
  width: 200px !important;
  opacity: 1 !important;
  pointer-events: auto;
}

.hide-sider-bar {
  width: 0 !important;
  opacity: 0 !important;
  pointer-events: none;
}

.font-go-bigger {
  font-size: 30px !important;
}

.show-header {
  left: 200px !important;
  height: 60px !important;
  opacity: 1 !important;
}

.bigger-header {
  left: 0 !important;
}
</style>
