<script setup lang="ts">
import { getDir } from "@/apis";
import { useFile } from "@/stores/File";
import { useMain } from "@/stores/Main";
import { NDataTable, NSpace, type DataTableColumns } from "naive-ui";
import { onMounted, ref, type Ref } from "vue";

const file = useFile();
const main = useMain();

const columns: DataTableColumns = [
  {
    title: "名称",
    key: "name",
  },
  {
    title: "格式",
    key: "format",
  },
  {
    title: "权限",
    key: "control",
  },
  {
    title: "备注",
    key: "info",
  },
];
const datas: Ref<Array<any>> = ref([]);

onMounted(async () => {
  const data = await getDir(
    <string>main.now?.ip,
    <string>main.now?.token,
    file.path
  );
  const DIR = data.data.DIR.map((item: string) => {
    const i = item.split(";");
    datas.value.push({
      name: i[0],
      info: i[10],
      control: i[3],
    });
  });
  const FILES = data.data.FILES.map((item: string) => {
    return item.split(";");
  });
  console.log(DIR);
});
</script>

<template>
  <NSpace vertical>
    {{ file.path }}
    <NDataTable :columns="columns" :data="datas" />
  </NSpace>
</template>
