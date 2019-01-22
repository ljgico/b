<template>
    <div>
      <div class="fixed-bar">


        <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
          <mu-tab value="rage" title="推荐"/>
          <mu-tab value="songList" title="vip"/>
          <mu-tab value="leaderBoard" title="小说"/>
          <mu-tab value="hotSinger" title="直播"/>
          <mu-tab value="ertong" title="儿童"/>
        </mu-tabs>

        <el-row class="search">
          <el-col :span="16">
            <el-input class="input" v-model="input" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col class="history" :span="4">
            <span class="icon iconfont yy-02"></span>
          </el-col>
          <el-col class="add" :span="4">
            <span class="icon iconfont yy-01"></span>
          </el-col>
        </el-row>

      
      </div>
      <div class="default-view" :class="{view: songList.length > 0}">
        <keep-alive>
         <router-view></router-view>
        </keep-alive>
      </div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        activeTab: 'rage',
        input: '',
        fixedBackgroundColor: '#bfaa7f'
      }
    },
    created () {
      // 当created函数时监测路由信息,防止页面刷新tab高亮错误
      var tmpArr = this.$route.path.split('/')
      if (tmpArr[1] === 'index') {
        this.handleTabChange(tmpArr[2])
      }
    },
    // watch函数监测路由的变化,保持tab面板的高亮位置正确
    watch: {
      '$route' (to, from) {
        const path = to.path
        var tmpArr = path.split('/')
        if (tmpArr[1] === 'index') {
          this.handleTabChange(tmpArr[2])
        }
      }
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val
        this.$router.push({ path: '/index/' + val })
      }
    },
    computed: {
      ...mapGetters([
        'songList'
      ])
    }
  }
</script>
<style>
  .el-input__inner {
      height: 28px;
    }
</style>
<style lang="less" scoped>
  @import "../assets/theme.less";
  .search .history,.search .add{
  display: flex;
  justify-content: center;
}
  .view-tabs {
    background-color:rgba(0,0,0,0);
    color: rgba(0,0,0,.87);
    >.mu-tab-link {
      color: rgba(102,102,102,1);
    }
    >.mu-tab-active{
      color: @primaryColor;
    }
  }

  .fixed-bar {
    position: fixed;
    width: 100%;
    top:0;
    left: 0;
    z-index: 15;
  }
  .default-view {
    margin-top: 104px;
  }
  .view {
    margin-bottom: 2.3rem;
  }
</style>
