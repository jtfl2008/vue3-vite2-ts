// import { get } from '@/utils/request'
import { get, post } from '@/utils/axios'

export const login = (params) => {
  return post('/geeker/login', params)
}
