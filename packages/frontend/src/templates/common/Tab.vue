<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="tsx">
import { NAffix, NTab, NTabs } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()

const update = (value: string) => {
  if (value === '主页') router.push('/dashboard')
  if (value === '工作') router.push('/workspace')
  if (value === '数据') router.push('/data')
  if (value === '任务') router.push('/task')
  if (value === '商店') router.push('/store')
}
</script>

<template>
  <Teleport to="body">
    <NAffix class="tab-container" :trigger-bottom="9999999" :bottom="0">
      <NTabs animated @update:value="update" type="segment" size="large">
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
  z-index: 999999999;
  .n-tabs-rail {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
}
</style>
