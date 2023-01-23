<script setup lang="tsx">
import {
  NDataTable,
  NSpace,
  NH1,
  NButton,
  type DataTableColumns,
  NIcon,
  useMessage,
  NDivider,
  useDialog,
  NInput,
  NModal,
} from "naive-ui";
import { watch, computed, onMounted, ref, type Ref } from "vue";
import { getDir, createDir, deleteDir, deleteFile, createFile } from "@/apis";
import { useFile } from "@/stores/File";
import { useMain } from "@/stores/Main";

import {
  Folder,
  Document,
  Settings,
  ChevronLeft,
  FolderAdd,
  DocumentAdd,
  Delete,
} from "@vicons/carbon";
import { useRouter } from "vue-router";

const file = useFile();
const main = useMain();
const message = useMessage();
const dialog = useDialog();
const router = useRouter();

const tableLoading = ref(true);
const datas: Ref<Array<any>> = ref([]);

/**
 * 获取数据
 */
const getData = async () => {
  // 加载中
  tableLoading.value = true;
  // 数组恢复默认状态
  datas.value = [];
  // 获取数据
  const data = await getDir(
    main.now?.ip as string,
    main.now?.token as string,
    file.path
  );
  // 遍历DIR
  data.data.DIR.map((item: string) => {
    const i = item.split(";");
    datas.value.push({
      name: i[0],
      type: "folder",
    });
  });
  // 遍历FILES
  data.data.FILES.map((item: string) => {
    const i = item.split(";");
    datas.value.push({
      name: i[0],
      type: "file",
    });
  });
  // 加载完成
  tableLoading.value = false;
};

/**
 * 监听store
 */
const watchPath = computed(() => file.path);
watch(watchPath, async () => {
  await getData();
});

/**
 * 更多操作
 */
let nowOperation: {
  name?: string;
  type?: "folder" | "file";
  path?: string;
} = {};
const isShowOperation = ref(false);

/**
 * 列配置
 */
const columns: DataTableColumns = [
  {
    title: "名称",
    key: "name",
    render(row) {
      if (row.type === "folder") {
        return (
          <NButton
            text
            size="small"
            onClick={() => file.push(row.name as string)}
          >
            {{
              default: () => row.name,
              icon: () => (
                <NIcon>
                  <Folder />
                </NIcon>
              ),
            }}
          </NButton>
        );
      } else {
        return (
          <NButton
            onClick={() =>
              router.push({
                path: "/dashboard/editor",
                query: {
                  path: file.path + "/" + row.name,
                  name: row.name as string,
                },
              })
            }
            text
          >
            {{
              default: () => row.name,
              icon: () => (
                <NIcon>
                  <Document />
                </NIcon>
              ),
            }}
          </NButton>
        );
      }
    },
  },
  {
    key: "operation",
    fixed: "right",
    width: 100,
    render(row) {
      return (
        <NButton
          type="info"
          onClick={() => {
            nowOperation = row;
            isShowOperation.value = !isShowOperation.value;
          }}
        >
          {{
            icon: () => (
              <NIcon>
                <Settings />
              </NIcon>
            ),
            default: () => "操作",
          }}
        </NButton>
      );
    },
  },
];

/**
 * 生命周期钩子
 */
onMounted(async () => await getData());

/**
 * 后退钩子 写个三元装个b 实际上没卵用
 */
const back = () => (file.back() ? "" : message.warning("已经是根目录了"));

/**
 * 新建文件夹
 */
const newFolderName = ref("");
const newFolder = () => {
  const newFolderDialog = dialog.info({
    title: "新建文件夹",
    positiveText: "好",
    negativeText: "取消",
    onPositiveClick: () => {
      return new Promise(async (resolve) => {
        newFolderDialog.loading = true;
        const newer = await createDir(
          main.now?.ip as string,
          main.now?.token as string,
          file.path + "/" + newFolderName.value
        );
        newer.data.status
          ? message.success(newer.data.msg)
          : message.warning(newer.data.msg);
        getData();
        resolve(newer);
      });
    },
    content: () => (
      <NInput
        size="large"
        v-model:value={newFolderName.value}
        placeholder="请输入文件夹名称"
      />
    ),
  });
};

