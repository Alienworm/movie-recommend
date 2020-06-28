<template>
  <div class="movie-card-line-list card">
    <div class="card-title">
      <font-awesome-icon :prefix="icon.prefix" :icon="icon.name"></font-awesome-icon> {{title}}
    </div>
    <slot></slot>
    <ul class="movie-card-line-list-container">
      <MovieCard v-for="(movie, index) in movieList" :key="index" :movie="movie" :ratinged="ratinged"></MovieCard>
    </ul>
  </div>
</template>

<script>
  import MovieCard from "./MovieCard";
  export default {
    name: "MovieCardLineList",
    components: {MovieCard},
    props: {
      title: String,
      ratinged: Boolean,
      icon: {},
      movieList: Array
    }
  }
</script>

<style scoped lang="scss">
  .movie-card-line-list {
    .movie-card-line-list-container {
      position: absolute;
      top: 40px;
      left: 10px;
      width: calc(100% - 20px);
      height: calc(100% - 40px);
      overflow-x: scroll;
      overflow-y: hidden;
      list-style-type: none;
      display: flex;
      align-items: center;
    }
  }
</style>
