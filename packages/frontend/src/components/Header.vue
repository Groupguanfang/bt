<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="tsx">
import { ChevronLeft } from '@vicons/carbon'
import { NCard, NIcon, NSpace, NText } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps<{
  pre?: string
}>()
const emits = defineEmits(['close'])

const isStrong = ref(false)
</script>

<template>
  <NCard :bordered="false" content-style="padding: 14px; font-size: 18px">
    <div class="header">
      <div class="pre" @click="emits('close')">
        <NIcon color="#70c0e8" :size="24" :component="ChevronLeft" />
        <NText
          type="info"
          @mouseenter="isStrong = true"
          @mouseleave="isStrong = false"
          :strong="isStrong"
          style="cursor: pointer"
        >
          {{ props.pre }}
        </NText>
      </div>
      <NSpace class="title" justify="center">
        <NText strong><slot /></NText>
      </NSpace>
    </div>
  </NCard>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  position: relative;
  .title {
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    align-items: center;
  }
}
.pre {
  display: flex;
  align-items: center;
  z-index: 9999;
}
</style>
