const EXPIRE = 60 * 60 * 24 * 7

export const createStorage = ({ prefixKey = '', storage = localStorage }) => {
  const Storage = class {
    private storage = storage
    private prefixKey?: string = prefixKey

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    /**
     * @description 设置缓存
     * @param {string} key
     * @param {*} value
     * @param {(number | null)} [expire=EXPIRE]
     */
    setItem(key: string, value: any, expire: number | null = EXPIRE) {
      const data = JSON.stringify({
        value,
        expire: expire ? Date.now() + expire * 1000 : null,
      })
      this.storage.setItem(this.getKey(key), data)
    }

    /**
     * @description 获取缓存
     * @param {string} key
     * @return {*}
     */
    getItem(key: string): any {
      const item = this.storage.getItem(this.getKey(key))
      if (!item) return null
      try {
        const data = JSON.parse(item)
        const { value, expire } = data
        if (!expire || expire >= Date.now()) {
          return value
        }
        this.removeItem(this.getKey(key))
      } catch (error) {
        return null
      }
    }
    /**
     * @description 删除某项缓存
     *
     * @param {string} key
     */
    removeItem(key: string) {
      this.storage.removeItem(this.getKey(key))
    }

    /**
     * 清空缓存
     *
     */
    clear() {
      this.storage.clear()
    }

    setCookie(name: string, value: any, expire: number | null = EXPIRE) {
      document.cookie = `${this.getKey(name)}=${value};Max-Age=${expire}`
    }
    getCookie(name: string): string {
      const cookieArray = document.cookie.split(';')
      for (let i = 0, length = cookieArray.length; i < length; i++) {
        const kv = cookieArray[i].split('=')
        if (kv[0] === this.getKey(name)) {
          return kv[1]
        }
      }
      return ''
    }
    removeCookie(key: string) {
      this.setCookie(key, 1, -1)
    }
    clearCookie(): void {
      const keys = document.cookie.match(/[^ =;]+(?==)/g)
      if (keys) {
        for (let i = keys.length; i--; ) {
          document.cookie = keys[i] + '=0;expire=' + new Date(0).toUTCString()
        }
      }
    }
  }
  return new Storage()
}

const storage = createStorage({ prefixKey: '$__' })
export default storage
