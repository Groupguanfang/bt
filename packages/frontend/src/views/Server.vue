<script setup lang="tsx">
import {
  NButton,
  NCard,
  NDivider,
  NDrawer,
  NEmpty,
  NIcon,
  NInput,
  NSpace,
  NThing,
  useMessage
} from 'naive-ui'
import Header from '@/components/Header.vue'
import { useServer } from '@/stores/servers'
import isURL from 'validator/es/lib/isURL'
import { Add, ChevronRight } from '@vicons/carbon'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LargeHeader from '@/components/LargeHeader.vue'
import { changeBackground } from '@/hooks/changeBackground'

const server = useServer()
const router = useRouter()
const message = useMessage()

const showAddServerDrawer = ref(false)
changeBackground(showAddServerDrawer)

const url = ref<string>()
const key = ref<string>()
const addServer = () => {
  if (!url.value) {
    return message.error('请填写URL')
  }
  if (!isURL(url.value)) {
    return message.error('请填写正确的URL地址')
  }
  if (!key.value) {
    return message.error('请填写key')
  }
  server.servers.push({
    url: url.value,
    key: key.value
  })
  showAddServerDrawer.value = false
  message.success('添加成功')
}

const redictDashboard = (index: number) => {
  server.now = index + 1
  router.push('/dashboard')
}
</script>

<template>
  <div class="padding page">
    <LargeHeader title="服务器" :button="Add" @operation="showAddServerDrawer = true" />
    <NDivider />
    <NEmpty v-if="server.servers.length === 0">点击右上角添加一台服务器吧</NEmpty>
    <NCard v-for="(item, index) in server.servers" :key="index" @click="redictDashboard(index)">
      <NThing :title="item.url"></NThing>
    </NCard>

    <NDrawer v-model:show="showAddServerDrawer" width="100%">
      <Header pre="服务器" @close="showAddServerDrawer = false">添加服务器</Header>
      <NSpace vertical class="padding page">
        <NInput v-model:value="url" size="large" placeholder="请输入宝塔面板URL 不包括安全地址" />
        <NInput v-model:value="key" type="password" size="large" placeholder="请输入宝塔面板key" />
        <NButton @click="addServer" size="large" block type="primary">
          添加
          <template #icon>
            <NIcon :component="ChevronRight" />
          </template>
        </NButton>
      </NSpace>
    </NDrawer>
  </div>
</template>

<style lang="less" scoped></style>
