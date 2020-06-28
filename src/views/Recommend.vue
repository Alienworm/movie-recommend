<template>
  <div class="recommend">
    <BaseButton class="first-recommend" v-if="isFirst" @click.native="startRecommend">
      开始第一次推荐吧 <font-awesome-icon prefix="fas" icon="sign-out-alt"></font-awesome-icon>
    </BaseButton>
    <BaseCard class="history-movie-list" v-if="!isFirst">
      <div class="base-card-title">历 史 评 分</div>
      <BaseButton class="base-card-button" @click.native="hide()">
        <font-awesome-icon prefix="fas" icon="caret-up" v-if="!hideHistory"></font-awesome-icon>
        <font-awesome-icon prefix="fas" icon="caret-down" v-if="hideHistory"></font-awesome-icon>
      </BaseButton>
      <div class="history-movie-list-container">
        <MovieCard v-for="(movie, index) in historyMovieList"
                   :movie="movie" :key="index"
                   card-width="calc(120px * 1.7)"
                   card-height="calc(170px * 1.7 + 10px)"
                   star-height="30px"
                   star-width="20px"
                   name-height="40px"
                   name-font-size="18px"
                   :rating="true">
        </MovieCard>
      </div>
    </BaseCard>
    <MovieCardRow :movie-list="alsAlgorithmMovieList" v-if="!isFirst"
                  title="ALS(Alternating Least Squares)协同过滤算法推荐结果" :rating="false">
      <BaseButton class="reload-button" @click.native="startRecommend">
        <font-awesome-icon prefix="fas" icon="redo-alt"></font-awesome-icon>
      </BaseButton>
    </MovieCardRow>
  </div>
</template>

<script>
  import MovieCardRow from "../components/MovieCardRow";
  import BaseButton from "../components/BaseButton";
  import TimelineLite from "gsap";
  import BaseCard from "../components/BaseCard";
  import MovieCard from "../components/MovieCard";
  export default {
    name: "Recommend",
    components: {MovieCard, BaseCard, BaseButton, MovieCardRow},
    data() {
      return {
        alsAlgorithmMovieList: [],
        isFirst: true,
        hideHistory: false,
        userinfo: JSON.parse(localStorage.getItem('userinfo')),
        historyMovieList: []
      }
    },
    mounted() {
      this.goToPage(2);
      this.initAnimation();
      this.checkFirstRecommend();
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
      },
      hide() {
        this.hideHistory = !this.hideHistory;
        if (this.hideHistory)
          TimelineLite.to('.history-movie-list', {duration: 0.5, minHeight: 'unset', height: '50px'});
        else
          TimelineLite.to('.history-movie-list', {duration: 0.5, height: 'auto'});
      },
      async checkFirstRecommend() {
        if (await this.getUserRatingMovieList()) {
          this.isFirst = false;
          await this.getALSRecommendMovieList();
        } else {
          this.isFirst = true;
        }
      },
      async getUserRatingMovieList() {
        this.startLoading(true);
        let result = await this.$axios.post('/api/movie/get_user_rating_movie_list', {userid: this.userinfo.userid});
        this.startLoading(false);
        if (result.data.code === 200) {
          this.historyMovieList = result.data.movie_list;
          this.historyMovieList.reverse();
        }
        return result.data.code !== 500;
      },
      async startRecommend() {
        if (await this.getUserRatingMovieList()) {
          this.startLoading(true);
          let result = await this.$axios.post('/api/movie/start_recommend', {userid: this.userinfo.userid});
          this.startLoading(false);
          this.alsAlgorithmMovieList = result.data.movie_list;
          this.alsAlgorithmMovieList.reverse();
          this.isFirst = false;
          this.$EventBus.$emit('alertMessage', {type: 'success', message: '推荐完成'});
        } else {
          this.$EventBus.$emit('alertMessage', {type: 'error', message: '还没有对电影进行评分'});
        }
      },
      async getALSRecommendMovieList() {
        this.startLoading(true);
        let result = await this.$axios.post('/api/movie/get_als_recommend_movie_list', {userid: this.userinfo.userid});
        this.startLoading(false);
        if (result.data.code === 500)
          this.isFirst = true;
        else {
          this.alsAlgorithmMovieList = result.data.movie_list;
          this.alsAlgorithmMovieList.reverse();
          this.isFirst = false;
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .recommend {
    .first-recommend {
      position: absolute;
      width: 200px;
      height: 50px;
      top: calc((100% - 50px) / 2);
      left: calc((100% - 200px) / 2);
      svg {
        margin-left: 10px;
      }
    }
    .history-movie-list {
      position: relative;
      top: 20px;
      left: 20px;
      width: calc(100% - 40px);
      min-height: 50px;
      overflow: hidden;
      .base-card-button {
        svg {
          width: 30px;
          height: 30px;
          position: absolute;
          top: 1px;
          right: 2px;
        }
      }
      .history-movie-list-container {
        position: relative;
        top: 50px;
        left: 20px;
        width: calc(100% - 40px);
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .movie-card {
          position: relative;
          flex: none;
          margin: 0 20px 20px 0;
        }
        .movie-card:nth-child(7n) {
          margin-right: 0;
        }
        margin-bottom: 40px;
      }
    }
    .movie-card-row {
      position: relative;
      top: 40px;
      left: 20px;
      width: calc(100% - 40px);
      height: 380px;
      margin-bottom: 20px;
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
  }
</style>
