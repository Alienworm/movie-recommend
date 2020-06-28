<template>
  <div class="index">
    <MovieSlider></MovieSlider>
    <MovieCardLineList title="随 机 电 影" :ratinged="false" :icon="{prefix: 'fas', name: 'random'}" :movie-list="top10MovieList">
      <div class="card-right-title" @click="goToPage(1)">更 多</div>
    </MovieCardLineList>
    <div class="top-movie-list card">
      <div class="card-title"><font-awesome-icon prefix="fas" icon="fire"></font-awesome-icon> TOP 10</div>
      <ul>
        <li v-for="(movie, index) in top10MovieList" :key="index" @click="showMovieDetailCard(movie)">
          <span>{{index + 1}}</span><span>{{movie.movieName}}</span><span>{{movie.movieAverating}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import TimelineLite from "gsap";
  import MovieSlider from "../components/MovieSlider";
  import MovieCard from "../components/MovieCard";
  import MovieCardLineList from "../components/MovieCardLineList";

  export default {
    name: "Index",
    components: {MovieCardLineList, MovieCard, MovieSlider},
    data() {
      return {
        top10MovieList: []
      }
    },
    mounted() {
      this.initAnimation();
      this.goToPage(0);
      this.getTop10MovieList();
    },
    methods: {
      initAnimation() {
        TimelineLite.to('.home-container', {duration: 0.3, opacity: 1, delay: 0.3});
      },
      showMovieDetailCard(movie) {
        this.$EventBus.$emit("updateMovieInfo", movie);
        TimelineLite.to('.movie-detail-card', {duration: 0.5, width: '100vw', height: '100vh', top: 0, left: 0, opacity: 1, pointerEvents: 'auto'});
        TimelineLite.to('.movie-detail-card-container', {duration: 0.5, opacity: 1, delay: 0.5, pointerEvents: 'auto'});
      },
      sortRating(a, b) {
        return b.movieAverating - a.movieAverating;
      },
      getTop10MovieList() {
        this.$ajax.post('/movie/getRandomMovie', {count: 10}).then((data) => {
          this.top10MovieList = data.data;
          this.top10MovieList.sort(this.sortRating);
        });
      },
      goToPage(index) {
        let itemList = document.getElementsByClassName('side-bar')[0].getElementsByTagName('i');
        for (let i = 0; i < itemList.length; i++)
          itemList[i].classList.remove('i-selected');
        itemList[index].classList.add('i-selected');
        if (index === 1) this.$router.push('/home/search');
      },
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
      height: 400px;
    }
    .movie-card-line-list {
      position: absolute;
      top: 440px;
      left: 20px;
      width: 70%;
      height: 460px;
    }
    .top-movie-list {
      position: absolute;
      top: 440px;
      right: 20px;
      width: calc(30% - 60px);
      height: 460px;
      ul {
        position: absolute;
        top: 40px;
        left: 10px;
        right: 10px;
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
          height: 40px;
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
            font: bold 18px Roboto;
          }
          span:nth-child(1) {
            width: 40px;
          }
          span:nth-child(2) {
            width: calc(100% - 80px);
          }
          span:nth-child(3) {
            width: 40px;
          }
        }
      }
    }
  }
</style>
