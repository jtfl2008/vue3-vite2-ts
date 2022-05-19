import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

axios.defaults.baseURL = '/api'
// axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = 'token'
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use((response) => {
  if (response.data.code !== 200) {
    return Promise.reject(response)
  }
  return response.data
})

function request<T>(config: AxiosRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    axios
      .request<T, AxiosResponse<T>>(config)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function get<T>(url: string, parmas) {
  return request<T>({
    url,
    params: {
      ...parmas,
    },
    method: 'get',
  })
}

export function post<T>(url: string, data) {
  return request<T>({
    url,
    data,
    method: 'post',
  })
}
