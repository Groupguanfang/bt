<script setup lang="ts">
import ace from "ace-builds";
import { onMounted, ref, watch, computed } from "vue";
import { VAceEditor } from "vue3-ace-editor";
import { getFileBody, saveFileBody } from "@/apis";
import { useMain } from "@/stores/Main";
import { useRoute } from "vue-router";
import { useMessage } from "naive-ui";
import { useFile } from "@/stores/File";

import "ace-builds/src-noconflict/ext-language_tools";

import themeMonokai from "ace-builds/src-noconflict/theme-monokai?url";
import javascript from "ace-builds/src-noconflict/mode-javascript?url";
import typescript from "ace-builds/src-noconflict/mode-typescript?url";
import html from "ace-builds/src-noconflict/mode-html_elixir?url";
import json from "ace-builds/src-noconflict/mode-json?url";
import css from "ace-builds/src-noconflict/mode-css?url";
import less from "ace-builds/src-noconflict/mode-less?url";
import yaml from "ace-builds/src-noconflict/mode-yaml?url";
import php from "ace-builds/src-noconflict/mode-php?url";
import sql from "ace-builds/src-noconflict/mode-sql?url";
import jsx from "ace-builds/src-noconflict/mode-jsx?url";
import tsx from "ace-builds/src-noconflict/mode-tsx?url";
import toml from "ace-builds/src-noconflict/mode-toml?url";
import markdown from "ace-builds/src-noconflict/mode-markdown?url";

import javascriptWorker from "ace-builds/src-noconflict/worker-javascript?url";
import htmlWorker from "ace-builds/src-noconflict/worker-html?url";
import yamlWorker from "ace-builds/src-noconflict/worker-yaml?url";
import cssWorker from "ace-builds/src-noconflict/worker-css?url";
import jsonWorker from "ace-builds/src-noconflict/worker-json?url";
import phpWorker from "ace-builds/src-noconflict/worker-php?url";

import typescriptSnippets from "ace-builds/src-noconflict/snippets/typescript?url";
import javascriptSnippets from "ace-builds/src-noconflict/snippets/javascript?url";
import htmlSnippets from "ace-builds/src-noconflict/snippets/html?url";
import yamlSnippets from "ace-builds/src-noconflict/snippets/yaml?url";
import cssSnippets from "ace-builds/src-noconflict/snippets/css?url";
import jsonSnippets from "ace-builds/src-noconflict/snippets/json?url";
import phpSnippets from "ace-builds/src-noconflict/snippets/php?url";
import sqlSnippets from "ace-builds/src-noconflict/snippets/sql?url";
import jsxSnippets from "ace-builds/src-noconflict/snippets/jsx?url";
import tsxSnippets from "ace-builds/src-noconflict/snippets/tsx?url";
import tomlSnippets from "ace-builds/src-noconflict/snippets/toml?url";
import markdownSnippets from "ace-builds/src-noconflict/snippets/markdown?url";

const main = useMain();
const file = useFile();
const route = useRoute();
const message = useMessage();

const path = route.query.path;
const name = route.query.name;

const text = ref("");
const lang = ref("");
const size = ref(file.size);
watch(
  computed(() => file.size),
  () => (size.value = file.size)
);
const wrap = computed(() => file.wrap);
const options = ref({
  tabSize: 2,
  fadeFoldWidgets: true,
  fixedWidthGutter: true,
  showFoldWidgets: true,
  animatedScroll: true,
  useSoftTabs: true,
  useWorker: true,
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true,
});

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
 * 判断文件扩展名
 */
const nameParser = (): string => {
  const filename = name as string;
  const format = filename.split(".");
  return format[format.length - 1];
};
const format = nameParser();

/**
 * 高亮
 */
