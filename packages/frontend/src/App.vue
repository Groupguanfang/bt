<script setup lang="tsx">
import { NConfigProvider, useOsTheme, darkTheme, zhCN, NMessageProvider } from 'naive-ui'
import { computed } from 'vue'
import themeJSON from './theme.json'
const theme = useOsTheme()
const themeRef = computed(() => (theme.value === 'dark' ? darkTheme : null))
</script>

<template>
  <NConfigProvider :theme-overrides="themeJSON" :theme="themeRef" :locale="zhCN">
    <NMessageProvider>
      <RouterView />
    </NMessageProvider>
  </NConfigProvider>
</template>
