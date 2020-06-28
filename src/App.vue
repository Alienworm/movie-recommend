<template>
  <div id="app">
    <MovieDetailCard></MovieDetailCard>
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: $primary-text-w;
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  letter-spacing: 0.5px;
  word-spacing: 1.5px;
}

body {
  background-color: $primary-b;
}

#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: $primary-b;
}
</style>
<script>
  import MovieDetailCard from "./components/MovieDetailCard";
  export default {
    components: {MovieDetailCard}
  }
</script>
