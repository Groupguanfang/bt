<script setup lang="tsx">
import { NButton, NDrawer, NEmpty, NIcon, NTabPane, NTabs } from 'naive-ui'
import { useEditor } from '@/stores/editor'
import NewTab from './Content/NewTab.vue'
import File from './File.vue'
import { Code, Folder, Settings } from '@vicons/carbon'
import { ref } from 'vue'
import { changeBackground } from '@/hooks/changeBackground'

const editor = useEditor()

const onAdd = () => {
  const newValue = Math.max(...editor.tabs.map((item) => item.index)) + 1
  editor.tabs.push({
    type: 'home',
    name: '新标签页' + (editor.tabs.length < 1 ? '' : newValue),
    index: newValue
  })
}

const onClose = (name: string) =>
  (editor.tabs = editor.tabs.filter((item) => (item.name === name ? null : item)))

const showFileDrawer = ref(false)
changeBackground(showFileDrawer)
</script>

<template>
  <div id="editor" class="padding" v-if="editor.tabs.length !== 0">
    <NDrawer height="100%" placement="bottom" v-model:show="showFileDrawer">
      <File @close="showFileDrawer = false" />
    </NDrawer>
    <NTabs type="card" size="large" @add="onAdd" @close="onClose" :closable="true" :addable="true">
      <NTabPane v-for="(item, index) in editor.tabs" :key="index" :name="item.name">
        <NewTab v-if="item.type === 'home'" />
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
          <NButton size="small" circle type="primary">
            <template #icon>
              <NIcon :component="Settings" />
            </template>
          </NButton>
        </div>
      </template>
    </NTabs>
  </div>
  <div class="padding page center">
    <NEmpty size="large" description="没有标签页呢" v-if="editor.tabs.length === 0">
      <template #icon>
        <NIcon :component="Code" />
      </template>
      <template #extra>
        <NButton @click="onAdd" size="small" type="primary">快速开始</NButton>
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
  }
  .prefix {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    top: -1px;
  }

  .n-tabs-nav__prefix {
    padding-right: 8px;
  }

  .n-tabs-nav__suffix {
    padding-left: 8px;
  }
}
</style>
