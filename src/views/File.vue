<script setup lang="tsx">
import { getDir } from "@/apis";
import { useFile } from "@/stores/File";
import { useMain } from "@/stores/Main";
import { NDataTable, NSpace, NButton, type DataTableColumns } from "naive-ui";
import { h, onMounted, ref, type Ref } from "vue";

const file = useFile();
const main = useMain();

const columns: DataTableColumns = [
  {
    title: "名称",
    key: "name",
  },
  {
    title: "类型",
    key: "type",
  },
  {
    title: "操作",
    key: "action",
    render(row) {
      if (row.type === "文件夹") {
        return (
          <NButton onClick={() => file.push(row.name as string)}>打开</NButton>
        );
      } else {
        return <NButton>编辑</NButton>;
      }
    },
  },
];
const datas: Ref<Array<any>> = ref([]);

onMounted(async () => {
  const data = await getDir(
    main.now?.ip as string,
    main.now?.token as string,
    file.path
  );
  data.data.DIR.map((item: string) => {
    const i = item.split(";");
    datas.value.push({
      name: i[0],
      type: "文件夹",
    });
  });
  data.data.FILES.map((item: string) => {
    const i = item.split(";");
    datas.value.push({
      name: i[0],
      type: "文件",
    });
  });
});
</script>

<template>
  <NSpace vertical>
    {{ file.path }}
    <NDataTable size="large" :columns="columns" :data="datas" />
  </NSpace>
</template>
