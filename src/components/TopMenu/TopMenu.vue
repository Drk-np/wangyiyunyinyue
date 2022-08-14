<template>
  <div class="TopMenu">
    <ul>
      <li :class="{active:currentActive===index}" @click="pathTo(item.path,index)" v-for="(item,index) in menulist">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TopMenu",
  data() {
    return {
      currentActive: 0,
      menulist: [
        {title: '个性推荐', path: '/home/recommendation'},
        {title: '歌单', path: '/home/musicList'},
        // {
        //   title: '主播电台',
        //   path: '/home/theShostStation'
        // },
        {
          title: '排行榜',
          path: '/home/rankingList'
        },
        {
          title: '歌手',
          path: '/home/rankingList'
        },
        {
          title: '最新音乐',
          path: '/home/rankingList'
        }, ]
    }
  },
  methods: {
    pathTo(path, index) {
      if (index === this.currentActive) return
      this.currentActive = index
      this.$router.push(path)
    }
  },
  destroyed() {
    this.index == null
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
  transition: all 0.5s;
  cursor: pointer;
}

.active {
  color: #bababa;
  font-size: 18px !important;
}
</style>