if (format === "ts") {
  ace.config.setModuleUrl("ace/mode/typescript", typescript);
  ace.config.setModuleUrl("ace/mode/typescript_worker", javascriptWorker);
  ace.config.setModuleUrl("ace/snippets/javascript", javascriptSnippets);
  ace.config.setModuleUrl("ace/snippets/typescript", typescriptSnippets);
  lang.value = "typescript";
} else if (format === "js" || format === "cjs" || format === "mjs") {
  ace.config.setModuleUrl("ace/mode/javascript", javascript);
  ace.config.setModuleUrl("ace/mode/javascript_worker", javascriptWorker);
  ace.config.setModuleUrl("ace/snippets/javascript", javascriptSnippets);
  lang.value = "javascript";
} else if (format === "vue" || format === "html") {
  ace.config.setModuleUrl("ace/mode/html", html);
  ace.config.setModuleUrl("ace/mode/html_worker", htmlWorker);
  ace.config.setModuleUrl("ace/snippets/html", htmlSnippets);
  lang.value = "html";
} else if (format === "json") {
  ace.config.setModuleUrl("ace/mode/json", json);
  ace.config.setModuleUrl("ace/mode/json_worker", jsonWorker);
  ace.config.setModuleUrl("ace/snippets/json", jsonSnippets);
  lang.value = "json";
} else if (format === "css") {
  ace.config.setModuleUrl("ace/mode/css", css);
  ace.config.setModuleUrl("ace/mode/css_worker", cssWorker);
  ace.config.setModuleUrl("ace/snippets/css", cssSnippets);
  lang.value = "css";
} else if (format === "less") {
  ace.config.setModuleUrl("ace/mode/less", less);
  ace.config.setModuleUrl("ace/mode/css_worker", cssWorker);
  ace.config.setModuleUrl("ace/snippets/css", cssSnippets);
  lang.value = "less";
} else if (format === "yaml") {
  ace.config.setModuleUrl("ace/mode/yaml", yaml);
  ace.config.setModuleUrl("ace/mode/yaml_worker", yamlWorker);
  ace.config.setModuleUrl("ace/snippets/yaml", yamlSnippets);
  lang.value = "yaml";
} else if (format === "php") {
  ace.config.setModuleUrl("ace/mode/php", php);
  ace.config.setModuleUrl("ace/mode/php_worker", phpWorker);
  ace.config.setModuleUrl("ace/snippets/php", phpSnippets);
} else if (format === "sql") {
  ace.config.setModuleUrl("ace/mode/sql", sql);
  ace.config.setModuleUrl("ace/snippets/sql", sqlSnippets);
} else if (format === "jsx") {
  ace.config.setModuleUrl("ace/mode/jsx", jsx);
  ace.config.setModuleUrl("ace/snippets/jsx", jsxSnippets);
} else if (format === "tsx") {
  ace.config.setModuleUrl("ace/mode/tsx", tsx);
  ace.config.setModuleUrl("ace/snippets/tsx", tsxSnippets);
} else if (format === "toml") {
  ace.config.setModuleUrl("ace/mode/toml", toml);
  ace.config.setModuleUrl("ace/snippets/toml", tomlSnippets);
  lang.value = "toml";
} else if (format === "md") {
  ace.config.setModuleUrl("ace/mode/markdown", markdown);
  ace.config.setModuleUrl("ace/snippets/markdown", markdownSnippets);
  lang.value = "markdown";
}
</script>

<template>
  <v-ace-editor
    class="main"
    v-model:value="text"
    theme="monokai"
    :lang="lang"
    :options="options"
    :style="{ fontSize: size + 'px' }"
    :wrap="wrap"
  />
</template>

<style>
@font-face {
  font-family: "JetBrains Mono";
  src: url("/fonts/JetBrainsMono-Regular.woff") format("woff"),
    url("/fonts/JetBrainsMono-Regular.woff2") format("woff2"),
    url("/fonts/JetBrainsMono-Regular-2.ttf") format("ttf");
}
.main {
  font-family: "JetBrains Mono", "v-mono", v-sans, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
