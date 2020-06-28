<template>
  <li class="movie-card">
    <div class="movie-card-rating">{{movie.rating}}</div>
    <div class="movie-card-image card" @click="showMovieDetail"></div>
    <div class="movie-card-title">{{movie.title}}</div>
  </li>
</template>

<script>
  import TimelineLite from "gsap";

  export default {
    name: "MovieCard",
    props: {
      movieIndex: Number,
      movie: {}
    },
    methods: {
      showMovieDetail() {
        this.$EventBus.$emit("updateMovieInfo", this.movie);
        TimelineLite.to('.movie-detail-card', {time: 0.5, width: '100vw', height: '100vh', top: 0, left: 0, opacity: 1, pointerEvents: 'auto'});
        TimelineLite.to('.movie-detail-card-container', {time: 0.5, opacity: 1, delay: 0.5, pointerEvents: 'auto'});
      }
    }
  }
</script>

<style lang="scss">
  .movie-card {
    position: relative;
    display: inline-table;
    flex: 1 0 auto;
    width: 220px;
    height: 360px;
    margin: 10px;
    cursor: pointer;
    .movie-card-rating {
      position: absolute;
      top: 20px;
      right: 0;
      width: 60px;
      height: 40px;
      border-radius: 30px 0 0 30px;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      font: bold 18px Roboto;
      z-index: 2;
      color: $danger;
    }
    .movie-card-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 330px;
      background-image: url("../assets/images/movie-poster.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
    .movie-card-title {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 30px;
      display: flex;
      justify-content: left;
      align-items: center;
      font: bold 20px Roboto;
      color: $primary-text-w;
    }
  }
</style>
