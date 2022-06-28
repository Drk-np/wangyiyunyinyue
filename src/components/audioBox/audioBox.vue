<template>
  <div ref="div">
    <div class="progress-bar" ref="progressBar">
      <el-slider :step="0.01" v-model="percentage" @change="percentageChange"
                 :show-tooltip="false"></el-slider>
      <!--      <div :style="{width:percentage/100*progressBarWidth+'px'}" class="bar"></div>-->
      <!--      <div ref="ball" class="ball" @mouseup="mouseup" @mousedown="ballDrag" @mouseout="mouseup"></div>-->
    </div>
    <div class="audio-box">
      <div class="left-block"><img class="audio-image"
                                   src="https://p2.music.126.net/oS3ZLQ66uGPMnnOJDzDlBw==/19093019417022416.jpg"
                                   alt="">
        <div>
          <div class="music-name-block"><p class="music-name">{{ currentMusic.name }}<span>{{currentMusic.subtitle===undefined?'':(currentMusic.subtitle)}}</span></p>
            <p>-</p>
            <p class="music-singer">{{currentMusic.author}}</p></div>
          <div class="time"> {{ currentTime }} / {{ totalDuration }}</div>
        </div>
      </div>
      <div class="center-block">
        <div class="iconfont icon-shoucang"></div>
        <!--      <div class="iconfont icon-shoucang1"></div>-->
        <div class="iconfont icon-shangyishou"></div>
        <div class="iconfont icon-bofang" v-show="playing" @click="pause"></div>
        <div class="iconfont icon-bofang2" v-show="!playing" @click="play"></div>
        <div class="iconfont icon-xiayishou"></div>
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
      <audio id="player" v-show="false" ref="player" @canplay="canPlay" crossorigin="anonymous" :src="currentMusic.url"></audio>
    </div>
  </div>
</template>

<script>

import {playcount} from '@/utils/api'
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'audioBox',
  props: {
    flat: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapGetters(['currentMusic'])
  },
  data() {
    return {
      firstPlay: true,
      isMuted: false,
      loaded: false,  // 加载完成
      percentage: 0,  //音乐百分比
      currentTime: '00:00:00',
      audio: undefined,
      totalDuration: 0,
      playerVolume: 0.5,
      playing: false,
      progressBarWidth: 0,
      moveStart: 0,
      moveStop: 0,
      isFirst: true,
    }
  },
  async mounted() {
    this.audio = this.$refs.player;
    this.progressBarWidth = this.$refs.progressBar.offsetWidth
    this.init();
    this.$bus.$on('setNewMusic', this.getMusicInfo)
  },
  methods: {
    ...mapActions(['setCurrentMusic']),

    /**
     * 获取歌曲详情 url
     */
    async getMusicInfo(song) {
      let res = await playcount({id: song.id})
      console.log(res)
      if (res.code === 200) {
        let music = res.data[0]
        this.percentage = 0
        this.setCurrentMusic({
          url: music.url,
          name: music.name,
          subtitle:music.alia[0].name,
          author: music.ar[0].name,
          musicId: music.id,
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
      if (minute == 0) {
        minute = '00';
      } else if (minute < 10) {
        minute = '0' + minute;
      }
      if (sec.length == 1) {
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
      // if (this.playing) return
      this.audio.play().then(_ => {
            this.playing = true
            this.paused = false
          }
      )

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
  width: 155px;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
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
</style>
