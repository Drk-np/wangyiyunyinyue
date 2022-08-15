<template>
  <div ref="div">
    <div class="progress-bar" ref="progressBar">
      <el-slider :step="0.01" v-model="percentage" @change="percentageChange"
                 :show-tooltip="false"></el-slider>
    </div>
    <div class="audio-box">
      <div class="left-block">
        <el-image class="audio-image" :src="currentMusic.picUrl" alt="">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <div class="img-mask" @mouseleave="closeMusicMarsk"
             @mouseover="showMusicMask" @click="changeMusicboard">
          <div v-show="!boardStatus" class="iconfont icon-jiantou_yemian_xiangshang_o animate__animated"
               :class="{animate__slideOutUp:isShowMusicMask}"></div>
          <div v-show="boardStatus" class="iconfont icon-jiantou_yemian_xiangxia_o animate__animated"
               :class="{animate__slideOutDown:isShowMusicMask}"></div>
        </div>
        <div>
          <div class="music-name-block">
            <p class="music-name">{{ currentMusic.name === '' ? '网易云音乐' : currentMusic.name }}
              <span>{{ currentMusic.subtitle === '' ? '' : (currentMusic.subtitle) }}</span>
            </p>
            <p v-show="currentMusic.author!==''">-</p>
            <p class="music-singer">{{ currentMusic.author }}</p>
          </div>
          <div class="time"> {{ currentTime }} / {{ totalDuration }}</div>
        </div>
      </div>
      <div class="center-block">
        <div class="iconfont icon-shoucang"></div>
        <!--      <div class="iconfont icon-shoucang1"></div>-->
        <div class="iconfont icon-shangyishou" @click="lastSong"></div>
        <div class="iconfont icon-bofang" v-show="playing" @click="pause"></div>
        <div class="iconfont icon-bofang2" v-show="!playing" @click="play"></div>
        <div class="iconfont icon-xiayishou" @click="nextSong"></div>
        <div class="iconfont icon-fenxiang"></div>
      </div>
      <div class="right-block">
        <div>
          <div class="iconfont icon-suijibofang"></div>
          <div class="iconfont icon-shunxubofang"></div>
          <div class="iconfont icon-bofang-xunhuanbofang"></div>
          <div class="iconfont icon-bofangduilie"></div>
          <div class="iconfont icon-laba"></div>
        </div>
      </div>
      <audio id="player" v-show="false" ref="player" @canplay="canPlay" crossorigin="anonymous"
             :src="currentMusic.url"></audio>
    </div>
  </div>
</template>

<script>

