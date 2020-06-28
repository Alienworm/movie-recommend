<template>
  <div class="search">
    <div class="search-bar">
      <div class="search-bar-movie-type-card card">
        <div class="card-title">
          <div class="card-left-title">
            <font-awesome-icon prefix="fas" icon="tags"></font-awesome-icon> 类 型
          </div>
        </div>
        <div class="search-bar-movie-type-list">
          <div class="search-bar-movie-type-item base-button" v-for="(type, index) in movieTypeList" :key="index" @click="selectMovieType(index, type)">
            {{type}}
          </div>
        </div>
      </div>
      <div class="search-bar-movie-zone-card card">
        <div class="card-title">
          <div class="card-left-title">
            <font-awesome-icon prefix="fas" icon="globe-asia"></font-awesome-icon> 地 区
          </div>
        </div>
        <div class="search-bar-movie-zone-list">
          <div class="search-bar-movie-zone-item base-button" v-for="(zone, index) in movieZoneList" :key="index" @click="selectMovieZone(index, zone)">
            {{zone}}
          </div>
        </div>
      </div>
      <div class="search-bar-movie-title-card card">
        <div class="card-title">
          <div class="card-left-title">
            <font-awesome-icon prefix="fas" icon="keyboard"></font-awesome-icon> 关 键 词
          </div>
        </div>
        <form action="">
          <label class="text-input">
            电 影 名 称
            <input type="text"  v-model="movieTitle" />
          </label>
          <button class="form-button base-button" @click="search()">搜 索</button>
        </form>
      </div>
    </div>
    <MovieCardGroup class="search-movie-card-grop" :movie-list="movieList"></MovieCardGroup>
  </div>
</template>

<script>
  import TimelineLite from "gsap";
  import MovieCardGroup from "../components/MovieCardGroup";
  export default {
    name: "Search",
    components: {MovieCardGroup},
    data() {
      return {
        movieTitle: '',
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
        selectedMovieZoneList: [],
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
      this.goToPage(1, '');
      TimelineLite.to('.home-container', {time: 0.5, opacity: 1, delay: 0.7});
    },
    methods: {
      search() {

      },
      selectMovieType(index, movieType) {
        if (this.selectedMovieTypeList.indexOf(movieType) === -1) {
          this.selectedMovieTypeList.push(movieType);
          document.getElementsByClassName('search-bar-movie-type-item')[index].classList.add('search-bar-movie-item-selected');
        } else {
          this.selectedMovieTypeList.splice(
            this.selectedMovieTypeList.indexOf(movieType),
            1
          );
          document.getElementsByClassName('search-bar-movie-type-item')[index].classList.remove('search-bar-movie-item-selected');
        }
      },
      selectMovieZone(index, movieZone) {
        if (this.selectedMovieZoneList.indexOf(movieZone) === -1) {
          this.selectedMovieZoneList.push(movieZone);
          document.getElementsByClassName('search-bar-movie-zone-item')[index].classList.add('search-bar-movie-item-selected');
        } else {
          this.selectedMovieZoneList.splice(
            this.selectedMovieZoneList.indexOf(movieZone),
            1
          );
          document.getElementsByClassName('search-bar-movie-zone-item')[index].classList.remove('search-bar-movie-item-selected');
        }
      },
    }
  }
</script>

<style lang="scss">
  .search {
    .search-bar {
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      height: 240px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .search-bar-movie-type-card,
      .search-bar-movie-zone-card,
      .search-bar-movie-title-card {
        position: relative;
        width: 35%;
        height: 100%;
        form {
          position: absolute;
          top: 60px;
          bottom: 0;
          width: 100%;
          padding: 0 20px 0 20px;
        }
        .search-bar-movie-type-list,
        .search-bar-movie-zone-list {
          position: absolute;
          top: 60px;
          left: 0;
          right: 0;
          bottom: 0;
          overflow-x: scroll;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          padding: 0 10px 0 10px;
          .search-bar-movie-type-item,
          .search-bar-movie-zone-item {
            position: relative;
            flex: 1 0 auto;
            width: 70px;
            height: 30px;
            border-radius: 5px;
            margin: 0 10px 15px 10px;
          }
          .search-bar-movie-item-selected {
            background-color: $success !important;
            &:hover {
              background-color: rgba($success, 0.8) !important;
            }
          }
        }
      }
      .search-bar-movie-title-card{
        position: relative;
        width: 25%;
        height: 100%;
      }
    }
    .search-movie-card-grop {
      position: absolute;
      top: 260px;
      left: 0;
      width: 100%;
      min-height: calc(100vh - 260px);
      padding: 10px 20px 20px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
  }
</style>
