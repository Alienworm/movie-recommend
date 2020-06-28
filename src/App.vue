<template>
  <div id="app">
    <router-view></router-view>
    <Loading></Loading>
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: $primary-text;
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  letter-spacing: 0.5px;
  word-spacing: 1.5px;
}

#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: $primary;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0, 0.5, 0.5, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100vw);
  opacity: 0;
}
</style>
<script>
import Loading from "./components/Loading";
export default {
  components: { Loading }
};
</script>
