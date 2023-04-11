import { defineStore } from 'pinia'

export const useWorkspace = defineStore('workspace', {
  state: () => {
    return {
      path: '/',
      history: ['/']
    }
  },
  actions: {
    push(folderName: string) {
      if (this.path === '/') {
        this.path = this.path + folderName
      } else {
        this.path = this.path + '/' + folderName
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
