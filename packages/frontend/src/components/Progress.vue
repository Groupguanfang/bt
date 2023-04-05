<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="tsx">
import { NH3, NProgress, NSpace, NText } from 'naive-ui'

defineProps<{
  color: string
  percentage: number
  title: string
}>()
</script>

<template>
  <NProgress type="circle" :color="color" :percentage="percentage">
    <NSpace vertical :size="0" align="center">
      <NH3 class="headingDisableMargin">
        {{ percentage }}
      </NH3>
      <NText>{{ title }}</NText>
    </NSpace>
  </NProgress>
</template>
