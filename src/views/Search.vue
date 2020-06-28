<template>
  <div class="search">
    <div class="search-filter">
      <BaseCard class="search-filter-movietype">
        <div class="base-card-title">类 型</div>
        <ul>
          <BaseButton class="movietype" v-for="(type, index) in movieTypeList" :key="index" @click.native="selectMovieType(index, type)">{{type}}</BaseButton>
        </ul>
      </BaseCard>
      <BaseCard class="search-filter-moviezone">
        <div class="base-card-title">地 区</div>
        <ul>
          <BaseButton class="moviezone" v-for="(zone, index) in movieZoneList" :key="index" @click.native="selectMovieZone(index, zone)">{{zone}}</BaseButton>
        </ul>
      </BaseCard>
      <BaseCard class="search-filter-moviename">
        <div class="base-card-title">电 影 名</div>
        <BaseButton class="base-card-button" @click.native="hide()">
          <font-awesome-icon prefix="fas" icon="caret-up" v-if="!hideFilter"></font-awesome-icon>
          <font-awesome-icon prefix="fas" icon="caret-down" v-if="hideFilter"></font-awesome-icon>
        </BaseButton>
        <BaseInput>
          <label>
            <input type="text" v-model="movieName"/>
            <span>输 入 关 键 词</span>
            <font-awesome-icon prefix="fax" icon="film"></font-awesome-icon>
          </label>
        </BaseInput>
        <BaseButton class="search-button" @click.native="newFilter">
          <font-awesome-icon prefix="fas" icon="search"></font-awesome-icon>
        </BaseButton>
      </BaseCard>
      <BaseCard class="search-filter-tool">
        <label><input name="Fruit" type="radio" v-model="sort" value="" checked @click="newFilter"/><span>随机</span></label>
        <label><input name="Fruit" type="radio" v-model="sort" value="ASC" @click="newFilter"/><span>升序</span></label>
        <label><input name="Fruit" type="radio" v-model="sort" value="DESC" @click="newFilter" /><span>降序</span></label>
      </BaseCard>
    </div>
    <div class="search-result">
      <MovieCard v-for="(movie, index) in movieList"
                 :movie="movie" :key="index"
                 card-width="calc(120px * 2)"
                 card-height="calc(170px * 2 + 10px)"
                 star-height="30px"
                 star-width="20px"
                 name-height="40px"
                 name-font-size="18px"
                 :rating="true">
      </MovieCard>
    </div>
    <BaseButton class="load-more" v-if="loadMore" @click.native="loadMoreMovie">
      加 载 更 多
    </BaseButton>
  </div>
</template>

<script>
  import BaseCard from "../components/BaseCard";
  import TimelineLite from "gsap";
  import BaseButton from "../components/BaseButton";
  import BaseInput from "../components/BaseInput";
  import MovieCard from "../components/MovieCard";
  export default {
    name: "Search",
    components: {MovieCard, BaseInput, BaseButton, BaseCard},
    data() {
      return {
        movieTypeList: [
          '剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑',
          '惊悚', '恐怖', '犯罪', '同性', '音乐', '歌舞', '传记',
          '历史', '战争', '西部', '奇幻', '冒险', '灾难', '武侠'
        ],
        movieZoneList: [
          '中国大陆', '美国', '香港', '台湾', '日本',
          '韩国', '英国', '法国', '德国', '意大利',
          '西班牙', '印度', '泰国', '俄罗斯', '伊朗',
          '加拿大', '澳大利亚', '爱尔兰', '瑞典', '巴西', '丹麦'
        ],
        movieName: '',
        hideFilter: false,
        selectedMovieTypeList: [],
        selectedMovieZoneList: [],
        movieList: [],
        page: 1,
        pageSize: 18,
        sort: '',
        loadMore: false
      }
    },
    mounted() {
      this.initAnimation();
      this.movieFilter();
      this.goToPage(1);
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
      async movieFilter() {
        let data = {
          "movieName": this.movieName,
          "movieTypeList": this.selectedMovieTypeList,
          "movieZoneList": this.selectedMovieZoneList,
          "page": this.page,
          "pageSize": this.pageSize,
          "sort": this.sort
        };
        this.startLoading(true);
        if (this.selectedMovieTypeList.length === 0 && this.selectedMovieZoneList.length === 0 && this.movieName === '') {
          let result = await this.$axios.post('/api/movie/get_random_movie_list', {count: 18});
          this.startLoading(false);
          this.movieList = result.data.movie_list;
          this.loadMore = false;
          return [];
        }
        let result = await this.$axios.post('/api/movie/search', data);
        this.startLoading(false);
        this.loadMore = result.data.movie_list.length === 18;
        return result.data.movie_list;
      },
      hide() {
        this.hideFilter = !this.hideFilter;
        let movieFilter = this.$el.getElementsByClassName('base-card')[0];
        let zoneFilter = this.$el.getElementsByClassName('base-card')[1];
        let searchFilter = this.$el.getElementsByClassName('base-card')[2];
        let searchTool = this.$el.getElementsByClassName('base-card')[3];
        if (this.hideFilter) {
          TimelineLite.to(movieFilter, {duration: 0.3, height: '50px'});
          TimelineLite.to(zoneFilter, {duration: 0.3, height: '50px'});
          TimelineLite.to(searchFilter, {duration: 0.3, height: '50px'});
          TimelineLite.to(searchTool, {duration: 0.3, top: '80px', height: '0'});
          TimelineLite.to('.search-filter', {duration: 0.3, height: '90px'});
        }
        else {
          TimelineLite.to(movieFilter, {duration: 0.3, height: '200px'});
          TimelineLite.to(zoneFilter, {duration: 0.3, height: '200px'});
          TimelineLite.to(searchFilter, {duration: 0.3, height: '120px'});
          TimelineLite.to(searchTool, {duration: 0.3, top: '160px', height: '60px'});
          TimelineLite.to('.search-filter', {duration: 0.3, height: '240px'});
        }
      },
      async loadMoreMovie() {
        this.page += 1;
        let tmp = await this.movieFilter();
        this.movieList = this.movieList.concat(tmp);
      },
      async newFilter() {
        this.page = 1;
        let tmp = await this.movieFilter();
        if (tmp.length !== 0) this.movieList = tmp;
      },
      selectMovieType(index, movieType) {
        if (this.selectedMovieTypeList.indexOf(movieType) === -1) {
          this.selectedMovieTypeList.push(movieType);
          this.$el.getElementsByClassName('movietype')[index].classList.add('base-button-seleected');
        } else {
          this.selectedMovieTypeList.splice(this.selectedMovieTypeList.indexOf(movieType), 1);
          this.$el.getElementsByClassName('movietype')[index].classList.remove('base-button-seleected');
        }
        this.newFilter();
      },
      selectMovieZone(index, movieZone) {
        if (this.selectedMovieZoneList.indexOf(movieZone) === -1) {
          this.selectedMovieZoneList.push(movieZone);
          this.$el.getElementsByClassName('moviezone')[index].classList.add('base-button-seleected');
        } else {
          this.selectedMovieZoneList.splice(this.selectedMovieZoneList.indexOf(movieZone), 1);
          this.$el.getElementsByClassName('moviezone')[index].classList.remove('base-button-seleected');
        }
        this.newFilter();
      },
    }
  }
