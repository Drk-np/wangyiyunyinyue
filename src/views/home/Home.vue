<template>
  <div class="home-container">
    <el-container>
      <el-header height="50px">
        <el-row class="router-arrow">
          <!--          <img src="@/assets/img/topbar.png" alt="" class="logo">-->
          <i class="logo"></i>
          <el-button class="top-button" size="mini" icon="el-icon-arrow-left" @click="$router.go(-1)"
                     circle></el-button>
          <el-button class="top-button" size="mini" icon="el-icon-arrow-right" @click="$router.go(1)"
                     circle></el-button>
        </el-row>
        <el-row class="top-menu">
          <top-menu></top-menu>
          <el-input
              size="mini"
              placeholder="搜索"
              v-model="serchinput"
              clearable
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button class="top-button" size="mini" icon="el-icon-setting" circle></el-button>
          <el-button class="top-button" size="mini" icon="el-icon-message" circle></el-button>
          <el-button class="top-button" size="mini" icon="el-icon-user" circle></el-button>
          <el-button class="top-button" size="mini" icon="el-icon-copy-document" circle></el-button>
        </el-row>
      </el-header>
      <el-container class="container">
        <el-aside width="200px">
          <user @showLoginBtn="showLoginpage = true"/>
          <el-menu :default-openeds="['1', '2']" style="text-align: left;border-right:none" background-color="#202020"
                   text-color="#7c7c7c" active-text-color="#D2D2B8" router>
            <el-submenu index="1" style="padding: 0">
              <template slot="title"><i class="el-icon-mobile"></i>创建的歌单</template>
              <el-menu-item class="menueList"
                            v-show="!item.subscribed" :index='"1-"+index' v-for="(item,index) in menueList" :route="{name:'menuMusicList',query:{
                              id:item.id
                            }}"
                            :key="'1-'+index"> {{ item.name }}
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-headset"></i>收藏的歌单</template>
              <el-menu-item v-show="item.subscribed" class="menueList" :index='"2-"+index'
                            v-for="(item,index) in menueList" :key="'2-'+index" :route="{name:'menuMusicList',query:{
                              id:item.id
                            }}">
                {{ item.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <div class="main">
          <keep-alive>
            <router-view v-if="$route.meta.keepalive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepalive"></router-view>

        </div>
        <div class="music-word-box" :class="{cardmove:!boardStatus}">

        </div>
      </el-container>
      <el-footer height="80px">
        <audio-box></audio-box>
      </el-footer>
    </el-container>
    <!--   登录页面-->
    <login-card :isShow.sync="showLoginpage" v-show="showLoginpage"/>

  </div>


</template>

<script>
import TopMenu from "@/components/TopMenu/TopMenu";

import User from "@/views/user/User";
import LoginCard from "@/components/loginCard/loginCard";
import AudioBox from "@/components/audioBox/audioBox";
import {mapGetters} from "vuex";

export default {
  name: "Home",
  components: {
    AudioBox,
    LoginCard,
    User,
    TopMenu
  },
  data() {
    return {
      serchinput: '',
      showLoginpage: false,

    }
  },
  computed: {
    ...mapGetters(['menueList', 'boardStatus'])
  },
  created() {


  }
  ,
  methods: {},
}
</script>
<style scoped>
.top-menu {
  display: flex;
}

.home-container >>> .menueList {
  padding: 0 20px !important;
  height: 36px;
  line-height: 36px;
  overflow: hidden;
  word-wrap: normal;
  text-overflow: ellipsis;
}

.top-menu .el-input {
  width: 150px;
}

.top-menu .top-button {
  font-size: 15px;
  height: 24px;
  width: 24px;
  padding: 0;
  margin: auto 0;
  margin-left: 13px;
}

.top-menu >>> .el-input__inner {
  height: 24px;
  background: #4b4b4b;
  border: 1px solid #4b4b4b;
  border-radius: 10px;
  padding: 0 18px;
  color: #a5a5a5;
}

.top-menu >>> .el-input__icon {
  height: 24px;
  width: 10px;
  line-height: 50px;
  /*margin-top: 13px;*/
  /*position: absolute;*/
  /*top: 11px;*/
}

.top-menu >>> .el-input__suffix {
  position: absolute;
  right: 20px;
}

.logo {
  width: 150px;
  height: 50px;
  margin: 0 16px;
  background: url("../../assets/img/topbar.png") no-repeat 0 0;
  background-size: 180px;
}

.router-arrow {
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
}

.router-arrow .top-button {
  padding: 0;
  font-size: 20px !important;
}

.router-arrow .top-button + .top-button {
  margin-left: 5px;
}

.container {
  width: 1004px;
  height: 560px;
}

.home-container {
  /*height: 670px;*/
  width: 1004px;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 5px;
  overflow: hidden;
}

.el-header {
  background-color: #2d2d2d;
  padding: 0;
  line-height: 50px;
  color: #696969;
  border-radius: 10px 10px 0 0;
  display: flex;
}

/*.el-header:hover {*/
/*  color: #b0b0b0;*/
/*}*/

.el-footer {
  background-color: #252525;
  color: #333;
  text-align: center;
  line-height: 60px;
  border-radius: 0 0 10px 10px;
  z-index: 20;
  padding: 0;
}

.el-aside {
  height: 100%;
  background-color: #202020;
  color: #333;
  text-align: center;
  overflow-y: auto;
  overflow-x: hidden;
}

.el-main {
  background-color: #252525;
  color: #333;
  text-align: center;
  height: 560px;
  width: 800px;
}

.main {
  background-color: #252525;
  color: #333;
  text-align: center;
  height: 560px;
  width: 100%;
  padding: 20px;
  padding-bottom: 0;
  overflow: scroll;
  box-sizing: border-box;
}

.main::-webkit-scrollbar, .el-aside::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0;
}

.main::-webkit-scrollbar-thumb, .el-aside::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: skyblue;
}

.main::-webkit-scrollbar-track, .el-aside::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #252525;
  border-radius: 10px;
}


.top-button {
  background: #2d2d2d;
  border: none;
  font-size: 16px !important;
  color: #acacac;
}

.top-button:hover {
  color: #e5dddd;
  background: #4e4b4b;
}

.top-button:focus {
  color: #e5dddd;
  background: #4e4b4b;
}


.home-container >>> .el-submenu__title {
  padding-left: 10px !important;
}

.music-word-box {
  background-color: #3a3a3a;
  position: fixed;
  width: 100%;
  height: calc(100% - 50px - 80px);
  float: left;
  transition: all 0.5s;
  z-index: 9;
}

.cardmove {
  transform: translateY(100%);
  /*display: none;*/
}

</style>
