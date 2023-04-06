<script setup lang="tsx">
import { NCard, NH2, NSpace, NText } from 'naive-ui'

defineProps<{
  title: string
  count: string | number
}>()
</script>

<template>
  <NCard size="small" style="width: 100%">
    <NSpace vertical align="center" justify="center">
      <NText strong>{{ title }}</NText>
      <NH2 class="headingDisableMargin">{{ count }}</NH2>
    </NSpace>
  </NCard>
</template>
