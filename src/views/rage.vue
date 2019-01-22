<template>
  <scroller :on-refresh="refresh" ref="myscroller" class="myscroller">
    <div>
      <!-- 海报轮播 -->
      <div id="">
      	<swiper :options="swiperOption3" class="swiperOption3">
          <swiper-slide v-for="item in bannerList" :key="item.imageUrl">
            <img :src="item.imageUrl" class="banner-item3"  alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <swiper :options="swiperOption">
          <swiper-slide v-for="item in bannerList" :key="item.imageUrl">
            <img :src="item.imageUrl" class="banner-item"  alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!-- 菜单 -->
      <div class="menu">
        <el-row :gutter="10">
          <el-col v-for="item in menuList" :key="item.name">
            <img style="width:60%" :src="item.imgurl">
            <div class="text">{{item.name}}</div>
          </el-col>
        </el-row>
      </div>
      <!-- 音乐快报 -->
      <div class="music-bulletin">
        <el-row :gutter="10" class="line3">
          <el-col :span="5" class="title">音乐快报</el-col>
          <el-col :span="16">
            <swiper :options="musicBulletin">
              <swiper-slide v-for="item in musicBulletinList" :key="item.name">{{item.name}}</swiper-slide>
            </swiper>
          </el-col>
          <el-col :span="3" class="more">| 更多</el-col>
        </el-row>
      </div>
      <!-- 猜你喜欢 -->
      <div class="jdbt">
      	<div class="title">
      		<el-row :gutter="10">
      			<el-col :span="12"><div class="title-s">猜你喜欢</div></el-col>
      			<el-col :span="12" align="right"><a :href="'http://www.baidu.com'" class="more-s">更多<i class="el-icon-arrow-right"></i></a></el-col>
      		</el-row>
      	</div>
      	<div class="content">
      		<el-row :gutter="10">
      			<el-col :span="8"  v-for="item in youLoveList" :key="item.imageUrl">
      				<div :style="{height:jdbtwidth}" ref="imgHeight" class="imgHeight">
      					<div class="bar"><i class="el-icon-caret-right"></i>{{item.playCount | formatCount}}</div>
      					<img @load="imageLoaded" class="item-img img-response" :src="item.picUrl">
      				</div>
      				<div class="name">{{item.name}}</div>
      				<div style="-webkit-line-clamp:2;-webkit-box-orient:vertical;" class="copywriter">{{item.copywriter}}</div>
      			</el-col>
      		</el-row>
      		<el-row class="changesome" :gutter="10">
      			<el-col :span="24" align="center">
      				<el-button @click="changesome"><i class="el-icon-refresh class1 fw-b"></i> 换一批</el-button>
      			</el-col>
      		</el-row>
      	</div>
      </div>
	  <div class="line1"></div>
	  <!-- 精品推荐 -->
    <div class="xbtj">
      <div class="title">
        <el-row :gutter="10">
          <el-col :span="12"><div class="title-s">精品推荐</div></el-col>
          <el-col :span="12" align="right"><a :href="'http://www.baidu.com'" class="more-s">更多<i class="el-icon-arrow-right"></i></a></el-col>
        </el-row>
      </div>
      <div class="content">
        <el-row :gutter="10">
          <el-col :span="8"  v-for="item in playList" :key="item.imageUrl">
			<!-- name和路由文件里的name要对应 -->
          	<router-link :to="{name: 'playListDetail_name',params: {id: item.id, name: item.name}}">

              <div :style="{height:jdbtwidth}" ref="imgHeight" class="imgHeight">
                <div class="bar"><i class="el-icon-caret-right"></i>{{item.playCount | formatCount}}</div>
                <img @load="imageLoaded" class="item-img img-response" :src="item.picUrl">
              </div>
              <div class="name">{{item.name}}</div>
              <div style="-webkit-line-clamp:2;-webkit-box-orient:vertical;" class="copywriter">{{item.copywriter}}</div>

              </router-link>


          </el-col>
        </el-row>
      </div>
    </div>
	  <div style="height:56px;"></div>


    </div>
  </scroller>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import api from '../api'
