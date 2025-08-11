import axios, { AxiosError } from 'axios'
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { notification } from 'antd'
import { stringify } from 'qs'
import i18n from '@/locale/index'
import config from '../../config/config'

type RequestOptions = {
  string?: boolean
  silent?: boolean
  params?: Record<string, unknown>
  headers?: Record<string, string>
}

const MODE = import.meta.env.MODE as keyof typeof config
const { prefix } = config[MODE]

type ExtendedAxiosRequestConfig = AxiosRequestConfig & { silent?: boolean }

// 创建 axios 实例
const httpClient: AxiosInstance = axios.create({
  // 使用 prefix 走 Vite 代理（开发环境），生产可由网关/服务器转发
  baseURL: prefix,
  timeout: 15000,
  withCredentials: true,
})

// 请求拦截器
httpClient.interceptors.request.use(
  (requestConfig: InternalAxiosRequestConfig & { silent?: boolean }) => {
    // 处理请求地址前缀（已由 baseURL 代理，一般无需再处理）
    const headers = requestConfig.headers || {}

    // 添加 token（等价于 Token.get() + isLogin()）
    const token = localStorage.getItem('token')
    const hasAuthHeader = Boolean((headers as Record<string, unknown>).Authorization)
    if (!hasAuthHeader && token) {
      (headers as Record<string, string>).Authorization = `Bearer ${token}`
    }

    // 添加语言（等价于 I18n.getLocal()）
    if (!(headers as Record<string, unknown>)['Accept-Language']) {
      (headers as Record<string, string>)['Accept-Language'] = i18n.language || 'en-US'
    }

    requestConfig.headers = headers
    return requestConfig
  },
  (error: AxiosError) => Promise.reject(error)
)

// 响应拦截器
httpClient.interceptors.response.use(
  (response) => {
    const cfg = response.config as ExtendedAxiosRequestConfig
    const data = response.data as Record<string, unknown>

    // 非 JSON 直接返回 data
    const contentType = (response.headers?.['content-type'] || '') as string
    const isJson = contentType.toLowerCase().includes('application/json')
    if (!isJson) return data

    // 特殊接口放行，例如 captcha
    const url = cfg.url || ''
    if (url.includes('captcha/')) return response.data

    // 401 未授权
    if (response.status === 401) {
      // 等价于 Notify.logout()
      localStorage.removeItem('token')
      // 不弹通知，直接跳转
      window.location.href = 'login'
      return Promise.reject({ response, data, message: data?.message || data?.error })
    }

    // 业务码判断，非 200 视为异常（除 oauth2/token 成功返回）
    if (data && data.code !== 200) {
      if (url.includes('oauth2/token') && data.access_token) {
        return data
      }
      if (!cfg.silent) {
        notification.error({
          message: i18n.t('global.operation.failed', { defaultValue: '操作失败' }),
          description: String(data.message || data.error || 'Unknown error'),
        })
      }
      return Promise.reject({ response, data, message: data?.message || data?.error })
    }

    return data
  },
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      notification.error({
        message: i18n.t('error.timeout', { defaultValue: '请求超时，请稍后重试' }) as string,
      })
    } else if (error.response) {
      if (error.response.status === 401) {
        // 401 不弹通知
        return Promise.reject(error)
      }
      const serverMsg = (error.response.data as { message?: string })?.message
      notification.error({
        message: i18n.t('global.operation.failed', { defaultValue: '操作失败' }) as string,
        description: serverMsg || (i18n.t('error.system', { defaultValue: '系统错误' }) as string),
      })
    } else {
      notification.error({
        message: i18n.t('app.error.network', { defaultValue: '网络错误' }) as string,
        description: i18n.t('app.error.network.description', { defaultValue: '请检查网络连接' }) as string,
      })
    }
    return Promise.reject(error)
  }
)

// 统一的 GET/POST 封装（带类型）
export function get<T = unknown>(url: string, params?: Record<string, unknown>, options?: RequestOptions) {
  const config: ExtendedAxiosRequestConfig = {
    params,
    silent: options?.silent,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      ...(options?.headers ?? {}),
    },
  }
  return httpClient.get<T>(url, config)
}

export function post<T = unknown>(
  url: string,
  data?: Record<string, unknown> | unknown,
  options?: RequestOptions
) {
  const payload = options?.string ? stringify(data as Record<string, unknown>) : data
  const config: ExtendedAxiosRequestConfig = {
    params: options?.params,
    silent: options?.silent,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': options?.string ? 'application/x-www-form-urlencoded' : 'application/json',
      ...(options?.headers ?? {}),
    },
  }
  return httpClient.post<T>(url, payload, config)
}

// 如果需要直接使用实例
export { httpClient }