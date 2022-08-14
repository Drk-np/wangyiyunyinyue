<template>
  <div class="User">
    <div class="unlogin" v-show="userInfo.userId==''" @click="showLoginBtn">
      <el-avatar :size="40" :src="unloginUserHeadUrl" @error="errorHandler"></el-avatar>
      <el-link class="userName" :underline="false">未登录<i class="el-icon-view el-icon-arrow-right"></i></el-link>
    </div>
    <div class="logged" v-show="userInfo.userId!=''">
      <el-avatar :size="40" :src='userInfo.headUrl' @error="errorHandler"></el-avatar>
      <el-link class="userName" :underline="false">{{ userInfo.nickname }}<i
          class="el-icon-view el-icon-arrow-right"></i></el-link>
    </div>
  </div>

</template>

<script>
import {getUserInfo} from '@/utils/api'
import {mapActions, mapGetters} from "vuex";

export default {
  name: "User",
  data() {
    return {
      unloginUserHeadUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
  computed:{
    ...mapGetters(["userInfo"])
  },
  mounted() {
    this.$bus.$on('test', this.getUserInfo)
  },
  methods: {
    ...mapActions(['saveUserId']),
    errorHandler() {
      console.log('调用了');
      return true
    },
    showLoginBtn() {
      this.$emit('showLoginBtn')
    },
    async getUserInfo(id) {
      let res = await getUserInfo('detail', {uid: id})
      if (res.code === 200) {
        this.saveUserId({
          id:id,
          headUrl: res.profile.avatarUrl,
          nickname: res.profile.nickname
        })
      }
    }
  },
  beforeDestroy() {
    this.$bus.$off('test')
  }
}
</script>

<style scoped>

.userName {
  height: 60px;
}

.User {
  position: relative;
  height: 60px;
  min-width: 140px;
  max-width: 200px;
}

.unlogin, .logged {
  display: flex;
  align-items: center;
  position: relative;
  height: 60px;
  width: 100%;
}

.el-avatar {
  margin-left: 10px;
}

.el-link {
  font-size: 14px;
  margin-left: 10px;
  color: #b0b0b0;
}

.el-link:hover {
  color: #b0b0b0;
}


</style>
