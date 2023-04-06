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
