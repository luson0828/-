import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import { useUserStore } from '../../src/store/user'

// 模拟Login组件的基本结构
const LoginComponent = {
  template: `
    <div>
      <form @submit.prevent="handleLogin">
        <input 
          v-model="form.username" 
          type="text" 
          placeholder="用户名"
          data-test="username-input"
        />
        <input 
          v-model="form.password" 
          type="password" 
          placeholder="密码"
          data-test="password-input"
        />
        <button type="submit" data-test="login-btn">登录</button>
      </form>
      <div v-if="error" data-test="error-message">{{ error }}</div>
    </div>
  `,
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      if (!this.form.username || !this.form.password) {
        this.error = '请输入用户名和密码'
        return
      }
      
      try {
        // 模拟登录API调用
        const userStore = useUserStore()
        const userData = {
          id: '1',
          name: this.form.username,
          role: 'user'
        }
        userStore.setUser(userData)
        this.error = ''
      } catch (error) {
        this.error = '登录失败'
      }
    }
  }
}

describe('登录组件测试', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('应该渲染登录表单', () => {
    const wrapper = mount(LoginComponent)
    
    expect(wrapper.find('[data-test="username-input"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="password-input"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="login-btn"]').exists()).toBe(true)
  })

  it('应该验证表单输入', async () => {
    const wrapper = mount(LoginComponent)
    
    // 不输入直接提交
    await wrapper.find('form').trigger('submit')
    await nextTick()
    
    expect(wrapper.find('[data-test="error-message"]').text()).toBe('请输入用户名和密码')
  })

  it('应该成功登录', async () => {
    const wrapper = mount(LoginComponent)
    const userStore = useUserStore()
    
    // 设置表单数据
    await wrapper.find('[data-test="username-input"]').setValue('admin')
    await wrapper.find('[data-test="password-input"]').setValue('123456')
    
    // 提交表单
    await wrapper.find('form').trigger('submit')
    await nextTick()
    
    expect(userStore.isLoggedIn).toBe(true)
    expect(userStore.userName).toBe('admin')
    expect(wrapper.find('[data-test="error-message"]').exists()).toBe(false)
  })
})