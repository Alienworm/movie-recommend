<template>
  <div class="movie-detail-card">
    <div class="movie-detail-card-container card">
      <div class="movie-detail-card-container-tmp"></div>
      <div class="movie-detail-card-close-button base-button" @click="close">
        <font-awesome-icon prefix="fab" icon="times"></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script>
  import TimelineLite from "gsap";
  export default {
    name: "MovieDetailCard",
    data() {
      return {
        movie: {}
      }
    },
    mounted() {
      this.updateMovieInfo();
    },
    methods: {
      updateMovieInfo() {
        this.$EventBus.$on("updateMovieInfo", (movie) => {
          this.movie = movie;
        });
      },
      close() {
        TimelineLite.to('.movie-detail-card-container', {time: 0.5, opacity: 0, pointerEvents: 'none'});
        TimelineLite.to('.movie-detail-card', {time: 0.5, width: 0, height: 0, top: '50vh', left: '50vw', opacity: 0, delay: 0.5, pointerEvents: 'none'});
      }
    }
  }
</script>

<style lang="scss">
  .movie-detail-card {
    position: fixed;
    top: 50vh;
    left: 50vw;
    width: 0;
    height: 0;
    background-color: rgba($primary-text-b, 0.7);
    z-index: 10;
    opacity: 0;
    .movie-detail-card-container {
      position: absolute;
      top: 15%;
      left: 15%;
      width: 70%;
      height: 70%;
      background-image: url("../assets/images/poster-3.jpeg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      z-index: 1;
      opacity: 0;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($background-b, 0.6);
        border-radius: 5px;
        z-index: 2;
      }
      .movie-detail-card-close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        z-index: 3;
        font-size: 25px;
      }
    }
  }
</style>