import {playcount} from '@/utils/api'
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: 'audioBox',
  props: {
    flat: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapGetters(['currentMusic', 'currentIndex', 'playlist', 'boardStatus']),
  },
  data() {
    return {
      firstPlay: true,
      isMuted: false,
      loaded: false,  // 加载完成
      percentage: 0,  //音乐百分比
      currentTime: '00:00',
      audio: undefined,
      totalDuration: '00:00',
      playerVolume: 0.5,
      playing: false,
      progressBarWidth: 0,
      moveStart: 0,
      moveStop: 0,
      isFirst: true,
      currentMusicIndex: null,
      isShowMusicMask: false
    }
  },
  async mounted() {
    this.audio = this.$refs.player;
    this.progressBarWidth = this.$refs.progressBar.offsetWidth
    this.init();
    this.$bus.$on('setNewMusic', this.getMusicInfo)
  },
  methods: {
    ...mapActions(['setCurrentMusic', 'upDateMusicIndex']),
    ...mapMutations(['CHANGEMUSICBOARDSTATUS']),
    showMusicMask() {
      if (this.isShowMusicMask == true) return
      console.log('1')
      this.isShowMusicMask = true
    },
    closeMusicMarsk() {
      if (this.isShowMusicMask == false) return
      console.log('2')
      this.isShowMusicMask = false
    },
    changeMusicboard() {
      let status = this.boardStatus
      this.CHANGEMUSICBOARDSTATUS(!status)
      console.log(this.boardStatus)
    },
    //上一首
    lastSong() {
      let index = this.currentIndex
      let playlist = this.playlist
      if (index === 0) {
        index = playlist.length - 1
      } else {
        index = index - 1
      }
      this.upDateMusicIndex(index)
      this.getMusicInfo(playlist[index])

    },
    //下一首
    nextSong() {
      let index = this.currentIndex
      let playlist = this.playlist
      if (index === playlist.length - 1) {
        index = 0
      } else {
        index = index + 1
      }
      this.upDateMusicIndex(index)
      this.getMusicInfo(playlist[index])
    },
    /**
     * 获取歌曲详情 url
     */
    async getMusicInfo(song) {
      let res = await playcount({id: song.id})
      if (res.code === 200) {
        let music = res.data[0]
        this.percentage = 0
        this.setCurrentMusic({
          url: music.url,
          name: song.name,
          picUrl: song.al.picUrl,
          subtitle: (song.alia[0] ? music.alia : ''),
          author: song.ar[0].name,
          musicId: song.id,
          isLike: false,
          share: '',
        })
      }
    },

    //格式化时间
    transTime(time) {
      var duration = parseInt(time);
      var minute = parseInt(duration / 60);
      var sec = duration % 60 + '';
      var isM0 = ':';
      if (minute === 0) {
        minute = '00';
      } else if (minute < 10) {
        minute = '0' + minute;
      }
      if (sec.length === 1) {
        sec = '0' + sec;
      }
      return minute + isM0 + sec
    },
    canPlay() {
      // if (this.playing) this.play()
    },
    percentageChange(e) {
      this.audio.currentTime = parseInt(this.audio.duration / 100 * e);
    },
    play() {
      let index = this.currentIndex
      let playlist = this.playlist
      // if (this.playing) return
      this.audio.play().then(_ => {
            this.playing = true
            this.paused = false
          }
      ).catch(err => {
        console.log(err)
        this.getMusicInfo(playlist[0].id)
      })

    },
    pause() {
      this.paused = !this.paused
      this.playing = false
      if (this.paused) {
        this.audio.pause()
      } else {
        this.audio.play()
      }
    },
    mute() {
      this.isMuted = !this.isMuted
      this.audio.muted = this.isMuted
    },
    _handleLoaded: function (e) {
      if (this.audio.readyState >= 2) {
        if (this.audio.duration === Infinity) {
          // this.audio.currentTime = 1e101;
          // this.audio.ontimeupdate = () => {
          //   this.audio.ontimeupdate = () => {
          //   }
          //   this.audio.currentTime = 0
          //   this.totalDuration = parseInt(this.audio.duration)
          //   this.loaded = true;
          // }
        } else {
          this.totalDuration = this.transTime(this.audio.duration)
          this.loaded = true
          this.play()
        }
        // if (this.autoPlay) this.audio.play()
      } else {
        throw new Error('Failed to load sound file')
      }
    },
    _handlePlayingUI: function (e) {
      this.audio.volume = this.playerVolume
      this.percentage = Number(((this.audio.currentTime / this.audio.duration) * 100).toFixed(2))
      this.currentTime = this.transTime(this.audio.currentTime)
      // this.playing = true

    },
    _handlePlayPause: function (e) {
      // if (e.type === 'play' && this.firstPlay) {
      //   // in some situations, audio.currentTime is the end one on chrome
      //   this.audio.currentTime = 0;
      //   if (this.firstPlay) {
      //     this.firstPlay = false;
      //   }
      // }
      if (e.type === 'pause' && this.paused === false && this.playing === false) {
        this.currentTime = '00:00:00'
      }
    },
    _handleEnded() {
      //根据播放模式判断是否下一曲
      // this.paused = this.playing = false;
      this.nextSong()
    },
    init: function () {
      this.audio.addEventListener('timeupdate', this._handlePlayingUI);
      this.audio.addEventListener('loadeddata', this._handleLoaded);
      this.audio.addEventListener('pause', this._handlePlayPause);
      this.audio.addEventListener('play', this._handlePlayPause);
      this.audio.addEventListener('ended', this._handleEnded);
    },
  },

  beforeDestroy() {
    this.audio.removeEventListener('timeupdate', this._handlePlayingUI)
    this.audio.removeEventListener('loadeddata', this._handleLoaded)
    this.audio.removeEventListener('pause', this._handlePlayPause)
    this.audio.removeEventListener('play', this._handlePlayPause)
    this.audio.removeEventListener('ended', this._handleEnded);
    this.$bus.$off('setNewMusic')
  }
}
</script>

