<template>
  <BaseCard class="movie-card-row">
    <span class="base-card-title">{{title}}</span>
    <slot></slot>
    <ul class="movie-card-row-container">
      <MovieCard v-for="(movie, index) in movieList"
                 :movie="movie" :key="index"
                 card-width="calc(120px * 1.7)"
                 card-height="calc(170px * 1.7 + 10px)"
                 star-height="30px"
                 star-width="15px"
                 name-height="40px"
                 name-font-size="18px"
                 :rating="rating">
      </MovieCard>
    </ul>
  </BaseCard>
</template>

<script>
  import BaseCard from "./BaseCard";
  import MovieCard from "./MovieCard";
  export default {
    name: "MovieCardRow",
    components: {MovieCard, BaseCard},
    props: {
      title: String,
      movieList: Array,
      rating: Boolean
    }
  }
</script>

<style scoped lang="scss">
  .movie-card-row {
    .movie-card-row-container {
      position: absolute;
      top: 40px;
      left: 20px;
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      overflow-x: scroll;
      overflow-y: hidden;
      list-style-type: none;
      display: flex;
      align-items: center;
      transition: all .3s;
      .movie-card {
        position: relative;
        margin-right: 40px;
        flex: none;
        transition: all .3s;
      }
    }
  }
</style>
