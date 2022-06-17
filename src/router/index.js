import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import( '@/views/home/Home.vue'),
        children: [
            {//个性推荐
                path: '/home/recommendation',
                name: 'recommendation',
                component: () => import('@/views/recommendation/recommendation.vue')
            },
            {//歌单
                path: '/home/musiclist',
                name: 'musiclist',
                component: () => import('@/views/musicList/musiclist')
            },
            {//电台
                path: '/home/theShostStation',
                name: 'theShostStation',
                component: () => import( '@/views/theHostStation/theHostStation')
            },
            {//排行榜
                path: '/home/rankingList',
                name: 'rankingList',
                component: () => import( '@/views/rankingList/rankingList.vue')
            }

        ]
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
