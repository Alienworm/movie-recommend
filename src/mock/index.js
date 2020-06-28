import Mock from 'mockjs';

// 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
Mock.setup({
  timeout: '200 - 400'
})

const getBaseURL = 'http://localhost:9527/mock';

function signIn (prarms) {
  try {
    const prarmsObj = JSON.parse(prarms.body);
    if (prarmsObj.username !== '' && prarmsObj.password !== '')
      return {code: 200, text: '登录成功'};
    else
      return {code: 404, text: '登录失败'};
  } catch (e) {
    console.log(1);
  }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/movie/getRandomMovie', 'post', (config) => {
  let data = JSON.parse(config.body);
  let movieList = [];
  let moviePoster = [
    'https://img1.doubanio.com/view/photo/raw/public/p2602275468.jpg',
    'https://img1.doubanio.com/view/photo/raw/public/p2527119568.jpg',
    'https://img9.doubanio.com/view/photo/raw/public/p2570905156.jpg',
    'https://img3.doubanio.com/view/photo/raw/public/p2500944103.jpg',
    'https://img9.doubanio.com/view/photo/raw/public/p1036782486.jpg'
  ];
  for (let i = 0; i < data.count; i++) {
    let movie = {
      movieId: Mock.Random.id(), // 电影id
      movieName: Mock.Random.title(2), // 电影名称
      movieDirectors: Mock.Random.name(true), // 电影导演
      movieLeadactors: [Mock.Random.name(), Mock.Random.name(), Mock.Random.name()], // 电影主演
      movieRating: 0.0, // 电影评分
      movieAverating: Mock.Random.float(0, 9, 1, 1), // 电影平均评分
      movieDescription: Mock.Random.paragraph(2), // 电影简介
      movieDuration: Mock.Random.time('HH:mm:ss'), // 电影时长
      movieLanguage: '汉语', // 电影语言
      movieTypes: [Mock.Random.word(), Mock.Random.word(), Mock.Random.word()], // 电影类型
      movieComments: [Mock.Random.paragraph(1), Mock.Random.paragraph(1), Mock.Random.paragraph(1), Mock.Random.paragraph(1), Mock.Random.paragraph(1)], // 电影评论
      movieImage: moviePoster[Mock.Random.integer(0, 4)], // 电影海报
      movieLink: Mock.Random.url('http'), // 电影链接
      movieRatingnum: Mock.Random.integer(0, 100), // 电影评分人数
      movieZone: '中国大陆', // 电影地区
      movieReleaseDate: Mock.Random.date(), // 电影发片时间
    };
    movieList.push(movie);
  }
  return movieList;
}); // 登录
