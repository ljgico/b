<template>
  <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller" class="myscroller">
	<div>
		<div class="lbloading" v-if="isloading">
			<div class="loading">正在加载</div>
		</div>
		<div id="slider">
			<swiper :options="swiperOption">
				<swiper-slide v-for="item in bannerList" :key="item.imageUrl">
          <img :src="item.imageUrl" class="banner-item"  alt="">
        </swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
    <!-- 菜单 -->
    <el-row :gutter="10">
      <el-col :span="6" v-for="item in menuList" :key="item.imageUrl"><div class="grid-content bg-purple">{{item.name}}</div></el-col>

      <el-col v-if="ismore" :span="6">
        <div class="grid-content bg-purple">
          <el-button v-if="moremenustyle" @click="moremenu" type="text" size="medium" icon="el-icon-caret-bottom" class="el-col-24"></el-button>
          <el-button v-else @click="moremenu" type="text" size="medium" icon="el-icon-caret-top" class="el-col-24"></el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 经典必听 -->
    <div class="jdbt">
      <div class="title">
        <el-row :gutter="10">
          <el-col :span="12"><div class="title-s">经典必听</div></el-col>
          <el-col :span="12" align="right"><a :href="'http://www.baidu.com'" class="more-s">更多<i class="el-icon-arrow-right"></i></a></el-col>
        </el-row>
      </div>
      <div class="content">
        <el-row :gutter="10">
          <el-col :span="8"  v-for="item in jjbtList" :key="item.imageUrl">
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
    <div class="xbtj">
      <div class="title">
        <el-row :gutter="10">
          <el-col :span="12"><div class="title-s">小编推荐</div></el-col>
          <el-col :span="12" align="right"><a :href="'http://www.baidu.com'" class="more-s">更多<i class="el-icon-arrow-right"></i></a></el-col>
        </el-row>
      </div>
      <div class="content">
        <el-row :gutter="10">
          <el-col :span="8"  v-for="item in xbtjList" :key="item.imageUrl">
              <div :style="{height:jdbtwidth}" ref="imgHeight" class="imgHeight">
                <div class="bar"><i class="el-icon-caret-right"></i>{{item.playCount | formatCount}}</div>
                <img @load="imageLoaded" class="item-img img-response" :src="item.picUrl">
              </div>
              <div class="name">{{item.name}}</div>
              <div style="-webkit-line-clamp:2;-webkit-box-orient:vertical;" class="copywriter">{{item.copywriter}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="line1"></div>
    <div class="ls">
      <div class="title">
        <el-row :gutter="10">
          <el-col :span="12"><div class="title-s">历史</div></el-col>
        </el-row>
      </div>
      <div class="content">
        <el-row :gutter="10" v-for="item in lsList" :key="item.imageUrl">
          <el-col :span="6">
            <div :style="{height:jdbtwidth_ls}" ref="imgHeight_ls" class="imgHeight">
              <img @load="imageLoaded" class="item-img img-response" :src="item.picUrl">
            </div>
          </el-col>
          <el-col :style="{height:jdbtwidth_ls}" :span="18" class="right" >
            <div class="name">{{item.name}}</div>
            <div class="copywriter">{{item.copywriter}}</div>
            <div class="bar2"><i class="el-icon-caret-right"></i>{{item.playCount | formatCount}}</div>
          </el-col>
          <el-col :span="18" :offset="6" class="line2">
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="line1"></div>
    <div class="rmzb">
      <div class="title">
        <el-row :gutter="10">
          <el-col :span="12"><div class="title-s">热门主播</div></el-col>
          <el-col :span="12" align="right"><a :href="'http://www.baidu.com'" class="more-s">更多<i class="el-icon-arrow-right"></i></a></el-col>
        </el-row>
      </div>
      <div class="content">  
        <el-row :gutter="10">
          <swiper :options="swiperOption2">
            <swiper-slide v-for="item in hotspeakList" :key="item.imageUrl" class="icon_name">
              <img :src="item.imageUrl" class="item-img img-response br-50" alt="">
              <div class="name">{{item.name}}</div>
              <div class="copywriter">{{item.copywriter}}</div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </el-row>
      </div>
    </div>
    <div class="line1"></div>
    <div class="twzs">
      <div class="title">
        <el-row :gutter="10">
          <el-col :span="12"><div class="title-s">Tonight.听完再睡</div></el-col>
          <el-col :span="12" align="right"><a :href="'http://www.baidu.com'" class="more-s">更多<i class="el-icon-arrow-right"></i></a></el-col>
        </el-row>
      </div>
      <div class="content">
        <el-row :gutter="10" v-for="item in hotspeakList" :key="item.imageUrl">
          <el-col :span="24" class="copywriter el-icon-service">&nbsp;&nbsp;{{item.copywriter}}</el-col>
        </el-row>
      </div>
    </div>
    <div class="line1"></div>
    <div class="wntj">
      <div class="title">
        <el-row :gutter="10">
          <el-col :span="12"><div class="title-s">为你推荐</div></el-col>
        </el-row>
      </div>
      <div class="content">
        <el-row :gutter="10" v-for="item in infiniteItemsL" :key="item.imageUrl">
          <el-col :span="6">
            <div :style="{height:jdbtwidth_ls}" ref="imgHeight_ls" class="imgHeight">
              <img @load="imageLoaded" class="item-img img-response" :src="item.picUrl">
            </div>
          </el-col>
          <el-col :style="{height:jdbtwidth_ls}" :span="18" class="right" >
            <div class="name">{{item.name}}</div>
            <div class="copywriter">{{item.copywriter}}</div>
            <div class="bar2"><i class="el-icon-caret-right"></i>{{item.playCount | formatCount}}</div>
          </el-col>
          <el-col :span="18" :offset="6" class="line2">
          </el-col>
        </el-row>
      </div>
    </div>
	</div>
</scroller>
</template>
<style>
.myscroller{
  padding-top: 110px;
}
.twzs .content .el-row{
  margin-bottom: 5px;
  margin-top: 5px;
}
.twzs .content .copywriter{
  color: #999999;
  font-size: 14px;
  height: auto;
}
.rmzb .content .copywriter{
  height: 20px;
}
.rmzb .content .name{
  font-size: 14px;
  white-space: normal;
  height: 20px;
  font-weight: normal;
}
.icon_name{
  display: flex;
  flex-direction: column;
}
.rmzb .swiper-slide img{
  border-radius: 50%;
}
.rmzb .content .swiper-container{
  width: 100%;
  height: 100%;
}
.rmzb .content .swiper-slide{
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}
.ls .content .right,.wntj .content .right{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
}
.line1{
  background-color: #f3f4f4;
  height: 10px;
}
.line2{
  background-color: #e8e8e8;
  height: 1px;
}
.class1{
  color:#d96b50;
}
.fw-b{
  font-weight: bold;
}
.changesome button{
  border-radius: 20px;
}
.ls .content .name,.wntj .content .name{
  font-size: 16px;
}
.content .name{
  font-weight: bold;
  overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 5px;
    margin-bottom: 5px;
}
.ls .content .copywriter,.wntj .content .copywriter{
  color: #999999;
  font-size: 12px;
  height: auto;
}
.wntj .content .copywriter{
  width: 90%;
  overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.content .copywriter{
  color: #999999;
  font-size: 12px;

  overflow:hidden;
text-overflow: ellipsis;
display:-webkit-box;
height: 32px;
}
.jdbt .content .imgHeight,.xbtj .content .imgHeight{
  position: relative;
  display: flex;
}
.jdbt .content .imgHeight img,.xbtj .content .imgHeight img,.ls .content .imgHeight img,.wntj .content .imgHeight img{
  border-radius: 5px;
}
.title .el-row{
  margin-bottom: 0;
}
.bar{
  position: absolute;
  color: #fff;
  bottom: 2px;
}
.bar2{
  color: #999999;
}
.imgHeight{
  overflow: hidden;
  display: flex;
}
.img-response{
  max-width: 100%;
  height: auto;
}
.more-s{
  font-size: 12px;
  color: #999;
}
.title-s{
  font-size: 16px;
  font-weight: bold;
}
.el-row {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .bg-purple-dark {
    background: #f3f4f4;
  }
  .bg-purple {
    background: #f3f4f4;
  }
  .bg-purple-light {
    background: #f3f4f4;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f3f4f4;
  }

.banner-item {
    width: 90%;
    height: 7.4rem;
    background: url('../../static/banner-item-load.png') no-repeat;
    background-size: cover;
  }
.swiper-slide{
  display: flex;
  justify-content: center;
}
.swiper-slide img{
  border-radius: .2rem;
}
</style>
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
      swiperOption2: {
        slidesPerView: 3.5,
        spaceBetween: 40,
        freeMode: true,
        paginationClickable: true
        // autoplay: 5000
      },
      isloading: true,
      ismore: true, // 是否显示更多按钮
      moremenustyle: true, // 是否显示更多按钮
      bannerList: [],
      menuList: [],
      jjbtList: [],
      xbtjList: [],
      lsList: [],
      hotspeakList: [],
      data: [],
      jdbtwidth: '',
      jdbtwidth_ls: '',
      // 上拉下滑参数
      offset: 0,
      infiniteItems: [],
      infiniteItemsL: [],
      infiniteLength: '',
      noData: false
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {
    this.loadData()
  },
  methods: {
    /**
     * 加载所有数据
     * @author javaSwing
     */
    loadData () {
      /* this.$http.get('请求地址')来发送请求 */
      /* 获取推荐歌单 */
      /* 获取banner */
      let bannerList = this.$http.get(api.getChildBannerList())
      let menuList = this.$http.get(api.getChildMenuList())
      let jjbtList = this.$http.get(api.getChildJDBTList())
      let xbtjList = this.$http.get(api.getChildJDBTList())
      let lsList = this.$http.get(api.getChildJDBTList())
      let hotspeakList = this.$http.get(api.getHotSpeakList())
      /*  Promise.all可以将多个Promise实例包装成一个新的Promise实例 */
      Promise.all([menuList, bannerList, jjbtList, xbtjList, lsList, hotspeakList]).then(data => {
        this.data = data
        this.bannerList = data[1].banners
        this.jjbtList = data[2].result.length > 3 ? data[2].result.slice(0, 3) : data[2].result
        this.xbtjList = data[3].result.length > 6 ? data[3].result.slice(3, 9) : data[3].result
        this.lsList = data[4].result.length > 6 ? data[4].result.slice(9, 12) : data[4].result
        this.hotspeakList = data[5].banners.length > 6 ? data[5].banners.slice(0, 6) : data[5].banners
        this.menuList = data[0].menu.length > 7 ? data[0].menu.slice(0, 7) : data[0].menu
        this.isloading = false
        // this.qnm()
      })
    },
    // 下拉刷新
    refresh (done) {
      setTimeout(() => {
        this.loadData()
        this.offset = 0
        this.infiniteItemsL = []
        this.getDate(this.offset, done)
        this.$refs.myscroller.finishPullToRefresh() // 刷新完毕关闭刷新的转圈圈
      }, 1500)
    },
    // 上滑加载更多
    infinite (done) {
      if (this.noData) {
        this.$refs.myscroller.finishInfinite(2)
        return
      } else {
        setTimeout(() => {
          this.offset++    // 每当向上滑动的时候就让页数加1
          this.getDate(this.offset, done)
          done()
        }, 1500)
      }
    },
    getDate (offset, fn) {
      console.log(this.offset)
      let infiniteItems = this.$http.get(api.getChildJDBTList())
      Promise.all([1, infiniteItems]).then(data => {
        this.data = data
        this.infiniteLength = data[1].result.length
        // 每次加载三个
        this.infiniteItemsL = this.infiniteItemsL.concat(data[1].result.slice((this.offset - 1) * 3, (this.offset - 1) * 3 + 3))
        console.log('个数', (this.offset - 1) * 3 + 3)
        // 如果加载的个数大于接口个数，那么就加载完
        if ((this.offset - 1) * 3 + 3 >= this.infiniteLength) {
          this.noData = true
        }
      })
    },
    // 图片加载完成后 ，图片显示正方形
    imageLoaded () {
      this.jdbtwidth = this.$refs.imgHeight[0].getBoundingClientRect().width + 'px'
      this.jdbtwidth_ls = this.$refs.imgHeight_ls[0].getBoundingClientRect().width + 'px'
    },
    // 随机
    changesome () {
      let arr = this.data[2].result
      let newarr = []
      for (var i = 0; i < 3; i++) {
        let num = Math.floor(Math.random() * arr.length)
        // 如果数组中有相同的元素，则返回
        if (newarr.indexOf(arr[num]) !== -1) {
          return
        }
        newarr.push(arr[num]) // 将随机数加入到数组中
      }
      this.jjbtList = this.data[2].result.length > 3 ? newarr : this.data[2].result
    },
    // 显示更多菜单
    moremenu () {
      if (this.moremenustyle) {
        this.moremenustyle = false
        this.menuList = this.data[0].menu
      } else {
        this.moremenustyle = true
        this.menuList = this.data[0].menu.length > 7 ? this.data[0].menu.slice(0, 7) : this.data[0].menu
      }
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
