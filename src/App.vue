<script setup lang="ts">
import { computed } from "vue";
import {
  NConfigProvider,
  useOsTheme,
  darkTheme,
  NMessageProvider,
  zhCN,
  dateZhCN,
  NDialogProvider,
  NNotificationProvider,
} from "naive-ui";
import themeConfig from "../theme.json";
import { useMain } from "./stores/Main";
import { useRouter, useRoute } from "vue-router";
const main = useMain();
const router = useRouter();
const route = useRoute();
const themeRef = useOsTheme();
const theme = computed(() => (themeRef.value === "dark" ? darkTheme : null));
const locale = computed(() => (main.locale === "zh" ? zhCN : null));
const dateLocale = computed(() => (main.locale === "zh" ? dateZhCN : null));
if (JSON.stringify(main.now) === "{}") {
  router.push("/servers");
}
</script>

<template>
  <NConfigProvider
    :locale="locale"
    :date-locale="dateLocale"
    :theme="theme"
    :theme-overrides="themeConfig"
  >
    <NMessageProvider>
      <NDialogProvider>
        <NNotificationProvider>
          <RouterView />
        </NNotificationProvider>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
