<script setup lang="ts">
import { computed } from "vue";
import { NButton, NIcon, NSpace } from "naive-ui";
import { AppSwitcher, TextAlignLeft, TextAlignRight } from "@vicons/carbon";
import { useMain } from "@/stores/Main";
import FileHeader from "./FileHeader.vue";
import { useRoute } from "vue-router";
const main = useMain();
const route = useRoute();
const watchSider = computed(() => main.showSider);
</script>

<template>
  <NSpace justify="space-between" align="center" class="header_container">
    <NSpace>
      <NButton type="primary" circle @click="$router.push('/servers')">
        <template #icon>
          <NIcon>
            <AppSwitcher />
          </NIcon>
        </template>
      </NButton>
      <NButton circle @click="main.changeSider">
        <template #icon>
          <NIcon>
            <TextAlignLeft v-if="watchSider" />
            <TextAlignRight v-if="!watchSider" />
          </NIcon>
        </template>
      </NButton>
    </NSpace>
    <FileHeader v-if="route.path === '/dashboard/editor'" />
  </NSpace>
</template>

<style scoped>
.header_container {
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
