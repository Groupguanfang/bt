<script setup lang="ts">
import { getDomain, getPHP } from "@/apis";
import { useMain } from "@/stores/Main";
import {
  NButton,
  NDivider,
  NH1,
  NH6,
  NGi,
  NCard,
  NGrid,
  NText,
  NTag,
  NTabs,
  NTabPane,
  NList,
  NListItem,
  NSpace
} from "naive-ui";
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const main = useMain();
const id = route.params.id;

const domain = ref([]);
const site: Ref<any> = ref({
  ssl: {
    dns: [],
  },
});
onMounted(async () => {
  // 域名
  const domains = await getDomain(
    <string>main.now?.ip,
    <string>main.now?.token,
    {
      search: id,
      list: true,
    }
  );
  domain.value = domains.data;
  // 网站
  const sites = await getPHP(<string>main.now?.ip, <string>main.now?.token, {});
  for (let item in sites.data.data) {
    if (sites.data.data[item].id == id) {
      site.value = sites.data.data[item];
      console.log(sites.data.data[item]);
    }
  }
});
</script>

<template>
  <div>
    <NH1 class="nopad">{{ site.name }}</NH1>
    <NTabs size="large">
      <NTabPane name="概览">
        <NGrid
          responsive="screen"
          y-gap="14"
          x-gap="14"
          cols="1 s:1 m:2 l:4 xl:5 2xl:6"
        >
          <NGi>
            <NCard title="操作">
              <NList>
                <NListItem>
                  <NSpace align="center" justify="space-between">
                    <NText>网站状态</NText>
                    <NButton type="error">停用</NButton>
                  </NSpace>
                </NListItem>
              </NList>
            </NCard>
          </NGi>
          <NGi>
            <NCard title="php版本">
              {{ site.php_version }}
              <template #header-extra>
                <NButton>更改</NButton>
              </template>
            </NCard>
          </NGi>
          <NGi>
            <NCard title="SSL">
              <template #header-extra>
                <NButton>设置</NButton>
              </template>
              <NH6>品牌</NH6>
              <NText>{{ site.ssl.issuer }}</NText>
              <NH6>授权域名</NH6>
              <NTag
                v-for="(item, index) in site['ssl']['dns']"
                :key="index"
                :bordered="false"
                type="primary"
              >
                {{ item }}
              </NTag>
            </NCard>
          </NGi>
        </NGrid>
      </NTabPane>
      <NTabPane name="php版本"> </NTabPane>
      <NTabPane name="SSL"> </NTabPane>
      <NTabPane name="反向代理"> </NTabPane>
    </NTabs>
  </div>
</template>

<style scoped></style>