/**
 * 删除文件
 */
const deleter = (type: "folder" | "file", fileName: string) => {
  if (type === "file") {
    const deleteDialog = dialog.warning({
      title: "删除确认",
      content: "确认删除这个文件吗？请三思！",
      positiveText: "好",
      negativeText: "取消",
      onPositiveClick: () => {
        return new Promise(async (resolve) => {
          deleteDialog.loading = true;
          const deleter = await deleteFile(
            main.now?.ip as string,
            main.now?.token as string,
            file.path + "/" + fileName
          );
          deleter.data.status
            ? message.success(deleter.data.msg)
            : message.warning(deleter.data.msg);
          getData();
          // 关闭模态框
          isShowOperation.value = false;
          nowOperation = {};
          resolve(deleter);
        });
      },
    });
  } else if (type === "folder") {
    const deleteDialog = dialog.warning({
      title: "删除确认",
      content: "确认删除这个文件夹吗？请三思！",
      positiveText: "好",
      negativeText: "取消",
      onPositiveClick: () => {
        return new Promise(async (resolve) => {
          deleteDialog.loading = true;
          const deleter = await deleteDir(
            main.now?.ip as string,
            main.now?.token as string,
            file.path + "/" + fileName
          );
          deleter.data.status
            ? message.success(deleter.data.msg)
            : message.warning(deleter.data.msg);
          getData();
          // 关闭模态框
          isShowOperation.value = false;
          nowOperation = {};
          resolve(deleter);
        });
      },
    });
  }
};

/**
 * 新增文件
 */
const newFileName = ref("");
const newFile = () => {
  const newFileDialog = dialog.info({
    title: "新建文件",
    positiveText: "好",
    negativeText: "取消",
    onPositiveClick: () => {
      return new Promise(async (resolve) => {
        newFileDialog.loading = true;
        const newer = await createFile(
          main.now?.ip as string,
          main.now?.token as string,
          file.path + "/" + newFileName.value
        );
        newer.data.status
          ? message.success(newer.data.msg)
          : message.warning(newer.data.msg);
        getData();
        resolve(newer);
      });
    },
    content: () => (
      <NInput
        size="large"
        v-model:value={newFileName.value}
        placeholder="请输入文件名称"
      />
    ),
  });
};
</script>

<template>
  <NSpace vertical>
    <NH1 class="nopad-bottom">文件</NH1>
    {{ file.path }}
    <NDivider class="nopad-bottom nopad-top" />
    <NSpace>
      <NButton circle @click="back">
        <template #icon>
          <NIcon>
            <ChevronLeft />
          </NIcon>
        </template>
      </NButton>
      <NButton circle @click="newFolder">
        <template #icon>
          <NIcon>
            <FolderAdd />
          </NIcon>
        </template>
      </NButton>
      <NButton circle @click="newFile">
        <template #icon>
          <NIcon>
            <DocumentAdd />
          </NIcon>
        </template>
      </NButton>
    </NSpace>
    <NDataTable
      :loading="tableLoading"
      size="large"
      :columns="columns"
      :data="datas"
    />
    <NModal v-model:show="isShowOperation" preset="card" title="更多操作">
      <NButton
        @click="deleter(nowOperation.type as 'folder' | 'file', nowOperation.name as string)"
      >
        删除
        <template #icon>
          <NIcon><Delete /></NIcon>
        </template>
      </NButton>
    </NModal>
  </NSpace>
</template>

<style scoped>
.nopad-bottom {
  margin-bottom: 0;
}
.nopad-top {
  margin-top: 0;
}
</style>
