<script setup lang="tsx">
import { FolderOpen, Terminal } from '@vicons/carbon'
import { NButton, NH1, NText, NIcon, NDivider, NH3, NSpace } from 'naive-ui'

const emits = defineEmits(['open', 'terminal'])
</script>

<template>
  <div class="padding page">
    <NH1 class="headingDisableMargin">开始</NH1>
    <NText strong style="font-size: 20px" :depth="3">编辑进化</NText>

    <NH3 class="headingDisableMargin">启动</NH3>
    <NDivider style="margin-top: 10px" />
    <NSpace size="large" vertical>
      <NButton text size="small" type="info" @click="emits('open')">
        <template #icon>
          <NIcon :component="FolderOpen" />
        </template>
        打开文件
      </NButton>
      <NButton text size="small" type="info" @click="emits('terminal')">
        <template #icon>
          <NIcon :component="Terminal" />
        </template>
        打开终端
      </NButton>
    </NSpace>
  </div>
</template>
