<script setup lang="ts">
import { NCard, NGrid, NGi, NText, NH2 } from "naive-ui";

defineProps({
  site: Number,
  database: Number,
  ftp: Number,
});
</script>

<template>
  <NCard>
    <NGrid :x-gap="5" cols="3">
      <NGi>
        <NText :depth="3">FTP</NText>
        <NH2 class="nopad">{{ ftp }}</NH2>
      </NGi>
      <NGi @click="$router.push('/dashboard/site')">
        <NText :depth="3">网站</NText>
        <NH2 class="nopad">{{ site }}</NH2>
      </NGi>
      <NGi @click="$router.push('/dashboard/database')">
        <NText :depth="3">数据库</NText>
        <NH2 class="nopad">{{ database }}</NH2>
      </NGi>
    </NGrid>
  </NCard>
</template>

<style scoped>
.nopad {
  margin-top: 15px;
  margin-bottom: 0;
}
</style>
