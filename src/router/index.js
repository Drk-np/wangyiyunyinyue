import Vue from 'vue'
import VueRouter from 'vue-router'
import page from "@/views/home/Home";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home/recommendation'
    },
    {
        path: '/home',
        name: 'home',
        component: page,
        redirect: '/home/recommendation',
        meta: {keepalive: true,},
        children: [
            {//个性推荐
                path: '/home/recommendation',
                name: 'recommendation',
                component: () => import('@/views/recommendation/recommendation.vue'),
                meta: {keepalive: true,},
            },
            {//歌单
                path: '/home/musiclist',
                name: 'musiclist',
                component: () => import('@/views/musicList/musiclist'),
                meta: {keepalive: true,},
            },
            {//电台
                path: '/home/theShostStation',
                name: 'theShostStation',
                component: () => import( '@/views/theHostStation/theHostStation'),
                meta: {keepalive: true,},
            },
            {//排行榜
                path: '/home/rankingList',
                name: 'rankingList',
                component: () => import( '@/views/rankingList/rankingList.vue'),
                meta: {keepalive: true,},
            }

        ]
    },
    {
        path: '/menuMusicList',
        name: 'musicMenue',
        component: page,
        children: [
            {//歌单
                path: '/menuMusicList/musicMenu',
                name: 'menuMusicList',
                component: () => import('@/views/musicMenu/musicMenu.vue'),
                meta: {
                    keepalive: false,
                    isBack: false,
                }
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
