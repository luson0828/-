import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../../src/store/user'

describe('用户Store测试', () => {
  beforeEach(() => {
    // 创建一个新的pinia实例并使其处于激活状态
    setActivePinia(createPinia())
    // 清除localStorage
    localStorage.clear()
    // 模拟console.error避免测试输出干扰
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('应该正确设置用户信息', () => {
    const userStore = useUserStore()
    const testUser = {
      id: '123',
      name: '张三',
      role: 'admin'
    }

    userStore.setUser(testUser)

    expect(userStore.user).toEqual(testUser)
    expect(userStore.isLoggedIn).toBe(true)
    expect(userStore.userRole).toBe('admin')
    expect(userStore.userName).toBe('张三')
  })

  it('应该清除用户信息', () => {
    const userStore = useUserStore()
    const testUser = {
      id: '123',
      name: '张三',
      role: 'admin'
    }

    userStore.setUser(testUser)
    userStore.clearUser()

    expect(userStore.user).toBeNull()
    expect(userStore.isLoggedIn).toBe(false)
    expect(localStorage.getItem('xm-pro-user')).toBeNull()
  })

  it('应该从localStorage加载用户信息', () => {
    const testUser = {
      id: '123',
      name: '李四',
      role: 'user'
    }
    localStorage.setItem('xm-pro-user', JSON.stringify(testUser))

    const userStore = useUserStore()

    expect(userStore.user).toEqual(testUser)
    expect(userStore.isLoggedIn).toBe(true)
  })

  it('应该更新用户信息', () => {
    const userStore = useUserStore()
    const testUser = {
      id: '123',
      name: '王五',
      role: 'user'
    }

    userStore.setUser(testUser)
    userStore.updateUser({ name: '王五(已更新)', role: 'manager' })

    expect(userStore.userName).toBe('王五(已更新)')
    expect(userStore.userRole).toBe('manager')
  })

  it('应该处理无效的localStorage数据', () => {
    localStorage.setItem('xm-pro-user', 'invalid-json')

    const userStore = useUserStore()

    expect(userStore.user).toBeNull()
    expect(userStore.isLoggedIn).toBe(false)
    // 验证console.error被调用
    expect(console.error).toHaveBeenCalledWith('解析用户信息失败:', expect.any(Error))
  })
})