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
    color: $card-primary-text;
  }

  body {
    background-color: $background;
  }

  #app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $background;
  }
</style>
<script>
  import MovieDetailCard from "./components/MovieDetailCard";
  export default {
    components: {MovieDetailCard}
  }
</script>
