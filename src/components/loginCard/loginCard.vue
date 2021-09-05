<template>
  <div slot="header" class="clearfix card">
    <el-button class="close-button" size="mini" style="float: left;background: #fff" icon="el-icon-close"
               round></el-button>
    <div class="QRlogin" v-show="isQRlogin">
      <p class="QRhead"> 扫码登录</p>
      <el-image
          style="width: 170px; height: 170px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="fill"
          @mouseenter="mouseenter">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <p class="Applogin">使用
        <el-link href="https://music.163.com/#/download" target="_blank" :underline="false" type="primary">网易云音乐APP
        </el-link>
        扫码登录
      </p>
      <el-link class="footer" :underline="false">用其他方式登录></el-link>
    </div>
    <div class="Userlogin" v-show="!isQRlogin">
      <el-image style="width: 260px; height: 84px;margin: 71px auto 42px auto"
                :src="require('@/assets/img/login-phone.jpg')">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <el-form :model="ruleForm" style="width:260px; margin: 0 auto;" :rules="rules" ref="ruleForm"
               class="demo-ruleForm">
        <el-input class="phone-number" placeholder="请输入手机号" v-model="ruleForm.phoneNumber" prefix-icon="el-icon-mobile">
          <template slot="prepend">
            <el-cascader
                class=""
                v-model="value"
                :options="phoneNumberPlace"
                @change="handleChange"></el-cascader>
          </template>
        </el-input>
        <el-form-item prop="desc">
          <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password"
                    prefix-icon="el-icon-lock"></el-input>
        </el-form-item>

        <el-button type="danger" style="width: 100% ;margin-top: 20px">立即创建</el-button>
        <el-link :underline="false" style="width: 100% ;margin-top: 10px">注册</el-link>
        <el-row style="padding: 0 6px;display: flex; justify-content: space-between;margin: 10px 0">
          <el-button icon="icon-weixin" circle></el-button>
          <el-button icon="icon-qq" circle></el-button>
          <el-button icon="icon-weibo" circle></el-button>
          <el-button icon="icon-wangyi" circle></el-button>
        </el-row>
        <el-radio v-model="isAgree" label="1" class="agree">同意
          <el-link :underline="false" style="width: 100% ;">《服务条款》</el-link>
          <el-link :underline="false" style="width: 100% ;">《隐私政策》</el-link>
          <el-link :underline="false" style="width: 100% ;">《儿童隐私政策》</el-link>
        </el-radio>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginCard",
  data() {
    return {
      isAgree: false,
      // 选定的结果
      value: '',
      // 手机号地区列表
      phoneNumberPlace: [],

      // 是否显示二维码登录或 密码登录
      isQRlogin: false,
      // 表单绑定的内容
      ruleForm: {
        phoneNumber: '',
        password: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入11位手机号', trigger: 'blur'}
        ],
        desc: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    setTimeout(() => {
      console.log("11111")
    }, 5000)
  },
  methods: {
    mouseenter() {

    },
    handleChange(value) {
      console.log(value);
    }
  }


}
</script>

<style scoped>

.el-radio {
  position: relative;
  left: -15px;
  margin-top: 30px;
  line-height: 12px;
}

.agree .el-link {
  width: auto !important;
  font-size: 8px;
}

.el-radio__label {
  font-size: 8px;
}

.el-cascader-menu {
  width: 450px;
}

.el-popper {
  position: absolute;
  left: 110px !important;
}

.demo-ruleForm >>> .el-input-group__prepend {
  background-color: #fff;
  padding: 0 0 0 30px;
}

.el-cascader >>> .el-input__inner {
  border: 0;
  padding: 0 26px !important;
}

.phone-number >>> .el-input__inner {
  padding: 0 0 0 15px;
}


.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.demo-ruleForm >>> .el-icon-mobile:before {
  position: relative;
  left: -83px;
}

.card {
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

.close-button {
  position: absolute;
  top: 10px;
  left: 10px;
  border: 0;
  width: 8px;
  height: 8px;
  padding: 0;
  margin: 0;
  font-size: 16px;
}

.card .QRhead {
  margin: 100px 0 30px 0;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 26px;
  line-height: 26px;
}

.card .Applogin {
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  margin: 0 auto;
}

.el-image {
  display: block;
  text-align: center;
  margin: 0 auto 20px;
}

.card p {
  width: 100%;
}

.footer {
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 60px;
}

.footer :hover {
  color: #2d2d2d;
}

.Userlogin {

}
</style>