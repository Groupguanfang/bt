import { defineStore } from 'pinia'

export const useWorkspace = defineStore('workspace', {
  state: () => {
    return {
      path: '/',
      history: ['/']
    }
  },
  actions: {
    push(path: string) {
      this.history.push(this.path)
      if (this.path === '/') {
        this.path = this.path + path
      } else {
        this.path = this.path + '/' + path
      }
    },
    back(): boolean {
      if (this.history.length - 1 == -1) {
        return false
      } else {
        this.path = this.history[this.history.length - 1]
        this.history.pop()
        return true
      }
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
