<<<<<<< HEAD
<template>
  <div>
    
    <!--头部开始-->
    <div style="height: 60px; background-color: #5546AB; display: flex; align-items: center;">
      <div style=" display: flex; align-items: center; font-size: 20px; color: #fff; margin-left: 20px; width: 250px; padding-left: 20px;">
        <img style="width: 40px;" src="@/assets/logo.png" alt="">
        <span style="margin-left: 3px;">编务通管理平台</span>
      </div>
      <div style="flex: 1;"></div>
      <div style=" width: fit-content; display: flex; align-items: center; padding-right: 20px;">
        <img :src="userAvatar" alt="" style="width: 40px; height: 40px; border-radius: 50%;">
        <span style="color: white; margin-left: 5px;">{{ userName }}</span>
        <span style="color: white; margin-left: 10px; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px;">
          {{ roleText }}
        </span>
      </div>
    </div>
    <!--头部结束-->

    <!--下面部分开始-->
    <div style="display: flex">

        <!--左侧导航菜单开始-->
        <div style="width: 200px; border-right: 1px solid #ddd; min-height: calc(100vh - 60px);">
            <el-menu router :default-active="router.currentRoute.value.path" style="border: 0;" >

                <el-menu-item index="/manager/home"><el-icon><House /></el-icon>系统首页</el-menu-item>

                <!-- 管理员专属菜单 -->
                <el-sub-menu v-if="userRole === 'ADMIN'">
                  <template #title>
                   <el-icon><User /></el-icon>
                   <span>用户管理</span>
                  </template>
                  <el-menu-item index="/manager/admin">管理员信息</el-menu-item>
                  <el-menu-item index="/manager/employee">员工信息</el-menu-item>
                </el-sub-menu>

                <!-- 管理员可见 -->
                <el-menu-item v-if="userRole === 'ADMIN'" index="/manager/data">
                  <el-icon><DataAnalysis /></el-icon>数据统计
                </el-menu-item>

                <!-- 管理员可见 -->
                <el-menu-item v-if="userRole === 'ADMIN'" index="/manager/article">
                  <el-icon><Reading /></el-icon>文章管理
                </el-menu-item>
                
                <!-- 管理员可见 -->
                <el-menu-item v-if="userRole === 'ADMIN'" index="/manager/department">
                  <el-icon><OfficeBuilding /></el-icon>部门管理
                </el-menu-item>

                <!-- 所有用户可见 -->
                <el-menu-item index="/manager/person"><el-icon><Service /></el-icon>个人信息</el-menu-item>

                <!-- 所有用户可见 -->
                <el-menu-item index="/manager/password"><el-icon><Edit /></el-icon>修改密码</el-menu-item>

                <el-menu-item @click="logout"><el-icon><SwitchButton /></el-icon>退出登录</el-menu-item>
            </el-menu> 
        </div>
        <!--左侧导航菜单结束-->

        
        <!--右侧主体区域开始-->
        <div style="flex: 1; width: 0; background-color: aliceblue;">
          <routerView @updateUser="updateUser" />
        </div>
        <!--右侧主体区域结束-->
        

    </div>
    <!--下面部分结束-->

  </div>
</template>

<script setup>
import router from '@/router/index.js'
import { useUserStore } from '@/store/user.js'
import { computed } from 'vue'

// 使用Pinia store
const userStore = useUserStore()

// 计算属性
const userName = computed(() => userStore.userName)
const userAvatar = computed(() => userStore.userAvatar)
const userRole = computed(() => userStore.userRole)

// 角色显示文本
const roleText = computed(() => {
  const roleMap = {
    'ADMIN': '管理员',
    'EMP': '员工'
  }
  return roleMap[userRole.value] || userRole.value
})

const logout = () => {
  userStore.clearUser()
  location.href = '/login'
}

const updateUser = () => {
  userStore.loadUserFromStorage()
}
</script>

<style scoped>
.el-menu .is-active{ 
  background-color: #e6ecf7 !important;
}

