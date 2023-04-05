import { defineStore } from 'pinia'

interface useServerType {
  servers: {
    url: string
    key: string
  }[]
  now: number
}

export const useServer = defineStore('server', {
  state: (): useServerType => {
    return {
      servers: [],
      now: 0
    }
  },
  actions: {
    addServer(url: string, key: string) {
      this.servers.push({ url, key })
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage
      }
    ]
  }
})