export default {
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 5000
      },
      swiperOption3: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 5000
      },
      // 音乐快报
      musicBulletin: {
        paginationClickable: true,
        autoplay: 5000,
        direction: 'vertical'
      },
      // 上拉下滑参数
      offset: 0,
      infiniteItems: [],
      infiniteItemsL: [],
      infiniteLength: '',
      noData: false,
      // loadData
      data: [],
      bannerList: [],
      menuList: [],
      musicBulletinList: [],
      youLoveList: [],
      jdbtwidth: [],
      playList: []
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {
    this.loadData()
  },
  beforeDestroy () {
    console.log('获取宽度', this.$refs.imgHeight[0].width)
  },
  methods: {
    loadData () {
      let bannerList = this.$http.get(api.getChildBannerList())
      let menuList = this.$http.get(api.getmenuList())
      let musicBulletinList = this.$http.get(api.getmusicBulletin())
      let youLoveList = this.$http.get(api.getYouLoveList())
      let playList = this.$http.get(api.getPersonalized())
      Promise.all([bannerList, menuList, musicBulletinList, youLoveList, playList]).then(data => {
        this.data = data
        this.bannerList = data[0].banners
        this.menuList = data[1].menu
        this.musicBulletinList = data[2].lists
        this.youLoveList = data[3].result.length > 6 ? data[3].result.slice(0, 6) : data[3].result
        this.playList = data[4].result.length > 27 && data[4].result.slice(0, 27)
      })
    },
    // 图片加载完成后 ，图片显示正方形
    imageLoaded () {
      this.jdbtwidth = this.$refs.imgHeight[0].getBoundingClientRect().width + 'px'
    },
    // 随机
    changesome2 () {
      let arr = this.data[3].result
      let newarr = []
      for (var i = 0; i < 6; i++) {
        let num = Math.floor(Math.random() * arr.length)
        // 如果数组中有相同的元素，则返回
        if (newarr.indexOf(arr[num]) !== -1) {
          return
        }
        newarr.push(arr[num]) // 将随机数加入到数组中
      }
      this.youLoveList = this.data[3].result.length > 6 ? newarr : this.data[3].result
    },
    // 随机
    changesome () {
      // 创建副本数组concat方法(防止破坏原数组)
      let arr = this.data[3].result.concat()
      let newarr = []
      for (var i = 0; i < 6; i++) {
        let num = Math.floor(Math.random() * arr.length)
        // 如果数组中有相同的元素，则返回
        newarr.push(arr[num]) // 将随机数加入到数组中
        arr.splice(num, 1)
      }
      this.youLoveList = this.data[3].result.length > 6 ? newarr : this.data[3].result
      console.log(arr.length, newarr.length)
    },
    // 下拉刷新
    refresh (done) {
      setTimeout(() => {
        this.loadData()
        this.offset = 0
        // this.infiniteItemsL = []
        // this.getDate(this.offset, done)
        this.$refs.myscroller.finishPullToRefresh() // 刷新完毕关闭刷新的转圈圈
      }, 1500)
    }
  },
  filters: {
    formatCount (v) {
      if (v < 9999) {
        return v
      } else {
        return (v / 10000).toFixed(0) + '万'
      }
    }
  }
}
</script>
<style>
.swiper-container.swiperOption3{
	position:absolute;
	top:0;
}
.banner-item3 {
    width: 100%;
    height: 7.4rem;
    background-size: cover;
}
.music-bulletin .swiper-slide{
	overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align:left;
    justify-content:flex-start;
}
.line3{
	border-top:1px solid #e8e8e8;
	border-bottom:1px solid #e8e8e8;
}
.music-bulletin .swiper-container,.music-bulletin .el-col{
  height:30px;
  line-height:30px;
}
.music-bulletin .title{
	color:#e66d4d;
	font-size:16px;
	font-weight:bold;
}
.music-bulletin .more{
	font-size:14px;
	color:#000;
}
.menu .el-row{
  display:flex;
}
.menu .el-row .el-col{
  text-align:center;
}
.menu .el-row .el-col .text{
  font-size:12px;
}
</style>
