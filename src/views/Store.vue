<script setup lang="ts">
import { getSoftList } from "@/apis";
import { useMain } from "@/stores/Main";
import { NH1, NTabPane, NTabs, useMessage } from "naive-ui";
import { onMounted, ref, type Ref } from "vue";
import StoreList from "./StoreList.vue";

const main = useMain();
const message = useMessage();

message.warning("宝塔官方未开放API 暂不支持使用插件");

interface category {
  id: number;
  title: string;
  title_en: string;
  sort?: number;
  ps?: string;
  ps_en?: string;
  icon?: string;
}

const category: Ref<Array<category>> = ref([
  {
    id: 0,
    title: "全部",
    title_en: "All",
  },
  {
    id: -1,
    title: "已安装",
    title_en: "Installed",
  },
]);
const now = ref(-1);
onMounted(async () => {
  const data = await getSoftList(
    <string>main.now?.ip,
    <string>main.now?.token,
    -1
  );
  data.data.type.map((item: any) => {
    category.value.push(item);
  });
});
</script>

<template>
  <div>
    <NH1>商店</NH1>
    <NTabs animated size="large" default-value="全部">
      <NTabPane
        :name="item.title"
        v-for="(item, index) in category"
        :key="index"
      >
        <StoreList :type="item.id" />
      </NTabPane>
    </NTabs>
  </div>
</template>
