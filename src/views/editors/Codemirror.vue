<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch, type Ref } from "vue";
import { useRoute } from "vue-router";
import CodeMirror from "vue-codemirror6";
import { autocompletion } from "@codemirror/autocomplete";
import { oneDark } from "@codemirror/theme-one-dark";
import { markdown as md } from "@codemirror/lang-markdown";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { rust } from "@codemirror/lang-rust";
import { json, jsonParseLinter } from "@codemirror/lang-json";

import { getFileBody, saveFileBody } from "@/apis";
import { useMain } from "@/stores/Main";
import { useFile } from "@/stores/File";
import { useMessage } from "naive-ui";

const route = useRoute();
const main = useMain();
const file = useFile();
const message = useMessage();

const path = route.query.path;
const name = route.query.name;
const text = ref();
const dark: Ref<boolean> = ref(
  matchMedia("(prefers-color-scheme: dark)").matches
);
let lang: any;
let lint: any;
/**
 * 判断文件扩展名
 */
const nameParser = (): string => {
  const filename = name as string;
  const format = filename.split(".");
  return format[format.length - 1];
};
const format = nameParser();
if (format === "js" || format === "cjs" || format === "mjs") {
  lang = javascript();
} else if (format === "jsx") {
  lang = javascript({
    jsx: true,
  });
} else if (format === "tsx" || format === "ts") {
  lang = javascript({
    jsx: true,
    typescript: true,
  });
  console.log("ts");
} else if (format === "vue") {
  lang = html({
    matchClosingTags: true,
    autoCloseTags: true,
  });
} else if (format === "md") {
  lang = md();
} else if (format === "html") {
  lang = html({
    matchClosingTags: true,
    autoCloseTags: true,
  });
} else if (
  format === "css" ||
  format === "less" ||
  format === "scss" ||
  format === "sass"
) {
  lang = css();
} else if (format === "py") {
  lang = python();
} else if (format === "php") {
  lang = php();
} else if (format === "cpp") {
  lang = cpp();
} else if (format === "rust") {
  lang = rust();
} else if (format === "json") {
  lang = json();
  lint = jsonParseLinter();
}
console.log(lang);

/**
 * 获取文件内容
 */
onBeforeMount(async () => {
  const data = await getFileBody(
    main.now?.ip as string,
    main.now?.token as string,
    path as string
  );
  if (data.data.status) {
    text.value = data.data.data;
  }
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
</script>

<template>
  <CodeMirror
    :extensions="[oneDark, autocompletion({ activateOnTyping: true })]"
    :lang="lang"
    :dark="dark"
    v-model="text"
    :gutter="true"
    :tab-size="2"
    :wrap="true"
    :basic="true"
    :linter="lint"
  />
</template>

<style></style>
