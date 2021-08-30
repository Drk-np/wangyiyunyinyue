<template>
  <div class="TopMenu">
    <ul>
      <li v-for="item in menulist">
        <a href="">{{ item }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TopMenu",
  data() {
    return {
      menulist: ['个性推荐', '歌单', '主播电台', '排行榜', '歌手', '最新音乐']
    }
  }
}
</script>

<style scoped>
.TopMenu {
  height: 50px;
  width: 490px;
}

.TopMenu ul {
  display: flex;
  height: 100%;
  margin: 0;
  padding: 0;

}

.TopMenu ul li {
  line-height: 50px;
  margin-left: 30px;
  font-size: 14px;
}

.active {
  color: #bababa;
}
</style>