<template>
  <div class="movie-slider">
    <div class="movie-slider-container card"
         v-for="(movie, index) in movieList" :key="index"
         :style="bg_left + movie.movieImage + bg_right"
         @click="showMovieDetailCard(movie)"
         @mouseover="showMovieName(true, index)"
         @mouseleave="showMovieName(false, index)">
      <div :class="['movie-slider-container-movie-name', 'movie-name-' + index]">
        <span>{{movie.movieName}}</span>
      </div>
    </div>
    <div class="movie-slider-prev-button" @click="prevImage()">
      <font-awesome-icon prefix="fas" icon="arrow-left"></font-awesome-icon>
    </div>
    <div class="movie-slider-next-button" @click="nextImage">
      <font-awesome-icon prefix="fas" icon="arrow-right"></font-awesome-icon>
    </div>
  </div>
</template>

<script>
  import TimelineLite from "gsap";

  export default {
    name: "MovieSlider",
    data() {
      return {
        bg_left: 'background-image: url("',
        bg_right: '")',
        movieList: [],
        currentImage: 2,
      }
    },
    mounted() {
      this.$ajax.post('/movie/getRandomMovie', {count: 5}).then((data) => {
        this.movieList = data.data;
      });
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
      },
      showMovieName(flag, index) {
        TimelineLite.to('.movie-name-' + index, {duration: 0.5, opacity: flag === true ? 1 : 0});
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
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      cursor: pointer;
      .movie-slider-container-movie-name {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 80px;
        display: flex;
        justify-content: right;
        align-items: center;
        font: bold 40px Roboto;
        padding: 0 20px 0 20px;
        opacity: 0;
        border-radius: 0 0 5px 5px;
        &::after {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 1;
          border-radius: 0 0 5px 5px;
        }
        span {
          z-index: 2;
        }
      }
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
