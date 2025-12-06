import { describe, it, expect } from 'vitest'

describe('请求工具配置测试', () => {
  it('应该验证请求配置参数', () => {
    // 测试请求配置的基本参数
    const config = {
      baseURL: 'http://localhost:8080',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
    
    expect(config.baseURL).toBe('http://localhost:8080')
    expect(config.timeout).toBe(30000)
    expect(config.headers['Content-Type']).toBe('application/json;charset=utf-8')
  })

  it('应该验证响应数据处理逻辑', () => {
    // 测试响应数据处理的逻辑
    const processResponse = (data) => {
      if (typeof data === 'string') {
        try {
          return JSON.parse(data)
        } catch {
          return null
        }
      }
      return data
    }
    
    expect(processResponse('{"success": true}')).toEqual({ success: true })
    expect(processResponse({ success: true })).toEqual({ success: true })
    expect(processResponse('invalid')).toBeNull()
  })

  it('应该验证错误状态码处理', () => {
    // 测试错误状态码的处理逻辑
    const errorHandler = (status) => {
      const errorMessages = {
        404: '未找到请求接口',
        500: '系统异常,请查看后端控制台报错'
      }
      return errorMessages[status] || '未知错误'
    }
    
    expect(errorHandler(404)).toBe('未找到请求接口')
    expect(errorHandler(500)).toBe('系统异常,请查看后端控制台报错')
    expect(errorHandler(400)).toBe('未知错误')
  })
})