<style scoped>
.el-slider {
  margin: 0 auto;
  width: calc(100% - 5px)
}

.audio-box {
  width: 100%;
  height: 78px;
  box-sizing: border-box;
  padding: 15px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 8px;
  color: #7c7c7c;
}

.progress-bar {
  width: 100%;
  height: 2px;
  /*background-color: #0077aa;*/
  display: flex;
  align-items: center;
}

.audio-box div {
  height: 100%;
}

.audio-image {
  height: 50px;
  width: 50px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
}

.left-block {
  width: 330px;
  display: flex;
  align-items: center;
  text-align: left;
  position: relative;
}

.center-block {
  padding: 0 20px;
  box-sizing: border-box;
  width: 260px;
  display: flex;
  color: #d33a31;
  line-height: 50px;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
}

.center-block div {
  font-size: 25px;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 50%;
}

.center-block .icon-bofang, .center-block .icon-bofang2 {
  padding: -100px;
  overflow: hidden;
  font-size: 40px;
  background-color: white;
  border-radius: 50%;
  height: 40px;
  vertical-align: middle;
  line-height: 40px;
  background-clip: content-box;
  /*box-sizing: border-box;*/
}

.center-block .icon-fenxiang {
  font-size: 18px;
}


.right-block {
  width: 330px;
  display: flex;
  justify-content: flex-end;
}

.right-block div {
  width: 100px;
  display: flex;
  border-radius: 50%;
}

.music-name-block {
  display: flex;
  height: 29px !important;
  line-height: 29px;
  font-size: 14px;
  /*overflow: hidden;*/
  cursor: pointer;
}

.music-name {
  max-width: 155px;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
  margin-right: 5px;
}

.music-singer {
  width: 110px;
  height: 100%;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 5px;
}

.time {
  height: 30px !important;
  line-height: 30px;
  text-align: left;
}


.ball {
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background: #d33a31;
  z-index: 99;
  cursor: pointer;
}

.bar {
  height: 2px;
  background: #d33a31;

}

.progress-bar >>> .el-slider__button-wrapper {
  width: 16px;
  height: 16px;
  top: -12px;
}

.progress-bar >>> .el-slider__runway {
  background-color: #4b4b4b;
  height: 2px;
}

.progress-bar >>> .el-slider__bar {
  height: 2px;
  background-color: #d33a31;
}

.progress-bar >>> .el-slider__button {
  height: 14px;
  width: 14px;
  border: 0;
  background-color: #d33a31;
}

.audio-box >>> .image-slot {
  color: white;
  font-size: 25px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 50px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;

}

.img-mask {
  width: 50px;
  height: 50px;
  line-height: 50px;
  position: absolute;
  /*left: -60px;*/
  color: #413e3e;
  background-color: rgba(250, 250, 250, 0.5);
  cursor: pointer;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.5s;
}

.img-mask:hover {
  opacity: 1;
}

.icon-jiantou_yemian_xiangshang_o, .icon-jiantou_yemian_xiangxia_o {
  width: 50px;
  /*height: 50px;*/
  font-size: 50px;
  transition: all 1s;
  animation-iteration-count: infinite;
}


</style>
