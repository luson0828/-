import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 定义用户接口
interface User {
  id: string
  name: string
  role: string
  avatar?: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  
  const isLoggedIn = computed(() => !!user.value)
  const userRole = computed(() => user.value?.role || '')
  const userId = computed(() => user.value?.id || '')
  const userName = computed(() => user.value?.name || '')
  const userAvatar = computed(() => user.value?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
  
  const setUser = (userData: User | null) => {
    user.value = userData
    if (userData) {
      localStorage.setItem('xm-pro-user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('xm-pro-user')
    }
  }
  
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
  
  const clearUser = () => {
    user.value = null
    localStorage.removeItem('xm-pro-user')
  }
  
  const updateUser = (userData: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...userData }
      localStorage.setItem('xm-pro-user', JSON.stringify(user.value))
    }
  }
  
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