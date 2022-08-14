<template>
  <div class="image-block" @click="getContent">
    <el-image lazy :src="imgUrl===''?baseContent.picUrl:baseContent[imgUrl]" fit="fill">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <i class="el-icon-video-play"></i>
    <p class="title">
      {{ baseContent.name }}
    </p>
    <p v-if="isShowAuther" class="auther">
      <i class="el-icon-user"> </i> <span>{{ baseContent.creator.nickname }} </span>
      <img width="12px" v-if="baseContent.creator.avatarDetail!=='null'"
           :src="baseContent.creator.avatarDetail?baseContent.creator.avatarDetail.identityIconUrl:''"
           alt="">
    </p>
    <i class=" el-icon-caret-right playCount">{{ playCount }}</i>
  </div>
</template>

<script>
export default {
  name: "musicCard",
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    isShowAuther: {
      type: Boolean,
      default: false
    },
    auther: {
      type: String,
      default: ''
    },
    baseContent: {
      type: Object,
      default: () => {
        return {
          // alg: "featured",
          // canDislike: false,
          // copywriter: null,
          // highQuality: false,
          // id: 7497386368,
          // name: "⛱夏至 | 热烈的夏天太短,每一秒都值得相爱",
          // picUrl: "https://p1.music.126.net/YUenycafp2YJB1hNoCwYbQ==/109951167570577086.jpg",
          // playCount: 1911,
          // trackCount: 40,
          // trackNumberUpdateTime: 1655692492496,
          // type: 0
        }
      }
    }
  },
  methods: {
    getContent() {
      this.$router.push({
        name: 'menuMusicList',
        query: {
          id: this.baseContent.id
        }
      })
    }
  },

  computed: {
    playCount() {
      if (!this.baseContent.playCount) return ''
      var str_num
      if (this.baseContent.playCount >= 1E4 && this.baseContent.playCount < 1E8) {
        str_num = parseInt(this.baseContent.playCount / 1E4)
        return str_num + '万'

      } else if (this.baseContent.playCount >= 1E8) {
        str_num = parseInt(this.baseContent.playCount / 1E8)
        return str_num + '亿'
      } else { //一万以下
        return this.baseContent.playCount + '次'
      }
    }
  }

}
</script>

<style scoped>
.image-block {
  width: 140px;
  position: relative;
}

.el-image {
  width: 140px;
  height: 140px;
  border-radius: 10px;
  cursor: pointer;
}

.el-image:hover + .el-icon-video-play {
  visibility: visible;
  opacity: 1;
}

.el-icon-video-play {
  font-size: 25px;
  color: #C20C0C;
  position: absolute;
  bottom: 55px;
  left: 110px;
  background: white;
  /*filter: blur(5px);*/
  backdrop-filter: blur(5px);
  border-radius: 50%;
  z-index: 99;
  visibility: hidden;
  transition: visibility 0.7s, opacity 0.7s;
  opacity: 0;
  cursor: pointer;
}

.el-icon-video-play:hover {
  visibility: visible;
  opacity: 1;
}

.playCount {
  display: inline-block;
  width: 100px;
  font-style: normal;
  font-size: 12px;
  position: absolute;
  top: 6px;
  left: 36px;
  text-align: right;
  cursor: pointer;
}

.title {
  display: block;
  font-size: 12px;
  width: 140px;
  word-wrap: normal;
  text-align: left;
  margin-bottom: 10px;
  height: 33px;
  overflow: hidden;
}

.auther {
  position: absolute;
  bottom: 42px;
  left: 5px;
  font-size: 12px;
  width: 140px;
  word-wrap: normal;
  text-align: left;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

}

.auther span {
  width: 40%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}
</style>
