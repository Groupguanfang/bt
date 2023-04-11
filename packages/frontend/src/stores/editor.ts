import { defineStore } from 'pinia'

interface useEditorState {
  tabs: {
    type: 'home' | 'editor'
    name: string
    index: number
  }[]
  nowTab: number
}

export const useEditor = defineStore('editor', {
  state: (): useEditorState => {
    return {
      tabs: [
        {
          type: 'home',
          name: '新标签页',
          index: 0
        }
      ],
      nowTab: 0
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
