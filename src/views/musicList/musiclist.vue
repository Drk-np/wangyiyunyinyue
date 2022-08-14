<template>
  <div class="main-page">
    <div class="jingpin" @click="getContent">
      <div class="xuhuabeijing"
           :style="{background:'url('+highQualityGoods.coverImgUrl+')no-repeat',backgroundSize:'100% 100%',backgroundPosition:'50% 50%'}">
      </div>
      <div class="main-content">
        <el-image :src="highQualityGoods.coverImgUrl" fit="fill">
        </el-image>
        <div class="musiclist-hot">
          <div>
            <el-tag effect="plain" type="warning" hit size="medium" color="inherit">
              <i class="el-icon-trophy"></i> 精品歌单
            </el-tag>
          </div>
          <p>{{ highQualityGoods.name }}</p>
        </div>
      </div>

    </div>
    <div class="chose-tag">
      <div class="all-tag">
        全部歌单<i class="el-icon-arrow-right el-icon--right"></i>
      </div>
      <div class="tag-list">
        <ul>
          <li :class="{active:item.name=== tag}" v-for="(item,index) in hottag" @click="changeTage(item.name)"
              :key="index">{{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="main-footer">
      <div class="music-menue-list">
        <music-card v-for="(item , index) in musicList" :key="index" imgUrl="coverImgUrl" isShowAuther
                    auther="creator.description"
                    :baseContent="item"></music-card>
      </div>
      <el-pagination
          :current-page="pageNum"
          @current-change="changePage"
          :page-size=100
          background
          layout="prev, pager, next"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {playlistCatlist, playlistHot, topPlaylist, topPlaylistHighquality} from "@/utils/api";
import musicCard from '@/components/musicCard/musicCard'

export default {
  name: "musiclist",
  components: {
    musicCard
  },
  data() {
    return {
      tag: '',
      highQualityGoods: {},
      hottag: [],
      musicList: [],
      total: 0,
      pageNum: 2
    }
  },
  mounted() {
    this.getPlaylistCatlist()
    this.getPlaylistHot()
    this.getTopPlaylistHighquality()
    this.getTopPlaylist()
  },
  methods: {
    changePage(pagenum) {
      this.pageNum = pagenum
      this.getTopPlaylist()
    },
    getContent(id) {
      // this.$router.push({
      //   name: 'menuMusicList',
      //   query: {
      //     id: this.baseContent.id
      //   }
      // })
    },
    async getPlaylistCatlist() {
      let res = await playlistCatlist()
      console.log(res)
    },
    async getPlaylistHot() {
      let res = await playlistHot()
      this.hottag = res.tags
      console.log(res)
    },
    async getTopPlaylistHighquality() {
      let res = await topPlaylistHighquality({
        cat: this.tag,
        limit: 1
      })
      this.highQualityGoods = res.playlists[0]
      console.log(res)
    },
    async getTopPlaylist() {

      let res = await topPlaylist({
        offset: this.pageNum,
        cat: this.tag,
        limit: 100
      })
      this.musicList = []
      this.musicList = res.playlists
      this.total = res.total
    },
    changeTage(name) {
      this.pageNum = 1
      this.tag = name
      this.getTopPlaylistHighquality()
      this.getTopPlaylist()
    }
  }
}
</script>

<style scoped>
.main-page {
  width: 100%;
  height: 100%;
}

.jingpin {
  width: 100%;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
}

.xuhuabeijing {
  width: 100%;
  height: 180px;
  filter: blur(30px);
}

.main-content {
  width: 100%;
  height: 140px;
  display: flex;
  position: relative;
  align-items: center;
  top: -160px;
  /*left: 20px;*/
}

.musiclist-hot {
  color: white;
  font-size: 30px;
  flex: 1;
  margin-left: 20px;
  height: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-around;
}

.musiclist-hot div {
  width: auto;
  height: auto;
  font-size: 28px;
  line-height: 28px;
}

.el-image {
  width: 140px;
  height: 140px;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 20px;
}

.chose-tag {
  margin-top: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 12px;
  line-height: 12px;
}

.all-tag {
  color: #b7b7b7;
  font-size: 14px;
  line-height: 20px;
  width: auto;
  height: 20px;
  padding: 6px 8px 6px 17px;
  border: 2px solid #3a3a3a;
  border-radius: 30px;
  cursor: pointer;
}

.all-tag:hover {
  background: #3a3a3a;
}

.tag-list {
  flex: 1;
  color: #727272;
  font-size: 14px;
}

.tag-list ul {
  display: flex;
  justify-content: space-evenly;
}

.tag-list ul li {
  cursor: pointer;
  height: 14px;
  line-height: 14px;
  padding: 8px 3px 0 3px;
  /*background: white;*/
  border-radius: 6px;
}

.active {
  background: #2e2625 !important;
  color: #d33a31 !important;
}

.tag-list ul li:hover {
  color: #b7b7b7;
}

.music-menue-list {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: white;
}

.el-pagination {
  margin-top: 10px;
}

.main-footer {
  padding-bottom: 100px;
}

>>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #d33a31 !important;
  color: #FFF;
}
</style>
