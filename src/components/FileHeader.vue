<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import { Save } from "@vicons/carbon";
import { useFile } from "@/stores/File";
import { computed } from "vue";
const file = useFile();
const isChange = computed(() => file.isChange);
</script>

<template>
  <NButton type="info" @click="file.handler = !file.handler">
    <template #icon>
      <NIcon>
        <Save />
      </NIcon>
    </template>
    {{ isChange ? "未保存" : "保存" }}
  </NButton>
</template>
