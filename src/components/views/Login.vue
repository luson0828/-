<template>
  <div class="login-container">
    <div class="login-box">
      <div style=" margin-top: 40px; margin-bottom: 30px; text-align: center; font-size: 23px; font-weight: bold; color: #0742b1;">欢迎登录编务通管理平台</div>
      <el-form ref="formRef" :rules="data.rules" :model="data.form">
        <el-form-item prop="username">
          <el-input size="large" v-model="data.form.username" autocomplete="off" placeholder="请输入账号" prefix-icon="user" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input show-password size="large" v-model="data.form.password" autocomplete="off" placeholder="请输入密码" prefix-icon="lock" />
        </el-form-item>
        <el-form-item prop="role">
          <el-select v-model="data.form.role" style="width:100%" size="large">
            <el-option label="管理员" value="ADMIN"></el-option>
            <el-option label="员工" value="EMP"></el-option>
          </el-select>
        </el-form-item>

        <div style="margin-top: 20px;" >
          <el-button size="large" style="width: 100%;" type="primary" @click="login">登 录</el-button>
        </div>   
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import request from '@/utils/request.js'
import { useUserStore } from '@/store/user.js'

const data = reactive({
  form: { role: 'ADMIN' },
  rules: {
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
  }
})

const formRef = ref()
const userStore = useUserStore()

const login = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      request.post('/login', data.form).then(res => {
        if (res.code === '200') {  
          // 存储用户信息到Pinia store
          userStore.setUser(res.data)
          ElMessage.success('登录成功') 
          setTimeout(() => {
            location.href = '/manager/home'
          }, 500)
        } else {
          ElMessage.error(res.msg)
        }
      })
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-image: url("@/assets/bg.png");
  background-size: 100% 110%;
}

.login-box {
  width: 250px;
  height: 350px;
  background-color: #fff;
  border-radius: 10px;
  padding: 0 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}
</style>