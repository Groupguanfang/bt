<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="tsx">
import {
  NButton,
  NDataTable,
  NIcon,
  NSpace,
  NText,
  useMessage,
  type DataTableColumns
} from 'naive-ui'
import { WorkspaceAPI } from '@/apis/Workspace'
import { useServer } from '@/stores/servers'
import { useWorkspace } from '@/stores/workspace'
import { ArrowLeft, ArrowRight, OverflowMenuHorizontal } from '@vicons/carbon'
import Folder from '@/assets/workspace/Folder.vue'
import File from '@/assets/workspace/File.vue'
import { computed, onMounted, ref, watch } from 'vue'
import Header from '@/components/Header.vue'

const server = useServer()
const workspaceStore = useWorkspace()
const message = useMessage()
const now = server.now - 1
const workspace = new WorkspaceAPI(server.servers[now].url, server.servers[now].key)

const DATA = ref<any[]>([])
const DATALoading = ref(false)
const emits = defineEmits(['close'])

const onLoad = async (path: string = workspaceStore.path) => {
  DATALoading.value = true
  const data = await workspace.getDir(path)
  console.log(data)
  DATA.value = []
  data.DIR.map((item: string) => {
    const i = item.split(';')
    DATA.value.push({
      title: i[0],
      type: '文件夹'
    })
  })
  data.FILES.map((item: string) => {
    const i = item.split(';')
    DATA.value.push({
      title: i[0],
      type: '文件'
    })
  })
  DATALoading.value = false
}
onMounted(onLoad)

const watchPath = computed(() => workspaceStore.path)
watch(watchPath, () => {
  onLoad(workspaceStore.path)
})

const columns: DataTableColumns = [
  {
    key: 'title',
    title: '名称',
    render(rowData) {
      if (rowData.type === '文件夹') {
        return (
          <NButton text size="large" onClick={() => workspaceStore.push(rowData.title as string)}>
            {{
              icon: () => (
                <NIcon>
                  <Folder />
                </NIcon>
              ),
              default: () => rowData.title
            }}
          </NButton>
        )
      } else {
        return (
          <NButton text size="large">
            {{
              icon: () => (
                <NIcon>
                  <File />
                </NIcon>
              ),
              default: () => rowData.title
            }}
          </NButton>
        )
      }
    }
  },
  {
    key: 'type',
    title: '类型',
    width: 85
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 50,
    render() {
      return (
        <NButton type="primary" circle>
          {{
            icon: () => (
              <NIcon>
                <OverflowMenuHorizontal />
              </NIcon>
            )
          }}
        </NButton>
      )
    }
  }
]

const back = () => {
  const data = workspaceStore.back()
  if (!data) message.error('已经是根目录了')
}
</script>

<template>
  <div>
    <Header @close="emits('close')"> 文件 </Header>
    <div class="padding">
      <NSpace class="bottom">
        <NButton @click="back" circle type="primary">
          <template #icon>
            <NIcon :component="ArrowLeft" />
          </template>
        </NButton>
        <NButton circle>
          <template #icon>
            <NIcon :component="ArrowRight" />
          </template>
        </NButton>
      </NSpace>
      <NText>{{ workspaceStore.path }}</NText>
      <NDataTable
        :loading="DATALoading"
        style="margin-top: 20px"
        size="large"
        :data="DATA"
        :columns="columns"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.bottom {
  margin-bottom: 10px;
}
</style>
