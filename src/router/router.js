/**
 * 整个app的路由设置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/index',
    // 公共头部导航
    component: require('../views/index'),
    // 页面
    children: [
      {
        path: 'rage',
        component: require('../views/rage')
      },
      {
        path: 'songList',
        component: require('../views/songList')
      },
      {
        path: 'leaderBoard',
        component: require('../views/leaderBoard')
      },
      {
        path: 'hotSinger',
        component: require('../views/hotSinger')
      },
      {
        path: 'ertong',
        component: require('../views/ertong')
      }
    ]
  }, {
    name: 'playerDetail',
    path: '/playerDetail/:id',
    component: require('../views/playerDetail')
  },
  /* {
    path: '/playListDetail/:id',
    name: 'playListDetail_name',
    component: require('../views/playListDetail')
  }, */
  {
    path: '/playerList/:id',
    name: 'playListDetail_name',
    component: require('../views/playerList')
  },
  {
    path: '*', redirect: '/index/rage'
  }]
})

export default router
