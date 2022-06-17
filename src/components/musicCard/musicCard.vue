<template>
  <div>
    <el-image :src="imageUrl" fit="fill">
<!--      <div slot="error" class="image-slot">-->
<!--        <i class="el-icon-picture-outline"></i>-->
<!--      </div>-->

    </el-image>
    <i   class="el-icon-video-play"></i>
  </div>
</template>

<script>
export default {
  name: "musicCard",
  props: {
    imageUrl: {
      type: String,
      default: 'https://p2.music.126.net/iEKZn89J72r0yHZYo7fpkA==/109951167523531364.jpg'
    }
  }
}
</script>

<style scoped>
.el-image {
  width: 180px;
  height: 180px;
  border-radius: 10px;
  cursor: pointer;
}
.el-image:hover .el-icon-video-play{
  visibility: visible;
    width: 200px;
  height: 200px;
    font-size: 40px;
}

.el-icon-video-play{
  font-size: 30px;
  color: #C20C0C;
  position: relative;
  top: -10px;
  left: -35px;
  background: white;
  /*filter: blur(5px);*/
  backdrop-filter: blur(5px);
  border-radius: 50%;
  z-index: 99;
  /*visibility: hidden;*/
}
</style>
