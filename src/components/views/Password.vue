<template>
    <div class="card1" style="padding: 40px 20px;">
        <el-form ref="formRef" :rules="data.rules" :model="data.form" label-width="80px" style="padding-right: 40px; padding-top: 20px;">
            <el-form-item label="旧密码" prop="password">
                <el-input show-password v-model="data.form.password" autocomplete="off" placeholder="请输入旧密码" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input show-password v-model="data.form.newPassword" autocomplete="off" placeholder="请输入新密码" />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input show-password v-model="data.form.confirmPassword" autocomplete="off" placeholder="请再次输入确认新密码" />
            </el-form-item>
        </el-form>
        <div style="text-align: center;">
            <el-button type="primary" @click="updatePassword" style="padding: 20px 30px;">立即修改</el-button>
        </div>
    </div>
</template>

<script setup>
import { reactive,ref } from 'vue';
import '../../style.css'; 
import request from '@/utils/request.js'
import { ElMessage } from 'element-plus';

const validatePass = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请再次确认新密码'))
    } else if (value !== data.form.newPassword) {
        callback(new Error('两次输入密码不一致'))
    } else {
        callback() // 让表单流程继续进行
    }
}


const data = reactive({
    user: JSON.parse(localStorage.getItem('xm-pro-user')),
    form: {},
    rules: {
        password: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
        ],
        confirmPassword: [
            { validator: validatePass, trigger: 'blur' },

        ],
    }
})


const formRef = ref()

const updatePassword = () => {
    data.form.id = data.user.id
    data.form.role = data.user.role
    formRef.value.validate((valid) => {
        if (valid) {
            request.put('/updatePassword', data.form).then(res => {
                if (res.code === '200') {  
                    ElMessage.success('修改成功') 
                    localStorage.removeItem('xm-pro-user') // 更新缓存
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
