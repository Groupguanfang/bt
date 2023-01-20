<script setup lang="ts">
import { NButton, NIcon, NSpace } from "naive-ui";
import { AppSwitcher } from "@vicons/carbon";
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
  </NSpace>
</template>

<style scoped>
.header_container {
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
