<template>
  <div slot="header" class="clearfix card">
    <el-button class="close-button" size="mini" style="float: left;background: #fff" icon="el-icon-close"
               round></el-button>
    <div class="QRlogin" v-show="isQRlogin">
      <p class="QRhead"> 扫码登录</p>
      <el-image
          style="width: 170px; height: 170px"
          :src="qrurl"
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
      <el-link class="footer" :underline="false" @click="isQRlogin=!isQRlogin">用其他方式登录></el-link>
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
                v-model="value"
                :props="props"
                :options="phoneNumberPlace"
                @change="handleChange"
            >
              <template v-slot:scope="{ node, data }">
                <span>{{ data.label }}</span>
                <span> ({{ data.value }}) </span>
              </template>
            </el-cascader>
          </template>
        </el-input>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password"
                    prefix-icon="el-icon-lock"></el-input>
        </el-form-item>

        <el-button @click="login" type="danger" style="width: 100% ;margin-top: 20px">登录</el-button>
        <el-link :underline="false" @click="clickroundBtn" style="width: 100% ;margin-top: 10px">注册</el-link>
        <el-row style="padding: 0 6px;display: flex; justify-content: space-between;margin: 10px 0;">
          <el-button icon="icon-weixin" circle @click="clickroundBtn"></el-button>
          <el-button icon="icon-qq" circle @click="clickroundBtn"></el-button>
          <el-button icon="icon-weibo" circle @click="clickroundBtn"></el-button>
          <el-button icon="icon-wangyi" circle @click="clickroundBtn"></el-button>
        </el-row>
        <el-checkbox v-model="isAgree" label="1" class="agree" @click="!isAgree">同意
          <el-link href="https://st.music.163.com/official-terms/service" :underline="false" style="width: 100% ;"
                   target="_blank">
            《服务条款》
          </el-link>
          <el-link href="https://st.music.163.com/official-terms/privacy" :underline="false" style="width: 100% ;"
                   target="_blank">
            《隐私政策》
          </el-link>
          <el-link href="https://st.music.163.com/official-terms/children" :underline="false" style="width: 100% ;"
                   target="_blank">
            《儿童隐私政策》
          </el-link>
        </el-checkbox>
      </el-form>
      <el-button size="mini" type="danger" class="QRloginBtn" @click="qrlogin" round>二维码</el-button>
    </div>
  </div>
</template>


<script>

import {getcountries, login} from '@/utils/api'

export default {
  name: "loginCard",
  data() {
    return {
      // 级联选择器定义
      props: {
        label: 'zh',
        value: 'code'
      },
      // 是否同意条款
      isAgree: false,
      // 选定的结果
      value: [],
      // 手机号地区列表
      phoneNumberPlace: [],
      // 是否显示二维码登录或 密码登录
      isQRlogin: true,
      qrurl: '',
      // 表单绑定的内容
      ruleForm: {
        phoneNumber: '16621272164',
        password: '2442854604',
      },
      rules: {
        phonenumber: [
          {required: true, message: '请输入11位手机号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.qrlogin()

    setTimeout(() => {
      console.log("11111")
    }, 5000)
  },
  methods: {
    mouseenter() {

    },
    // 获取国家列表
    async getcountries() {
      this.phoneNumberPlace = []
      let {data: res} = await getcountries()
      res.map((item) => {
        this.phoneNumberPlace.push(...item.countryList)
      })
      this.value = this.phoneNumberPlace[0].code
    },
    // 调用手机密码登录
    async login() {
      if (this.isAgree == false) {
        this.$message.warning('请允许条款')
        return
      }
      let res = await login('cellphone/', {
        phone: this.ruleForm.phoneNumber,
        password: this.ruleForm.password,
        countrycode: this.value
      })
      if (res.code != 200) {
        this.$message.error(res.msg)
      }
      this.$message.success('恭喜你，登陆成功！')
      console.log(res)

    },
    clickroundBtn() {
      this.$message.error('ε=(´ο｀*)))唉~功能还在开发中~')
    },
    handleChange(value) {
      console.log(value);
    },
    async qrlogin() {
      this.isQRlogin = true
      // 获取二维码
      let timenow = Date.now()
      let key = await login('qr/key', {
        timerstamp: timenow,
        withCredentials: true, //关键
      })
      console.log(key)
      let {data: url} = await login('qr/create', {
        key: key.data.unikey,
        qrimg: true,
        timerstamp: Date.now(),
        withCredentials: true, //关键
      })
      this.qrurl = url.qrimg
      let timer = setInterval(async () => {
        const statusRes = await this.checkStatus(key.data.unikey)
        if (statusRes.code === 800) {
          alert('二维码已过期,请重新获取')
          clearInterval(timer)
        }
        if (statusRes.code === 803) {
          // 这一步会返回cookie
          clearInterval(timer)
          this.$message.success('授权登录成功')
        }
      }, 3000)
    },

    async checkStatus(key) {
      const res = await login(
          `qr/check`,
          {
            key,
            timerstamp: Date.now(),
            withCredentials: true, //关键}
          })
      return res
    }

  }


}
</script>

<style scoped>
.QRloginBtn {
  position: absolute;
  top: 10px;
  right: 10px;
}


>>> .el-input__prefix {
  transition: all 0s !important;
}

.el-button.is-circle {
  padding: 8px;
}

.el-checkbox {
  position: relative;
  left: -15px;
  margin-top: 30px;
  line-height: 12px;
  font-size: 8px !important;
  -webkit-transform: scale(0.8) !important;
}

.el-checkbox .el-link {
  width: auto !important;
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
  min-width: 52px !important;
  padding: 0 24px 0 0 !important;
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