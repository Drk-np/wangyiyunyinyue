<template>
  <div class="home-container">
    <el-container>
      <el-header height="50px">
        <el-row class="router-arrow">
          <!--          <img src="@/assets/img/topbar.png" alt="" class="logo">-->
          <i class="logo"></i>
          <el-button boolean size="mini" icon="el-icon-arrow-left" circle></el-button>
          <el-button boolean size="mini" icon="el-icon-arrow-right" circle></el-button>
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
          <el-button boolean size="mini" icon="el-icon-setting" circle></el-button>
          <el-button boolean size="mini" icon="el-icon-message" circle></el-button>
          <el-button boolean size="mini" icon="el-icon-user" circle></el-button>
          <el-button boolean size="mini" icon="el-icon-copy-document" circle></el-button>
        </el-row>
      </el-header>
      <el-container class="container">
        <el-aside width="200px">
          <user @showLoginBtn="showLoginpage = true"/>
        </el-aside>
        <!--        <el-main>-->
        <div class="main">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>


        <!--        </el-main>-->
      </el-container>
      <el-footer height="60px">Footer</el-footer>
    </el-container>
    <!--   登录页面-->
    <login-card :isShow.sync="showLoginpage" v-show="showLoginpage"/>
  </div>


</template>

<script>
import TopMenu from "@/components/TopMenu/TopMenu";

import User from "@/views/user/User";
import LoginCard from "@/components/loginCard/loginCard";

export default {
  name: "Home",
  components: {
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

.top-menu .el-input {
  width: 150px;
}

.top-menu .el-button {
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

.router-arrow .el-button {
  padding: 0;
  font-size: 20px !important;
}

.router-arrow .el-button + .el-button {
  margin-left: 5px;
}

.container {
  width: 1004px;
  height: 560px;
}

.home-container {
  height: 670px;
  width: 1004px;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 5px;
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
}

.el-aside {
  height: 100%;
  background-color: #202020;
  color: #333;
  text-align: center;
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
  width: 800px;
  padding: 20px;
}

.el-button {
  background: #2d2d2d;
  border: 1px solid #2d2d2d;
  font-size: 16px !important;
  color: #acacac;
}

.el-button:hover {
  background: #373737;
}


</style>
