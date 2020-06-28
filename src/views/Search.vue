<template>
  <div class="search">
    <div class="search-bar">
      <div class="search-movie-type card">
        <div class="card-title"><font-awesome-icon prefix="fas" icon="tags"></font-awesome-icon> 电 影 类 型</div>
        <ul class="card-container">
          <li class="search-movie-type-li base-button" v-for="(type, index) in movieTypeList" :key="index" @click="selectMovieType(index, type)">{{type}}</li>
        </ul>
      </div>
      <div class="search-movie-zone card">
        <div class="card-title"><font-awesome-icon prefix="fas" icon="globe-asia"></font-awesome-icon> 电 影 地 区</div>
        <ul class="card-container">
          <li class="search-movie-zone-li base-button" v-for="(zone, index) in movieZoneList" :key="index" @click="selectMovieZone(index, zone)">{{zone}}</li>
        </ul>
      </div>
      <div class="search-movie-title card">
        <div class="card-title"><font-awesome-icon prefix="fas" icon="globe-asia"></font-awesome-icon> 电 影 名 称</div>
        <div class="card-container">
          <label class="text-input">
            <input type="text" v-model="movieTitle" />
          </label>
          <button class="base-button">搜 索</button>
        </div>
      </div>
    </div>
    <div class="search-movie-list">
      <MovieCard v-for="(movie, index) in movieList" :key="index" :movie="movie" :ratinged="false"></MovieCard>
    </div>
    <div class="search-load-more base-button" v-if="more" @click="getMovieList">
      加 载 更 多
    </div>
  </div>
</template>

<script>
  import TimelineLite from "gsap";
  import MovieCard from "../components/MovieCard";

  export default {
    name: "Search",
    components: {MovieCard},
    data() {
      return {
        movieTitle: '',
        movieList: [],
        movieTypeList: [
          '剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑',
          '惊悚', '恐怖', '犯罪', '音乐', '歌舞', '传记', '历史',
          '战争', '西部', '奇幻', '冒险', '灾难', '武侠'
        ],
        movieZoneList: [
          '中国大陆', '美国', '香港', '台湾', '日本',
          '韩国', '英国', '法国', '德国', '意大利',
          '西班牙', '印度', '泰国', '俄罗斯', '伊朗',
          '加拿大', '澳大利亚', '爱尔兰', '瑞典', '巴西', '丹麦'
        ],
        selectedMovieTypeList: [],
        selectedMovieZoneeList: [],
        more: true,
      }
    },
    mounted() {
      this.initAnimation();
      this.goToPage(1);
      this.selectMovieType(0,'剧情');
      this.selectMovieZone(0, '中国大陆');
    },
    methods: {
      initAnimation() {
        TimelineLite.to('.home-container', {duration: 0.3, opacity: 1, delay: 0.3});
      },
      getMovieList() {
        this.$ajax.post('/movie/getRandomMovie', {count: 20}).then((data) => {
          this.movieList = this.movieList.concat(data.data);
        });
      },
      selectMovieType(index, movieType) {
        if (this.selectedMovieTypeList.indexOf(movieType) === -1) {
          this.selectedMovieTypeList.push(movieType);
          document.getElementsByClassName('search-movie-type-li')[index].classList.add('li-selected');
          this.getMovieList();
        } else {
          this.selectedMovieTypeList.splice(this.selectedMovieTypeList.indexOf(movieType), 1);
          document.getElementsByClassName('search-movie-type-li')[index].classList.remove('li-selected');
        }
      },
      selectMovieZone(index, movieZone) {
        if (this.selectedMovieZoneeList.indexOf(movieZone) === -1) {
          this.selectedMovieZoneeList.push(movieZone);
          document.getElementsByClassName('search-movie-zone-li')[index].classList.add('li-selected');
          this.getMovieList();
        } else {
          this.selectedMovieZoneeList.splice(this.selectedMovieZoneeList.indexOf(movieZone), 1);
          document.getElementsByClassName('search-movie-zone-li')[index].classList.remove('li-selected');
        }
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

<style scoped lang="scss">
  .search {
    .search-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 240px;
      background-color: $background;
      z-index: 3;
      overflow: hidden;
      .search-movie-type,
      .search-movie-zone,
      .search-movie-title {
        position: absolute;
        top: 20px;
        left: 20px;
        height: 200px;
        ul {
          display: flex;
          justify-content: right;
          align-items: center;
          flex-wrap: wrap;
          right: -10px;
          li {
            width: 80px;
            height: 30px;
            margin-right: 20px;
            background-color: $card-sub-text;
            &:hover {
              background-color: rgba($card-sub-text, 0.8);
            }
          }
          .li-selected {
            background-color: $highlight;
            &:hover {
              background-color: $highlight-dark;
            }
          }
        }
      }
      .search-movie-type {
        width: 35%;
        ul {
          li {
            width: 60px;
          }
        }
      }
      .search-movie-zone {
        width: 40%;
        left: calc(35% + 40px);
        ul {
          li {
            width: 80px;
          }
        }
      }
      .search-movie-title {
        width: calc(25% - 80px);
        left: unset;
        right: 20px;
        .card-container {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          flex-direction: column;
          .text-input {
            position: relative;
            width: 100%;
            height: 40px;
            input {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              outline: none;
              border: none;
              text-decoration: none;
              padding: 0 20px 0 20px;
              font: bold 18px Roboto;
              border-radius: 5px;
              background-color: $card-primary-text;
              transition: all 0.3s;
              color: $card-background;
            }
          }
          button {
            position: relative;
            width: 100%;
            height: 40px;
          }
        }
      }
    }
    .search-movie-list {
      position: relative;
      top: 240px;
      left: 20px;
      width: calc(100% - 40px);
      min-height: calc(100% - 260px);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .movie-card {
        margin: 0 20px 20px 0;
      }
      .movie-card:nth-child(5n) {
        margin-right: 0;
      }
    }
    .search-load-more {
      position: relative;
      top: 240px;
      left: 20px;
      width: calc(100% - 40px);
      height: 40px;
      margin-bottom: 20px;
    }
  }
</style>