</script>

<style scoped lang="scss">
  .search {
    .search-filter {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: 240px;
      .search-filter-movietype,
      .search-filter-moviezone,
      .search-filter-moviename,
      .search-filter-tool {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 35%;
        height: 200px;
        overflow: hidden;
        .base-card-title {
          margin-bottom: 10px !important;
        }
        ul {
          position: absolute;
          top: 50px;
          bottom: 20px;
          left: 20px;
          right: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          .base-button {
            list-style: none;
            width: 60px;
            height: 30px;
            margin-right: 15px;
            border-radius: 5px !important;
            font: bold 14px Roboto;
            box-shadow: unset !important;
            background-color: $card-sub-text;
            &:hover {
              background-color: rgba($card-sub-text, 0.8);
            }
          }
          .base-button-seleected {
            background-color: $highlight;
            &:hover {
              background-color: rgba($highlight, 0.8);
            }
          }
        }
      }
      .search-filter-moviezone {
        left: calc(35% + 40px);
      }
      .search-filter-moviename {
        left: unset;
        right: 20px;
        width: calc(30% - 80px);
        height: 120px;
        .base-input {
          position: absolute;
          top: 50px;
          left: 20px;
          right: 80px;
        }
        .base-card-button {
          svg {
            width: 30px;
            height: 30px;
            position: absolute;
            top: 1px;
            right: 2px;
          }
        }
        .search-button {
          position: absolute;
          top: 50px;
          right: 20px;
          width: 50px;
          height: 50px;
        }
      }
      .search-filter-tool {
        top: 160px;
        height: 60px;
        left: unset;
        right: 20px;
        width: calc(30% - 80px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px 0 20px;
        label {
          position: relative;
          width: 90px;
          height: 30px;
          span {
            position: absolute;
            left: 30px;
            width: 60px;
            height: 30px;
            text-align: left;
            line-height: 30px;
          }
          input {
            position: absolute;
            top: 5px;
            left: 0;
            -webkit-appearance: none;
            vertical-align: middle;
            background: $card-primary-text;
            border-radius: 5px;
            height: 20px;
            width: 20px;
            outline: none;
            border: none;
            transition: all 0.3s;
            cursor: pointer;
          }
          input:checked {
            background: $highlight;
          }
        }
      }
    }
    .search-result {
      position: relative;
      top: 0;
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
      .movie-card:nth-child(6n) {
        margin-right: 0;
      }
    }
    .load-more {
      position: relative;
      top: 0;
      left: calc((100% - 200px) / 2);
      width: 200px;
      height: 40px;
      margin-bottom: 20px;
    }
  }
</style>
