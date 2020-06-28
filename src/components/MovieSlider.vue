<template>
  <div class="movie-slider">
    <MovieCard class="movie-slider-container"
               v-for="(movie, index) in movieList"
               :movie="movie" :key="index"
               name-height="60px"
               name-font-size="24px"
               :rating="false">
    </MovieCard>
    <div class="movie-slider-prev-button" @click="prevImage()">
      <font-awesome-icon prefix="fas" icon="arrow-left"></font-awesome-icon>
    </div>
    <div class="movie-slider-next-button" @click="nextImage">
      <font-awesome-icon prefix="fas" icon="arrow-right"></font-awesome-icon>
    </div>
  </div>
</template>

<script>
  import MovieCard from "./MovieCard";
  import TimelineLite from "gsap";
  export default {
    name: "MovieSlider",
    components: {MovieCard},
    props: {
      movieList: Array
    },
    mounted() {
      setInterval(this.prevImage, 3000);
    },
    methods: {
      nextImage() {
        let movie = this.movieList[0];
        this.movieList.splice(0, 1);
        this.movieList.push(movie);
      },
      prevImage() {
        let movie = this.movieList[this.movieList.length - 1];
        this.movieList.splice(this.movieList.length - 1, 1);
        this.movieList.splice(0, 0, movie);
      },
      showMovieDetailCard(movie) {
        this.$EventBus.$emit("updateMovieInfo", movie);
        TimelineLite.to('.movie-detail-card', {duration: 0.5, width: '100vw', height: '100vh', top: 0, left: 0, opacity: 1, pointerEvents: 'auto'});
        TimelineLite.to('.movie-detail-card-container', {duration: 0.5, opacity: 1, delay: 0.5, pointerEvents: 'auto'});
      }
    }
  }
</script>

<style scoped lang="scss">
  .movie-slider {
    .movie-slider-prev-button,
    .movie-slider-next-button {
      position: absolute;
      top: calc((100% - 30px) / 2);
      left: 5%;
      width: 50px;
      height: 50px;
      border-radius: 25px;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 4;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all .3s;
      &:hover {
        background-color: rgba(0, 0, 0, 0.7);
      }
      svg > path {
        color: $card-primary-text;
      }
    }
    .movie-slider-next-button {
      left: unset;
      right: 5%;
    }
    .movie-slider-container {
      position: absolute;
      transition: all .3s;
    }
    .movie-slider-container:nth-child(1),
    .movie-slider-container:nth-child(5) {
      top: 20%;
      bottom: 20%;
      width: 36%;
      left: 0;
      z-index: 1;
    }
    .movie-slider-container:nth-child(2),
    .movie-slider-container:nth-child(4) {
      top: 10%;
      bottom: 10%;
      width: 48%;
      left: 10%;
      z-index: 2;
    }
    .movie-slider-container:nth-child(3) {
      top: 0;
      bottom: 0;
      width: 60%;
      left: 20%;
      z-index: 3;
    }
    .movie-slider-container:nth-child(4) {
      left: unset;
      right: 10%;
    }
    .movie-slider-container:nth-child(5) {
      left: unset;
      right: 0;
    }
  }
</style>
