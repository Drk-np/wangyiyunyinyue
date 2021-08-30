<template>
  <div slot="header" class="clearfix card">
    <el-button size="mini" style="float: left;background: #fff" icon="el-icon-close" round></el-button>
    <div class="QRlogin">
      <p class="QRhead"> 扫码登录</p>
      <el-image
      style="width: 170px; height: 170px"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      fit="fill"></el-image>
      <p class="Applogin">使用<el-link href="https://music.163.com/#/download" target="_blank" :underline="false" type="primary">网易云音乐APP</el-link>扫码登录</p>
      <el-link class="footer" :underline="false">用其他方式登录></el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginCard"

}
</script>

<style scoped>
.card{
    position: absolute;
    top: 70px;
    left: 300px;
    float: left;
    width: 350px;
    height: 530px;
    z-index: 99;
    background: #ffffff;
    border-radius: 12px;
}
.card .el-button{
  position: absolute;
  top: 10px;
  left: 10px;
  border: 0;
  width: 8px;
  height: 8px;
  padding: 0;
  margin: 0;
}
.card .el-button--mini{
  font-size: 16px;
}
.card .QRhead{
  margin: 100px 0 30px 0;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 26px;
  line-height: 26px;
}
.card .Applogin{
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  margin: 0 auto;
}
.el-image{
  display: block;
  text-align: center;
  margin: 0 auto 20px;

}
.card p{
  width: 100%;
}

.footer{
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 60px;
}
.footer :hover{
  color: #2d2d2d;
}
</style>