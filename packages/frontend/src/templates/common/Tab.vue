<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="tsx">
import { NAffix, NTab, NTabs } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const update = (value: string) => {
  if (value === '主页') router.push('/dashboard')
  if (value === '工作') router.push('/workspace')
  if (value === '数据') router.push('/data')
  if (value === '任务') router.push('/task')
  if (value === '商店') router.push('/store')
}

const defaultValue = () => {
  if (route.path === '/dashboard') return '主页'
  if (route.path === '/workspace') return '工作'
  if (route.path === '/data') return '数据'
  if (route.path === '/task') return '任务'
  if (route.path === '/store') return '商店'
}
</script>

<template>
  <Teleport to="body">
    <NAffix class="tab-container" :trigger-bottom="9999999" :bottom="0">
      <NTabs
        :default-value="defaultValue()"
        animated
        @update:value="update"
        type="segment"
        size="large"
      >
        <NTab name="主页" />
        <NTab name="工作" />
        <NTab name="数据" />
        <NTab name="任务" />
        <NTab name="商店" />
      </NTabs>
    </NAffix>
  </Teleport>
</template>

<style lang="less">
.tab-container {
  width: calc(100% - 28px);
  margin-bottom: 14px;
  margin-left: 14px;
  & * {
    --n-tab-border-radius: 10px !important;
  }
  .n-tabs-rail {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
}
</style>
