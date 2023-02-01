<script setup lang="ts">
import * as Monaco from "monaco-editor";
import { useDark } from "@vueuse/core";
import { onMounted, watch, computed } from "vue";
import { getFileBody, saveFileBody } from "@/apis";
import { useMain } from "@/stores/Main";
import { useRoute } from "vue-router";
import { useMessage } from "naive-ui";
import { useFile } from "@/stores/File";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

const isDark = useDark();
const main = useMain();
const file = useFile();
const route = useRoute();
const message = useMessage();
const path = route.query.path;
const name = route.query.name;

self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

/**
 * 判断文件扩展名
 */
const nameParser = (): string => {
  const filename = name as string;
  const format = filename.split(".");
  return format[format.length - 1];
};
const format = nameParser();
const language = () => {
  if (
    format === "js" ||
    format === "mjs" ||
    format === "cjs" ||
    format === "ts" ||
    format === "tsx" ||
    format === "jsx"
  ) {
    return "typescript";
  } else if (format === "vue") {
    return "html";
  } else if (format === "py") {
    return "python";
  } else if (format === "md") {
    return "markdown";
  } else if (format === "sh") {
    return "shell";
  }
  return format;
};

let editor: Monaco.editor.IStandaloneCodeEditor;
const dark = computed(() => isDark.value);
onMounted(async () => {
  // init data
  const data = await getFileBody(
    main.now?.ip as string,
    main.now?.token as string,
    path as string
  );
  if (!data.data.status) message.warning("数据请求失败 请刷新页面重试");
  // init editor
  editor = Monaco.editor.create(
    document.getElementById("monaco") as HTMLElement,
    {
      theme: dark.value ? "vs-dark" : "vs",
      value: data.data.status ? data.data.data : "",
      language: language(),
      tabSize: 2,
      wordWrap: file.wrap ? "on" : "off",
    }
  );
});

/**
 * 黑暗
 */
watch(dark, (val) => {
  editor.updateOptions({
    theme: val ? "vs-dark" : "vs",
  });
});

/**
 * 换行
 */
watch(
  computed(() => file.wrap),
  (val) => {
    editor.updateOptions({
      wordWrap: val ? "on" : "off",
    });
  }
);

/**
 * 字体大小
 */
watch(
  computed(() => file.size),
  (val) => {
    editor.updateOptions({
      fontSize: val,
    });
  }
);

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
      editor.getValue()
    );
    message.success(upstream.data.msg);
  }
);
</script>

<template>
  <div id="monaco" style="height: 100%"></div>
</template>
