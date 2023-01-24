<script setup lang="ts">
import ace from "ace-builds";
import { onMounted, ref, watch, computed } from "vue";
import { VAceEditor } from "vue3-ace-editor";
import themeMonokai from "ace-builds/src-noconflict/theme-monokai?url";
import { getFileBody, saveFileBody } from "@/apis";
import { useMain } from "@/stores/Main";
import { useRoute } from "vue-router";
import { useMessage } from "naive-ui";
import { useFile } from "@/stores/File";

const main = useMain();
const file = useFile();
const route = useRoute();
const message = useMessage();

const path = route.query.path;
const name = route.query.name;

const text = ref("");

/**
 * 获取内容
 */
onMounted(async () => {
  const data = await getFileBody(
    main.now?.ip as string,
    main.now?.token as string,
    path as string
  );
  text.value = data.data.data;
});

/**
 * 保存
 */
watch(
  computed(() => file.handler),
  async () => {
    const upstream = await saveFileBody(
      main.now?.ip as string,
      main.now?.token as string,
      path as string,
      text.value
    );
    message.success(upstream.data.msg);
  }
);

/**
 * 主题
 */
ace.config.setModuleUrl("ace/theme/monokai", themeMonokai);
/**
 * 高亮
 */
</script>

<template>
  <VAceEditor class="main" v-model:value="text" theme="monokai" />
</template>

<style>
.main {
  font-family: "JetBrains Mono", v-sans, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  width: 100%;
  height: 100%;
}
</style>
