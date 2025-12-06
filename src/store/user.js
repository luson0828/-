<<<<<<< HEAD
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const user = ref(null);

  // 计算属性：是否已登录
  const isLoggedIn = computed(() => !!user.value);

  // 计算属性：用户角色
  const userRole = computed(() => user.value?.role || '');

  // 计算属性：用户ID
  const userId = computed(() => user.value?.id || '');

  // 计算属性：用户名
  const userName = computed(() => user.value?.name || '');

  // 计算属性：用户头像
  const userAvatar = computed(
    () =>
      user.value?.avatar ||
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  );

  // 设置用户信息
  const setUser = (userData) => {
    user.value = userData;
    // 同时保存到localStorage作为持久化备份
    if (userData) {
      localStorage.setItem('xm-pro-user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('xm-pro-user'); // 用户点击退出登录时清除localStorage
    }
  };

  // 获取用户信息（从localStorage加载）
  const loadUserFromStorage = () => {
    const storedUser = localStorage.getItem('xm-pro-user');
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser);
      } catch (error) {
        console.error('解析用户信息失败:', error);
        user.value = null;
      }
    }
  };

  // 清除用户信息
  const clearUser = () => {
    user.value = null;
    localStorage.removeItem('xm-pro-user');
  };

  // 更新用户信息
  const updateUser = (userData) => {
    if (user.value) {
      user.value = { ...user.value, ...userData }; // 合并更新用户信息
      localStorage.setItem('xm-pro-user', JSON.stringify(user.value));
    }
  };

  // 初始化时从localStorage加载用户信息
  loadUserFromStorage();

  return {
    user,
    isLoggedIn,
    userRole,
    userId,
    userName,
    userAvatar,
    setUser,
    clearUser,
    updateUser,
    loadUserFromStorage,
  };
});
=======
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const user = ref(null)
  
  // 计算属性：是否已登录
  const isLoggedIn = computed(() => !!user.value)
  
  // 计算属性：用户角色
  const userRole = computed(() => user.value?.role || '')
  
  // 计算属性：用户ID
  const userId = computed(() => user.value?.id || '')
  
  // 计算属性：用户名
  const userName = computed(() => user.value?.name || '')
  
  // 计算属性：用户头像
  const userAvatar = computed(() => user.value?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
  
  // 设置用户信息
  const setUser = (userData) => {
    user.value = userData
    // 同时保存到localStorage作为持久化备份
    if (userData) {
      localStorage.setItem('xm-pro-user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('xm-pro-user')
    }
  }
  
  // 获取用户信息（从localStorage恢复）
  const loadUserFromStorage = () => {
    const storedUser = localStorage.getItem('xm-pro-user')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (error) {
        console.error('解析用户信息失败:', error)
        user.value = null
      }
    }
  }
  
  // 清除用户信息
  const clearUser = () => {
    user.value = null
    localStorage.removeItem('xm-pro-user')
  }
  
  // 更新用户信息
  const updateUser = (userData) => {
    if (user.value) {
      user.value = { ...user.value, ...userData }
      localStorage.setItem('xm-pro-user', JSON.stringify(user.value))
    }
  }
  
  // 初始化时从localStorage加载用户信息
  loadUserFromStorage()
  
  return {
    user,
    isLoggedIn,
    userRole,
    userId,
    userName,
    userAvatar,
    setUser,
    clearUser,
    updateUser,
    loadUserFromStorage
  }
})
>>>>>>> c0a64c83aee6dd6363c32cb780aae9bc3415dcce