.el-sub-menu__title{
  background-color: white !important;
}
=======
<template>
  <div>
    
    <!--头部开始-->
    <div style="height: 60px; background-color: #5546AB; display: flex; align-items: center;">
      <div style=" display: flex; align-items: center; font-size: 20px; color: #fff; margin-left: 20px; width: 250px; padding-left: 20px;">
        <img style="width: 40px;" src="@/assets/logo.png" alt="">
        <span style="margin-left: 3px;">编务通管理平台</span>
      </div>
      <div style="flex: 1;"></div>
      <div style=" width: fit-content; display: flex; align-items: center; padding-right: 20px;">
        <img :src="userAvatar" alt="" style="width: 40px; height: 40px; border-radius: 50%;">
        <span style="color: white; margin-left: 5px;">{{ userName }}</span>
        <span style="color: white; margin-left: 10px; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px;">
          {{ roleText }}
        </span>
      </div>
    </div>
    <!--头部结束-->

    <!--下面部分开始-->
    <div style="display: flex">

        <!--左侧导航菜单开始-->
        <div style="width: 200px; border-right: 1px solid #ddd; min-height: calc(100vh - 60px);">
            <el-menu router :default-active="router.currentRoute.value.path" style="border: 0;" >

                <el-menu-item index="/manager/home"><el-icon><House /></el-icon>系统首页</el-menu-item>

                <!-- 管理员专属菜单 -->
                <el-sub-menu v-if="userRole === 'ADMIN'">
                  <template #title>
                   <el-icon><User /></el-icon>
                   <span>用户管理</span>
                  </template>
                  <el-menu-item index="/manager/admin">管理员信息</el-menu-item>
                  <el-menu-item index="/manager/employee">员工信息</el-menu-item>
                </el-sub-menu>

                <!-- 管理员可见 -->
                <el-menu-item v-if="userRole === 'ADMIN'" index="/manager/data">
                  <el-icon><DataAnalysis /></el-icon>数据统计
                </el-menu-item>

                <!-- 管理员可见 -->
                <el-menu-item v-if="userRole === 'ADMIN'" index="/manager/article">
                  <el-icon><Reading /></el-icon>文章管理
                </el-menu-item>
                
                <!-- 管理员可见 -->
                <el-menu-item v-if="userRole === 'ADMIN'" index="/manager/department">
                  <el-icon><OfficeBuilding /></el-icon>部门管理
                </el-menu-item>

                <!-- 所有用户可见 -->
                <el-menu-item index="/manager/person"><el-icon><Service /></el-icon>个人信息</el-menu-item>

                <!-- 所有用户可见 -->
                <el-menu-item index="/manager/password"><el-icon><Edit /></el-icon>修改密码</el-menu-item>

                <el-menu-item @click="logout"><el-icon><SwitchButton /></el-icon>退出登录</el-menu-item>
            </el-menu> 
        </div>
        <!--左侧导航菜单结束-->

        
        <!--右侧主体区域开始-->
        <div style="flex: 1; width: 0; background-color: aliceblue;">
          <routerView @updateUser="updateUser" />
        </div>
        <!--右侧主体区域结束-->
        

    </div>
    <!--下面部分结束-->

  </div>
</template>

<script setup>
import router from '@/router/index.js'
import { useUserStore } from '@/store/user.js'
import { computed } from 'vue'

// 使用Pinia store
const userStore = useUserStore()

// 计算属性
const userName = computed(() => userStore.userName)
const userAvatar = computed(() => userStore.userAvatar)
const userRole = computed(() => userStore.userRole)

// 角色显示文本
const roleText = computed(() => {
  const roleMap = {
    'ADMIN': '管理员',
    'EMP': '员工'
  }
  return roleMap[userRole.value] || userRole.value
})

const logout = () => {
  userStore.clearUser()
  location.href = '/login'
}

const updateUser = () => {
  userStore.loadUserFromStorage()
}
</script>

<style scoped>
.el-menu .is-active{ 
  background-color: #e6ecf7 !important;
}

.el-sub-menu__title{
  background-color: white !important;
}
>>>>>>> c0a64c83aee6dd6363c32cb780aae9bc3415dcce
</style>