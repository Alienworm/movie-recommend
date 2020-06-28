<template>
  <div class="movie-card-group">
    <MovieCard v-for="(movie, index) in movieList" :key="index" :movie="movie" :movie-index="index"></MovieCard>
  </div>
</template>

<script>
  import MovieCard from "./MovieCard";
  export default {
    name: "MovieCardGroup",
    components: {MovieCard},
    props: {
      movieList: Array
    }
  }
</script>

<style lang="scss">
  .movie-card-group {
  }
</style>
