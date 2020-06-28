<template>
  <BaseCard class="movie-top-list">
    <span class="base-card-title">{{title}}</span>
    <ul class="movie-top-list-container">
      <li v-for="(movie, index) in movieList" :key="index" @click="showMovieDetail(movie)">
        <span>{{index + 1}}</span><span>{{movie.moviename}}</span><span>{{movie.averating}}</span>
      </li>
    </ul>
  </BaseCard>
</template>

<script>
  import BaseCard from "./BaseCard";
  import TimelineLite from "gsap";
  export default {
    name: "MovieTopList",
    components: {BaseCard},
    props: {
      title: String,
      movieList: Array
    },
    methods: {
      showMovieDetail(movie) {
        this.$EventBus.$emit("updateMovieInfo", movie);
        TimelineLite.to('.movie-detail', {duration: 0.3, width: '100vw', height: '100vh', top: 0, left: 0, opacity: 1, pointerEvents: 'auto'});
        TimelineLite.to('.movie-detail-card', {duration: 0.3, opacity: 1, delay: 0.3, pointerEvents: 'auto'});
      },
    }
  }
</script>

<style scoped lang="scss">
  .movie-top-list {
    .movie-top-list-container {
      position: absolute;
      top: 40px;
      left: 20px;
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      overflow-y: scroll;
      overflow-x: hidden;
      list-style-type: none;
      display: flex;
      align-items: center;
      flex-direction: column;
      li {
        position: relative;
        width: 100%;
        height: 30px;
        flex: none;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        &:hover {
          span {
            color: $highlight;
          }
        }
        span {
          transition: all 0.3s;
          text-align: left;
          font: bold 16px Roboto;
        }
        span:nth-child(1) {
          width: 40px;
        }
        span:nth-child(2) {
          width: calc(100% - 100px);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        span:nth-child(3) {
          width: 40px;
        }
      }
    }
  }
</style>
