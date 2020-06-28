<template>
  <div class="result">
    <MovieCardLineList v-for="(algorithm, index) in algorithmList"
                       :title="algorithm.title" :key="index" :ratinged="true"
                       :icon="{prefix: 'fas', name: 'robot'}"
                       :movie-list="algorithm.movieList">
      <div class="card-right-title" @click="restart(index)">
        <font-awesome-icon prefix="fax" icon="sync-alt"></font-awesome-icon> 重 新 推 荐</div>
    </MovieCardLineList>
  </div>
</template>

<script>
  import TimelineLite from "gsap";
  import MovieCardLineList from "../components/MovieCardLineList";

  export default {
    name: "Result",
    components: {MovieCardLineList},
    data() {
      return {
        algorithmList: [
          {title: '算 法 1', movieList: []},
          {title: '算 法 2', movieList: []},
          {title: '算 法 3', movieList: []},
          {title: '算 法 4', movieList: []},
          {title: '算 法 5', movieList: []},
          {title: '算 法 6', movieList: []},
        ]
      }
    },
    mounted() {
      this.initAnimation();
      this.goToPage(2);
      for (let i = 0; i < this.algorithmList.length; i++)
        this.getMovieList(i);
    },
    methods: {
      initAnimation() {
        TimelineLite.to('.home-container', {duration: 0.3, opacity: 1, delay: 0.3});
      },
      restart(index) {
        this.getMovieList(index);
      },
      sortRating(a, b) {
        return b.movieAverating - a.movieAverating;
      },
      getMovieList(index) {
        this.$ajax.post('/movie/getRandomMovie', {count: 10}).then((data) => {
          this.algorithmList[index].movieList = data.data;
          this.algorithmList[index].movieList.sort(this.sortRating);
        });
      },
      goToPage(index) {
        let itemList = document.getElementsByClassName('side-bar')[0].getElementsByTagName('i');
        for (let i = 0; i < itemList.length; i++)
          itemList[i].classList.remove('i-selected');
        itemList[index].classList.add('i-selected');
      },
    }
  }
</script>

<style lang="scss">
  .result {
    .movie-card-line-list {
      position: relative;
      top: 20px;
      left: 20px;
      width: calc(100% - 40px);
      height: 280px;
      margin-bottom: 20px;
      .movie-card {
        width: 160px !important;
        height: 220px !important;
        margin-right: 40px !important;
        .movie-card-image {
          height: 100% !important;
          .movie-card-movie-name {
            height: 20px;
            font: bold 16px Roboto;
          }
        }
      }
    }
  }
</style>
