<script setup lang="ts">
import { NGrid, NGi, NTabPane, NTabs, NH1 } from "naive-ui";
import { getPHP, getNodeJS } from "@/apis";
import { onMounted, ref } from "vue";
import { useMain } from "@/stores/Main";
import SiteCard from "@/components/Site/SiteCard.vue";
const main = useMain();

const PHPdata = ref();
const Nodedata = ref();
onMounted(async () => {
  const Pdata = await getPHP(<string>main.now?.ip, <string>main.now?.token, {});
  PHPdata.value = Pdata.data.data;

  const Ndata = await getNodeJS(<string>main.now?.ip, <string>main.now?.token);
  Nodedata.value = Ndata.data.data;
});
</script>

<template>
  <div>
    <NH1>项目</NH1>
    <NTabs size="large">
      <NTabPane name="php">
        <NGrid
          responsive="screen"
          :y-gap="14"
          :x-gap="14"
          cols="1 s:1 m:2 l:3 xl:5 2xl:6"
        >
          <NGi v-for="(item, index) in PHPdata" :key="index">
            <SiteCard
              :title="item.name"
              :time="item.addtime"
              :path="item.path"
              :id="item.id"
            />
          </NGi>
        </NGrid>
      </NTabPane>
      <NTabPane name="NodeJS">
        <NGrid
          responsive="screen"
          :y-gap="14"
          :x-gap="14"
          cols="1 s:1 m:2 l:3 xl:5 2xl:6"
        >
          <NGi v-for="(item, index) in Nodedata" :key="index">
            <SiteCard
              :title="item.name"
              :time="item.addtime"
              :path="item.path"
              :id="item.id"
            />
          </NGi>
        </NGrid>
      </NTabPane>
    </NTabs>
  </div>
</template>
