<template>
  <div class="index">
    <MovieSlider :movie-list="sliderMovieList"></MovieSlider>
    <div class="index-movie-container">
      <MovieCardRow title="随机推荐" :movie-list="randomMovieList" :rating="isSignIn">
        <BaseButton class="reload-button" @click.native="reload">
          <font-awesome-icon prefix="fas" icon="redo-alt"></font-awesome-icon>
        </BaseButton>
      </MovieCardRow>
      <MovieTopList title="Top 10" :movie-list="top10MovieList"></MovieTopList>
    </div>
    <div class="index-movie-container" v-for="(movieList, index) in favortypeMovieList" :key="index">
      <MovieCardRow :title="'与' + movieList.type + '相关的电影'" :movie-list="movieList.randomMovieList" :rating="isSignIn">
        <BaseButton class="reload-button" @click.native="getRandomMovieListByType(movieList.type)">
          <font-awesome-icon prefix="fas" icon="redo-alt"></font-awesome-icon>
        </BaseButton>
      </MovieCardRow>
      <MovieTopList :title="movieList.type + ' Top 10'" :movie-list="movieList.top10MovieList"></MovieTopList>
    </div>
  </div>
</template>

<script>
  import TimelineLite from "gsap";
  import MovieSlider from "../components/MovieSlider";
  import MovieCardRow from "../components/MovieCardRow";
  import BaseButton from "../components/BaseButton";
  import MovieTopList from "../components/MovieTopList";
  export default {
    name: "Index",
    components: {MovieTopList, BaseButton, MovieCardRow, MovieSlider},
    data() {
      return {
        sliderMovieList: [],
        randomMovieList: [],
        top10MovieList: [],
        favortypeMovieList: [],
        userinfo: JSON.parse(localStorage.getItem('userinfo')),
        isSignIn: false
      }
    },
    mounted() {
      this.initAnimation();
      if (localStorage.getItem('userinfo') !== null)
        this.isSignIn = true;
      this.goToPage(0);
      if (localStorage.getItem('sliderMovieList') !== null) {
        this.sliderMovieList = JSON.parse(localStorage.getItem('sliderMovieList'));
        this.initMovieList();
      } else
        this.getSliderMovieList();
    },
    methods: {
      startLoading(flag) {
        TimelineLite.to('.base-loader', {duration: 0.3, pointerEvents: flag ? 'auto' : 'none', opacity: flag ? 1 : 0});
      },
      initAnimation() {
        TimelineLite.to('.home-container', {duration: 0.3, opacity: 1, delay: 0.3});
      },
      goToPage(index) {
        let itemList = document.getElementsByClassName('base-sidebar')[0].getElementsByTagName('i');
        for (let i = 0; i < itemList.length; i++)
          itemList[i].classList.remove('i-selected');
        itemList[index].classList.add('i-selected');
        if (index === 1) this.$router.push('/home/search');
      },
      reload() {
        this.getRandomMovieList();
      },
      async initMovieList() {
        await this.getRandomMovieList();
        await this.getTop10MovieList();
        await this.getFavorTypeMovieList();
      },
      async getSliderMovieList() {
        this.startLoading(true);
        let result = await this.$axios.post('/api/movie/get_slider_movie_list');
        this.startLoading(false);
        this.sliderMovieList = result.data.movie_list;
        localStorage.setItem('sliderMovieList', JSON.stringify(this.sliderMovieList));
        await this.initMovieList();
      },
      async getRandomMovieList() {
        this.startLoading(true);
        let result = await this.$axios.post('/api/movie/get_random_movie_list', {count: 10});
        this.startLoading(false);
        this.randomMovieList = result.data.movie_list;
      },
      async getTop10MovieList() {
        this.startLoading(true);
        let result = await this.$axios.post('/api/movie/get_top_10_movie_list');
        this.startLoading(false);
        this.top10MovieList = result.data.movie_list;
      },
      async getRandomMovieListByType(movietype) {
        let result = await this.$axios.post('/api/movie/get_random_movie_list_by_type', {movie_type: movietype});
        let flag = true;
        for (let i = 0; i < this.favortypeMovieList.length; i++) {
          if (movietype === this.favortypeMovieList[i].type) {
            this.favortypeMovieList[i].randomMovieList = result.data.movie_list;
            flag = false;
          }
        }
        if (flag) this.favortypeMovieList.push({type: movietype, randomMovieList: result.data.movie_list});
      },
      async getTop10MovieListByType(movietype) {
        let result = await this.$axios.post('/api/movie/get_popular_movie_list_by_type', {movie_type: movietype});
        for (let i = 0; i < this.favortypeMovieList.length; i++) {
          if (movietype === this.favortypeMovieList[i].type)
            this.favortypeMovieList[i].top10MovieList = result.data.movie_list;
        }
      },
      async getFavorTypeMovieList() {
        this.startLoading(true)
        let type_list = [];
        if (localStorage.getItem('userinfo') !== null)
          type_list = this.userinfo.favortype.split('@_@');
        for (let i = 0; i < type_list.length; i++) {
          await this.getRandomMovieListByType(type_list[i]);
          await this.getTop10MovieListByType(type_list[i]);
        }
        this.startLoading(false);
        this.favortypeMovieList.reverse();
      }
    }
  }
</script>

<style scoped lang="scss">
  .index {
    .movie-slider {
      position: absolute;
      top: 20px;
      left: 20px;
      width: calc(100% - 40px);
      height: 500px;
      z-index: 2;
    }
    .index-movie-container {
      position: relative;
      top: 540px;
      left: 20px;
      right: 20px;
      width: calc(100% - 40px);
      height: 360px;
      margin-bottom: 20px;
      .movie-card-row {
        position: absolute;
        top: 0;
        left: 0;
        width: calc(70% - 10px);
        height: 360px;
        .reload-button {
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 40px;
          border-radius: 0 10px 0 40px;
          z-index: 2;
          svg {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 5px;
            right: 5px;
            path {
              color: $card-primary-text;
            }
          }
        }
      }
      .movie-top-list {
        position: absolute;
        top: 0;
        right: 0;
        width: calc(30% - 10px);
        height: 360px;
      }
    }
  }
</style>
