<script setup lang="ts">
import { defineProps } from "vue";
import { SettingsAdjust } from "@vicons/carbon";
import { NCard, NSpace, NText, NButton } from "naive-ui";
defineProps({
  title: String,
  time: String,
  path: String,
  id: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <NCard :title="title">
    <NSpace vertical>
      <div>添加时间: {{ time }}</div>
      <NText depth="3">路径: {{ path }}</NText>
    </NSpace>
    <template #header-extra>
      <NButton circle @click="$router.push('/dashboard/site/php/' + id)">
        <template #icon>
          <SettingsAdjust />
        </template>
      </NButton>
    </template>
  </NCard>
</template>
