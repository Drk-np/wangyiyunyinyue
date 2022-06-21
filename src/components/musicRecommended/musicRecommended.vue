<template>
  <div class="image-block">
    <div class="content-title">
      根据您的音乐口味生成每日更新
    </div>
    <div class="el-image">
      <i class="el-icon-star-off"></i>
      <p>{{ cureentTime }}</p>
    </div>
    <i class="el-icon-video-play"></i>
    <p class="title">
      每日歌曲推荐
    </p>
  </div>
</template>

<script>
export default {
  name: "musicRecommended",
  data() {
    return {
      cureentTime: new Date().getDate()
    }
  },
  computed: {}

}
</script>

<style scoped>
.image-block {
  width: 140px;
  position: relative;
  overflow: hidden;
}

.el-image {
  width: 140px;
  height: 140px;
  border-radius: 10px;
  cursor: pointer;
  background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
}

.el-image:hover ~ .el-icon-video-play {
  visibility: visible;
  opacity: 1;
}

.image-block:hover .content-title {
  transform: translateY(45px);
  /*font-size: 14px !important;*/
}


.content-title {
  font-size: 12px;
  text-align: left;
  padding: 5px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 99;
  cursor: pointer;
  top: -45px;
  transition: transform 0.5s 0.7s;

}

.el-icon-video-play {
  font-size: 25px;
  color: #C20C0C;
  position: absolute;
  bottom: 49px;
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

.playCount {
  display: inline-block;
  width: 100px;
  font-style: normal;
  font-size: 12px;
  position: absolute;
  top: 6px;
  left: 36px;
  text-align: right;
}

.title {
  display: block;
  font-size: 12px;
  width: 140px;
  word-wrap: normal;
  text-align: left;
  margin-bottom: 10px;
}

.el-icon-star-off{
  font-size: 138px;
}
.el-icon-star-off ~ p{
  position: relative;
  top: -88px;
  font-size: 40px;
}
</style>
