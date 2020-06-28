<template>
  <ul class="movie-card-list">
    <MovieCard v-for="(movie, index) in movieList" :key="index" :movie-index="index" :movie="movie"></MovieCard>
  </ul>
</template>

<script>
  import MovieCard from "./MovieCard";
  export default {
    name: "MovieCardList",
    components: {MovieCard},
    props: {
      movieList: Array
    }
  }
</script>

<style lang="scss">
  .movie-card-list {
    position: absolute;
    top: 60px;
    bottom: 20px;
    left: 20px;
    right: 20px;
    overflow-x: scroll;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
