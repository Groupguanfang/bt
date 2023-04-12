<script setup lang="tsx">
import { NButton, NDrawer, NEmpty, NIcon, NSpace, NTabPane, NTabs } from 'naive-ui'
import { useEditor } from '@/stores/editor'
import NewTab from './Content/NewTab.vue'
import File from './File.vue'
import { Code, Exit, Folder } from '@vicons/carbon'
import { ref } from 'vue'
import { changeBackground } from '@/hooks/changeBackground'
import Terminal from './Content/Terminal.vue'
import Editing from './Content/Editing.vue'

const editor = useEditor()

const onAdd = () => {
  const newValue = Math.max(...editor.tabs.map((item) => item.index)) + 1
  const name = '新标签页' + (editor.tabs.length < 1 ? '' : newValue)
  editor.tabs.push({
    type: 'home',
    name: name,
    index: newValue === -Infinity ? 1 : newValue
  })
  editor.nowTab = name
}

const onClose = (name: string) => {
  editor.tabs = editor.tabs.filter((item) => (item.name === name ? null : item))
  editor.nowTab = 0
}

const showFileDrawer = ref(false)
changeBackground(showFileDrawer)

const onFileOpen = (path: string) => {
  showFileDrawer.value = false
  let name = path.split('/')[path.split('/').length - 1]
  const newValue = Math.max(...editor.tabs.map((item) => item.index)) + 1
  for (let i = 0; i < editor.tabs.length; i++) {
    if (editor.tabs[i].path === path) {
      editor.nowTab = editor.tabs[i].name
      return
    }
    if (editor.tabs[i].name === name) {
      name = name + newValue
    }
  }
  editor.tabs.push({
    type: 'editor',
    name: path.split('/')[path.split('/').length - 1],
    index: newValue,
    path: path
  })
}

const showTerminalDrawer = ref(false)
</script>

<template>
  <div id="editor" v-if="editor.tabs.length !== 0">
    <NDrawer height="100%" placement="bottom" v-model:show="showFileDrawer">
      <File @open="onFileOpen" @close="showFileDrawer = false" />
    </NDrawer>
    <NDrawer displayDirective="show" placement="top" v-model:show="showTerminalDrawer">
      <Terminal />
    </NDrawer>
    <NTabs
      v-model:value="editor.nowTab"
      type="card"
      size="large"
      @add="onAdd"
      @close="onClose"
      :closable="true"
      :addable="true"
    >
      <NTabPane v-for="(item, index) in editor.tabs" :key="index" :name="item.name">
        <NewTab
          v-if="item.type === 'home'"
          @open="showFileDrawer = true"
          @terminal="showTerminalDrawer = true"
        />
        <Editing v-else-if="item.type === 'editor'" />
        <div class="padding page center" v-else>
          <NEmpty size="large" description="没有已打开的标签页" />
        </div>
      </NTabPane>
      <template #prefix>
        <div class="prefix">
          <NButton @click="showFileDrawer = true" size="small" circle type="primary">
            <template #icon>
              <NIcon :component="Folder" />
            </template>
          </NButton>
        </div>
      </template>
      <template #suffix>
        <div class="suffix">
          <NButton @click="$router.push('/dashboard')" size="small" circle type="primary">
            <template #icon>
              <NIcon :component="Exit" />
            </template>
          </NButton>
        </div>
      </template>
    </NTabs>
  </div>
  <div class="padding page center">
    <NEmpty
      size="large"
      description="没有标签页呢"
      v-if="editor.tabs.length === 0 || editor.nowTab === 0"
    >
      <template #icon>
        <NIcon :component="Code" />
      </template>
      <template #extra>
        <NSpace>
          <NButton @click="onAdd" size="small" type="primary">快速开始</NButton>
          <NButton @click="$router.push('/')" size="small">回到主页</NButton>
        </NSpace>
      </template>
    </NEmpty>
  </div>
</template>

<style lang="less">
#editor {
  .suffix {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    top: -2px;
    margin-right: 10px;
  }
  .prefix {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    top: -1px;
    margin-left: 5px;
  }

  .n-tabs-nav__prefix {
    padding-right: 8px;
  }

  .n-tabs-nav__suffix {
    padding-left: 8px;
  }
}
</style>
