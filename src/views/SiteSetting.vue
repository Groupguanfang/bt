<script setup lang="ts">
import { getDomain, getPHP } from "@/apis";
import { useMain } from "@/stores/Main";
import { NDivider, NH1 } from "naive-ui";
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const main = useMain();
const id = route.params.id;

const domain = ref([]);
const site: Ref<any> = ref({});
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
    if (sites.data.data[item].id == id) site.value = sites.data.data[item];
  }
  console.log(sites);
});
</script>

<template>
  <div>
    <NH1 class="nopad">{{ site.name }}</NH1>
    <NDivider class="divider" />
  </div>
</template>

<style scoped></style>
