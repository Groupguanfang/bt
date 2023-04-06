<script setup lang="tsx">
import { NConfigProvider, useOsTheme, darkTheme, zhCN, NMessageProvider } from 'naive-ui'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useServer } from './stores/servers'
import themeJSON from './theme.json'
const theme = useOsTheme()
const router = useRouter()
const server = useServer()
const themeRef = computed(() => (theme.value === 'dark' ? darkTheme : null))

if (server.now === 0) router.push('/servers')
</script>

<template>
  <NConfigProvider :theme-overrides="themeJSON" :theme="themeRef" :locale="zhCN">
    <NMessageProvider>
      <RouterView />
    </NMessageProvider>
  </NConfigProvider>
</template>
