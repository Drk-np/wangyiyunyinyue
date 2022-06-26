<template>
  <div class="page">
    <el-carousel :interval="4000" type="card" height="150px">
      <el-carousel-item class="image-item" v-for="(item,index) in banners" :key="index">
        <el-image class="image" :src="item.pic"></el-image>
      </el-carousel-item>
    </el-carousel>
    <h3>推荐歌单 <i class="el-icon-arrow-right"></i></h3>
    <div class="box">
      <musicRd class="music-card"/>
      <music-card class="music-card" v-for="(item,index) in personalizedList" :key="index" :baseContent="item"/>
    </div>

    <h3>热门博客<i class="el-icon-arrow-right"></i></h3>
    <h3>独家放送<i class="el-icon-arrow-right"></i></h3>
    <h3>最新音乐<i class="el-icon-arrow-right"></i></h3>
    <h3>主题播客<i class="el-icon-arrow-right"></i></h3>
    <h3>推荐MV<i class="el-icon-arrow-right"></i></h3>
    <h3>听听<i class="el-icon-arrow-right"></i></h3>
    <h3>看看<i class="el-icon-arrow-right"></i></h3>
  </div>
</template>

<script>
import {getmusic, getPersonalized} from "@/utils/api";
import musicCard from '@/components/musicCard/musicCard';
import musicRd from '@/components/musicRecommended/musicRecommended';

export default {
  name: "recommendation",
  data() {
    return {
      banners: [], //首页轮播图
      personalizedList: []
    }
  },
  components: {
    musicCard,
    musicRd
  },
  created() {
    this.getmusic()
    this.getPersonalized()
  },
  mounted() {
  },
  methods: {
    async getmusic() {
      const res = await getmusic()
      this.banners = res.data.blocks[0].extInfo.banners
      console.log(res);
    },
    async getPersonalized() {
      const res = await getPersonalized({
        limit: 9
      })
      if (res.code == 200) {
        this.personalizedList = res.result
      }
    }
  }
}
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  color: white;
}

.page h3 {
  text-align: left;
  cursor: pointer;
}

.image {
  border-radius: 10px;
  width: 382px;
  height: 150px;
}

.image-item {
  border-radius: 10px;
  overflow: hidden;
}

.box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
}



</style>
