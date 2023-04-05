<script setup lang="tsx">
import { NConfigProvider, useOsTheme, darkTheme, zhCN, NMessageProvider } from 'naive-ui'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const theme = useOsTheme()
const route = useRoute()
const router = useRouter()
const themeRef = computed(() => (theme.value === 'dark' ? darkTheme : null))

if (route.path === '/') router.push('/servers')
</script>

<template>
  <NConfigProvider :theme="themeRef" :locale="zhCN">
    <NMessageProvider>
      <RouterView />
    </NMessageProvider>
  </NConfigProvider>
</template>
