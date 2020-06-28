<template>
  <div id="app">
    <router-view style="z-index: 1"/>
    <MovieDetail style="z-index: 2"></MovieDetail>
    <BaseNotification style="z-index: 3"></BaseNotification>
    <BaseLoader style="z-index: 4"></BaseLoader>
  </div>
</template>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: $card-primary-text;
    letter-spacing: 0.5px;
    word-spacing: 1.5px;
    font-family: Roboto;
  }

  body {
    background-color: $background;
  }
</style>
<script>
  import MovieDetail from "./components/MovieDetail";
  import BaseNotification from "./components/BaseNotification";
  import BaseLoader from "./components/BaseLoader";
  export default {
    components: {BaseLoader, BaseNotification, MovieDetail}
  }
</script>
