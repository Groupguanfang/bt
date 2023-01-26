<script setup lang="tsx">
import { getCrontab, getLogs } from "@/apis";
import { useMain } from "@/stores/Main";
import {
  NButton,
  NDataTable,
  NH1,
  NLog,
  NModal,
  NSpace,
  useMessage,
  type DataTableColumns,
} from "naive-ui";
import { onMounted, ref, watch, computed } from "vue";

const main = useMain();
const message = useMessage();

const data = ref([]);
const showLog = ref(false);
let nowId: number = 0;
const content = ref("666");

onMounted(async () => {
  const list = await getCrontab(
    main.now?.ip as string,
    main.now?.token as string
  );
  console.log(list.data);
  data.value = list.data;
});

watch(showLog, async (val) => {
  if (val) {
    const log = await getLogs(
      main.now?.ip as string,
      main.now?.token as string,
      nowId
    );
    console.log(log);
    content.value = log.data.msg;
  }
});

const columns: DataTableColumns = [
  {
    title: "id",
    key: "id",
    minWidth: 50,
    fixed: "left",
  },
  {
    title: "任务名称",
    key: "name",
    minWidth: 150,
  },
  {
    title: "周期",
    key: "cycle",
    minWidth: 200,
  },
  {
    title: "操作",
    key: "operation",
    render(row) {
      return (
        <NButton
          onClick={() => {
            nowId = row.id as number;
            showLog.value = true;
          }}
        >
          操作
        </NButton>
      );
    },
    fixed: "right",
  },
];
</script>

<template>
  <NSpace vertical>
    <NH1>任务</NH1>
    <NDataTable :columns="columns" :data="data" />
    <NModal v-model:show="showLog" preset="dialog">
      <NLog trim :log="content" />
    </NModal>
  </NSpace>
</template>
