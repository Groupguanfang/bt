<script setup lang="ts">
import {
  NCard,
  NGrid,
  NGi,
  NTabPane,
  NTabs,
  NText,
  NSpace,
  NButton,
} from "naive-ui";
import { getPHP, getNodeJS } from "@/apis";
import { onMounted, ref } from "vue";
import { useMain } from "@/stores/Main";
import { SettingsAdjust } from "@vicons/carbon";
const main = useMain();

const PHPdata = ref();
onMounted(async () => {
  const Pdata = await getPHP(<string>main.now?.ip, <string>main.now?.token);
  PHPdata.value = Pdata.data.data;
});
</script>

<template>
  <NTabs size="large">
    <NTabPane name="php">
      <NGrid
        responsive="screen"
        :y-gap="14"
        :x-gap="14"
        cols="1 s:1 m:2 l:3 xl:5 2xl:6"
      >
        <NGi v-for="(item, index) in PHPdata" :key="index">
          <NCard :title="item.name">
            <NSpace vertical>
              <div>添加时间: {{ item.addtime }}</div>
              <NText depth="3">路径: {{ item.path }}</NText>
            </NSpace>
            <template #header-extra>
              <NButton
                circle
                @click="$router.push('/dashboard/site/setting/' + item.id)"
              >
                <template #icon>
                  <SettingsAdjust />
                </template>
              </NButton>
            </template>
          </NCard>
        </NGi>
      </NGrid>
    </NTabPane>
    <NTabPane name="NodeJS"></NTabPane>
  </NTabs>
</template>
