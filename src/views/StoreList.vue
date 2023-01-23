<script setup lang="ts">
import { getSoftList } from "@/apis";
import { useMain } from "@/stores/Main";
import { NCard, NGi, NGrid, NButton, useMessage } from "naive-ui";
import { onMounted, ref, type Ref } from "vue";

const main = useMain();
const message = useMessage();

const props = defineProps({
  type: Number,
});

interface list {
  title?: string;
  ps?: string;
  price?: number;
  status?: boolean;
}

const list: Ref<Array<list>> = ref([]);
onMounted(async () => {
  const data = await getSoftList(
    main.now?.ip as string,
    main.now?.token as string,
    props.type as number
  );
  list.value = data.data.list.data;
  console.log(data.data.list.data);
});
</script>

<template>
  <NGrid
    :y-gap="14"
    :x-gap="14"
    responsive="screen"
    cols="1 s:1 m:2 l:3 xl:4 2xl:5"
  >
    <NGi v-for="(item, index) in list" :key="index">
      <NCard :title="item.title">
        <div v-html="item.ps" />
        <template #header-extra>
          <NButton
            @click="message.warning('宝塔官方未开放API 暂不支持使用插件')"
            v-if="!item.status"
            >¥ {{ item.price }}</NButton
          >
        </template>
      </NCard>
    </NGi>
  </NGrid>
</template>
