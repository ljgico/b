<template>
	<div class="playList" :class="">
		<el-row class="floatTitle" :style="{'background': 'rgba(231, 91, 76, '+ opacity +')'}" style="transition: opacity .1s;">
			<el-col :span="2">
				<div @click="back">
				    <i class="el-icon-arrow-left"></i>
				</div>
			</el-col>
			<el-col :span="20">
				<div>{{listdata.name}}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" class="info" :style="{backgroundImage: 'url('+listdata.coverImgUrl+')'}">
			<el-col :span="8">
				<div style="width:100%;" :style="{height:rightHeight}">
					<img ref="rightHeight" style="width:100%" @load="imageLoaded" :src="listdata.coverImgUrl" alt="">
				</div>
			</el-col>
			<el-col :span="16">
				<div class="text" :style="{height:rightHeight}">
					<div class="title">{{listdata.name}}</div>
					<div class="content">{{listdata.description}}</div>
					<div class="num"><i class="el-icon-caret-right"></i>{{listdata.playCount | formatCount}}</div>
				</div>
			</el-col>
		</el-row>
		<el-row class="listTitle">
			<el-col :span="16" class="left">
				<i class="el-icon-caret-right"></i>
				<div class="playall">播放全部</div>
				<div class="songNum">(共{{list.length}}首)</div>
			</el-col>
			<el-col :span="8" class="right">
				<i class="el-icon-circle-plus-outline">&nbsp;</i>
				<div class="playall">收藏</div>
				<div>(896666)</div>
			</el-col>
		</el-row>
		<el-row class="listContent" v-for="(item , index) in list" :key="item.id">
			<el-col class="num" :span="3">{{index + 1}}</el-col>
			<el-col class="name" :span="15">
				<div class="main" @click="playAudio(item)">{{item.name}}</div>
				<div class="vice">{{item.ar[0].name}}-{{item.al.name}}</div>
			</el-col>
			<el-col class="play" :span="3">
				<i class="el-icon-caret-right"></i>
			</el-col>
			<el-col class="more" :span="3">
				<i class="el-icon-more"></i>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import api from '../api'
// import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            coverImgUrl: '../../static/default_cover.png',
            floatTitleName: '歌单们',
            rightHeight: '',
            opacity: 0,
            list: [],
            listdata: []
        }
    },
    methods: {
        back () {
            this.$router.go(-1)
        },
        get () {
            this.$http.get(api.getPlayListDetail(this.$route.params.id)).then(data => {
                this.list = data.playlist.tracks
                this.listdata = data.playlist
                console.log(data.playlist)
            })
        },
        playAudio (song) {
          document.getElementById('audioPlay').pause()
          this.$store.commit('pause')
          var audio = {}
          audio.id = song.id  // id
          audio.singer = song.ar[0].name // 演唱者
          audio.albumPic = song.al.picUrl
          audio.name = song.name
          // 通过Vuex改变状态
          this.$store.commit('addToList', audio)
          this.$store.dispatch('getSong', audio.id)
        },
        imageLoaded () {
            this.rightHeight = this.$refs.rightHeight.getBoundingClientRect().height + 'px'
        }
    },
    beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (parseInt(to.params.id) !== parseInt(vm.id)) {
         vm.get()
      }
      window.onscroll = () => {
        vm.opacity = window.pageYOffset / 150
      }
    })
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
.listContent{
	display:flex;
	align-items:center;
}
.listContent .name .main{
	font-size:16px;
	font-weight:bold;
}
.listContent .name .vice{
	font-size:14px;
	color:#7d7d7f;
}
.listContent .num ,.listContent .play ,.listContent .more{
	display:flex;
	justify-content:center;
}
.listTitle{
	padding:0;
	margin:0;
	border-bottom:1px solid #e2e2e4;
	margin-top:-20px;
}
.listTitle .left{
	padding-left:10px;
	border-top-left-radius:20px;
	background-color:#fff;
}
.listTitle .left .songNum{
	color:#969799;
}
.listTitle .left .playall,.listTitle .right .playall{
	font-size:16px;
}
.listTitle .right{
	background-color:#e75b4c;
	justify-content:center;
	color:#fff;
	border-top-right-radius:20px;
}
.listTitle .left ,.listTitle .right{
	display:flex;
	flex-direction:row;
	align-items:center;
	padding-top:14px;
	padding-bottom:14px;
	margin:0;
}
.floatTitle{
	color: #fff;
}
.playList .info{
	background-color: #fff;
	color: #fff;
	padding-top: 60px;
	padding-bottom: 60px;
	margin:0;
}
.playList .info .text{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.playList .info .text .title{
	font-size:18px;
	font-weight:bold;
	white-space: nowrap;
    text-overflow: ellipsis;
}
.playList .info .text .content{
	background:rgba(0, 0, 0, 0.1);
	padding:10px;
	height:52px;
	overflow: hidden;
}
.floatTitle{
	height: 56px;
	line-height: 56px;
	position:fixed;
	z-index:15;
	width:100%;
	top:0;
	margin:0;
}
.mu-appbar {
      background-color: transparent;
    }
</style>