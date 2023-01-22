<script setup lang="ts">
import { computed } from "vue"
import { NButton, NIcon, NSpace } from "naive-ui";
import { AppSwitcher, TextAlignLeft, TextAlignRight } from "@vicons/carbon";
import { useMain } from "@/stores/Main"
const main = useMain()
const watchSider = computed(() => main.showSider)
</script>

<template>
  <NSpace align="center" class="header_container">
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
</template>

<style scoped>
.header_container {
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
