<template>
  <div class="index">
    <ImageSlider top="20px" left="20px" right="20px" height="380px"></ImageSlider>
    <div class="new-movies card">
      <div class="card-title">
        <div class="card-left-title">
          <font-awesome-icon prefix="fas" icon="random"></font-awesome-icon> 随 机 电 影
        </div>
        <div class="card-right-title" @click="goToPageTmp(1, '/home/search')">更 多</div>
      </div>
      <MovieCardList :movie-list="movieList"></MovieCardList>
    </div>
    <div class="top-movies card">
      <div class="card-title">
        <div class="card-left-title">
          <font-awesome-icon prefix="fas" icon="fire"></font-awesome-icon> TOP 10
        </div>
      </div>
      <ul class="top-movie-list">
        <li class="top-movie-item" v-for="(movie, index) in movieList" :key="index" @click="showMovieDetail">
          <span>{{index + 1}}</span>
          <span>{{movie.title}}</span>
          <span>{{movie.rating}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import ImageSlider from "../components/ImageSlider";
  import MovieCardList from "../components/MovieCardList";
  import TimelineLite from "gsap";
  export default {
    name: "Index",
    components: {MovieCardList, ImageSlider},
    data() {
      return {
        movieList: [
          {title: 'TOGO', rating: '9.0'},
          {title: 'TOGO', rating: '9.0'},
          {title: 'TOGO', rating: '9.0'},
          {title: 'TOGO', rating: '9.0'},
          {title: 'TOGO', rating: '9.0'},
          {title: 'TOGO', rating: '9.0'},
          {title: 'TOGO', rating: '9.0'},
          {title: 'TOGO', rating: '9.0'},
          {title: 'TOGO', rating: '9.0'},
          {title: 'TOGO', rating: '9.0'}
        ]
      }
    },
    mounted() {
      this.goToPage(0);
      TimelineLite.to('.home-container', {time: 1, opacity: 1, delay: 0.7});
    },
    methods: {
      showMovieDetail() {
        this.$EventBus.$emit("updateMovieInfo", this.movie);
        TimelineLite.to('.movie-detail-card', {time: 0.5, width: '100vw', height: '100vh', top: 0, left: 0, opacity: 1, pointerEvents: 'auto'});
        TimelineLite.to('.movie-detail-card-container', {time: 0.5, opacity: 1, delay: 0.5, pointerEvents: 'auto'});
      },
      goToPageTmp(index, url) {
        this.goToPage(index);
        this.$router.push(url);
      }
    }
  }
</script>

<style lang="scss">
  .index {
    .new-movies {
      position: absolute;
      top: 420px;
      bottom: 20px;
      left: 20px;
      width: 70%;
    }
    .top-movies {
      position: absolute;
      top: 420px;
      bottom: 20px;
      right: 20px;
      width: calc(30% - 60px);
      .top-movie-list {
        position: absolute;
        top: 60px;
        height: calc(100% - 80px);
        left: 20px;
        right: 20px;
        overflow-x: scroll;
        display: flex;
        align-items: center;
        flex-direction: column;
        .top-movie-item {
          position: relative;
          flex: 1 0 auto;
          width: 100%;
          height: 40px;
          margin: 10px 0 10px 0;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          span {
            position: absolute;
            display: flex;
            justify-content: left;
            align-items: center;
            font: bold 18px Roboto;
            transition: all 0.3s;
          }
          span:nth-child(1) {
            top: 0;
            left: 0;
            height: 40px;
            width: 40px;
          }
          span:nth-child(2) {
            top: 0;
            left: 50px;
            right: 50px;
            bottom: 0;
            &:hover {
              color: $primary;
            }
          }
          span:nth-child(3) {
            top: 0;
            right: 0;
            height: 40px;
            width: 40px;
            color: $danger;
          }
        }
      }
    }
  }
</style>
