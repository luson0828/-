<template>
    <div class="login-container">
        <div class="login-box">
            <div style=" margin-top: 30px; margin-bottom: 25px; text-align: center; font-size: 23px; font-weight: bold; color: #0742b1;">欢 迎 注 册</div>
            <el-form ref="formRef" :rules="data.rules" :model="data.form">
                <el-form-item prop="username">
                    <el-input size="large" v-model="data.form.username" autocomplete="off" placeholder="请输入账号" prefix-icon="user" />
                </el-form-item>
                <el-form-item prop="no">
                    <el-input size="large" v-model="data.form.no" autocomplete="off" placeholder="请输入工号" prefix-icon="Notification" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input show-password size="large" v-model="data.form.password" placeholder="请输入密码" prefix-icon="lock" />
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input show-password size="large" v-model="data.form.confirmPassword" placeholder="请确认密码" prefix-icon="lock" />
                </el-form-item>
            <div style="margin-top: 20px;" >
                <el-button size="large" style="width: 100%;" type="primary" @click="register">注 册</el-button>
            </div>   
            <div style=" margin-top: 5px; text-align: right;">已有账号？请前往<a style="color: #0742b1; text-decoration: none;" href="/login">登录</a></div> 

            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import request from '@/utils/request.js'

const validatePass = (value, callback) => {
  if (!value) {
    callback(new Error('请再次确认密码'))
  } else if (value !== data.form.password) {
    callback(new Error("两次输入密码不一致"))
  } else {
    callback() // 验证通过
  }
}

const data = reactive({
    form: {},
    rules: {
        username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        no: [
            { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        confirmPassword: [
            { validator: validatePass, trigger: 'blur' }

        ]

    }
})

const formRef = ref()



const register = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            request.post('/register', data.form).then(res => {
                if (res.code === '200') {  
                    ElMessage.success('注册成功')
                    setTimeout(() => {
                        location.href = '/login'
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
    height: 400px;
    background-color: #fff;
    border-radius: 10px;
    padding: 0 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);



}
</style>
