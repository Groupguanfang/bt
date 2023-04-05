<script setup lang="tsx">
import { NButton, NH1, NIcon, NSpace } from 'naive-ui'
import type { Component } from 'vue'

const props = defineProps<{
  title: string
  button?: Component
  buttonSize?: number
}>()
const emits = defineEmits(['operation'])

const isShow = () => {
  return props.button ? true : false
}
</script>

<template>
  <NSpace justify="space-between" align="center">
    <NH1 class="headingDisableMargin">{{ title }}</NH1>
    <NButton v-if="isShow()" @click="emits('operation')" type="primary" size="large" circle>
      <template #icon>
        <NIcon :size="buttonSize ? buttonSize : 30" :component="button" />
      </template>
    </NButton>
  </NSpace>
</template>
