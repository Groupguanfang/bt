<script setup lang="tsx">
import {
  NA,
  NH1,
  NTable,
  NDataTable,
  type DataTableColumns,
  NButton,
  NSpace,
} from "naive-ui";
import { GetDatabase, getSoftFind } from "@/apis";
import { onMounted, ref } from "vue";
import { useMain } from "@/stores/Main";

const main = useMain();

/**
 * 获取数据
 */
const data = ref([]);
const phpmyadmins = ref({
  ext: {
    url: "",
  },
});
onMounted(async () => {
  const database = await GetDatabase(
    main.now?.ip as string,
    main.now?.token as string
  );
  const phpmyadmin = await getSoftFind(
    main.now?.ip as string,
    main.now?.token as string,
    "phpmyadmin"
  );
  phpmyadmins.value = phpmyadmin.data;
  data.value = database.data.data;
  console.log(phpmyadmin.data);
});

/**
 * 列配置
 */
const columns: DataTableColumns = [
  {
    title: "名称",
    key: "name",
    minWidth: 100,
  },
  {
    title: "用户名",
    key: "username",
    minWidth: 120,
  },
  {
    title: "密码",
    key: "password",
    minWidth: 120,
    render(row): string {
      if (!row.password) {
        return "无法获取密码";
      } else {
        return row.password as string;
      }
    },
  },
  {
    title: "添加时间",
    key: "addtime",
    minWidth: 180,
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    render(row) {
      return <NButton>操作</NButton>;
    },
  },
];
</script>

<template>
  <NSpace vertical>
    <NH1 style="margin-bottom: 5px">数据</NH1>
    <NTable size="large">
      <tbody>
        <tr class="space">
          <td>PHPMyAdmin</td>
          <td>
            <NButton tag="a" :href="phpmyadmins.ext.url" target="_blank">
              打开
            </NButton>
          </td>
        </tr>
      </tbody>
    </NTable>
    <NDataTable size="large" :columns="columns" :data="data" />
  </NSpace>
</template>

<style scoped>
.space {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
