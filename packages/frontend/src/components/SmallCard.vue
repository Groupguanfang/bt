<script setup lang="tsx">
import { NCard, NSpace, NText } from 'naive-ui'

defineProps<{
  count: number
  title: string
}>()
</script>

<template>
  <NCard
    size="small"
    content-style="padding-top: 10px; padding-bottom: 10px; padding-left: 24px; padding-right: 24px"
  >
    <NSpace vertical justify="center" align="center">
      <NText strong>{{ title }}</NText>
      <NText>{{ count }}</NText>
    </NSpace>
  </NCard>
</template>
