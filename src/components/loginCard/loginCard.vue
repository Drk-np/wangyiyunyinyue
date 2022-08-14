<template>
  <div slot="header" class="clearfix card">
    <el-button class="close-button" icon="el-icon-close" round size="mini"
               style="float: left;background: #fff"
               @click="closeCard"></el-button>
    <div v-show="isQRlogin" class="QRlogin">
      <p class="QRhead"> 扫码登录</p>
      <el-image
          :src="qrurl"
          fit="fill"
          style="width: 170px; height: 170px">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <p class="Applogin">使用
        <el-link :underline="false" href="https://music.163.com/#/download" target="_blank" type="primary">网易云音乐APP
        </el-link>
        扫码登录
      </p>
      <el-link :underline="false" class="footer" @click="otherLogin">用其他方式登录></el-link>
    </div>
    <div v-show="!isQRlogin" class="Userlogin">
      <el-image :src="require('@/assets/img/login-phone.jpg')"
                style="width: 260px; height: 84px;margin: 71px auto 42px auto">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm"
               style="width:260px; margin: 0 auto;">
        <el-input v-model="ruleForm.phoneNumber" class="phone-number" placeholder="请输入手机号" prefix-icon="el-icon-mobile">
          <template slot="prepend">
            <el-cascader
                v-model="value"
                :options="phoneNumberPlace"
                :props="props"
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
          <el-input v-model="ruleForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock"
                    type="password"></el-input>
        </el-form-item>

        <el-button style="width: 100% ;margin-top: 20px" type="danger" @click="login">登录</el-button>
        <el-link :underline="false" style="width: 100% ;margin-top: 10px" @click="clickroundBtn">注册</el-link>
        <el-row style="padding: 0 6px;display: flex; justify-content: space-between;margin: 10px 0;">
          <el-button circle icon="icon-weixin" @click="clickroundBtn"></el-button>
          <el-button circle icon="icon-qq" @click="clickroundBtn"></el-button>
          <el-button circle icon="icon-weibo" @click="clickroundBtn"></el-button>
          <el-button circle icon="icon-wangyi" @click="clickroundBtn"></el-button>
        </el-row>
        <el-checkbox v-model="isAgree" class="agree" label="1" @click="!isAgree">同意
          <el-link :underline="false" href="https://st.music.163.com/official-terms/service" style="width: 100% ;"
                   target="_blank">
            《服务条款》
          </el-link>
          <el-link :underline="false" href="https://st.music.163.com/official-terms/privacy" style="width: 100% ;"
                   target="_blank">
            《隐私政策》
          </el-link>
          <el-link :underline="false" href="https://st.music.163.com/official-terms/children" style="width: 100% ;"
                   target="_blank">
            《儿童隐私政策》
          </el-link>
        </el-checkbox>
      </el-form>
      <el-button class="QRloginBtn" round size="mini" type="danger" @click="qrlogin">二维码</el-button>
    </div>
  </div>
</template>


<script>

import {getcountries, login} from '@/utils/api'
import {mapActions} from 'vuex'

export default {
  name: "loginCard",
  data() {
    return {
      timer: null,//计时器
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
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShow(isShow) {
      if (isShow) {
        this.getcountries()
        this.qrlogin()
      }
    }
  },
  created() {
  },
  methods: {
    ...mapActions(['saveUserId']),
    closeCard() {
      this.$emit("update:isShow", false);
      clearInterval(this.timer)
    },
    otherLogin() {
      this.isQRlogin = !this.isQRlogin
      clearInterval(this.timer)
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
      if (res.code == 200) {
        this.$message.success('登陆成功')
        // this.saveUserId({id:res.account.id})
        this.$bus.$emit('test', res.account.id)
        this.closeCard()
      } else {
        this.$message.error('账号或密码错误，请重试')
      }
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
      let {data: url} = await login('qr/create', {
        key: key.data.unikey,
        qrimg: true,
        timerstamp: Date.now(),
        withCredentials: true, //关键
      })
      this.qrurl = url.qrimg
      this.timer = setInterval(async () => {
        const res = await this.checkStatus(key.data.unikey)
        if (res.code === 800) {
          alert('二维码已过期,请重新获取')
          clearInterval(this.timer)
        }
        if (res.code === 803) {
          // 这一步会返回cookie
          console.log(res)
          this.closeCard()
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
