<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import CodeMirror from "vue-codemirror6";
import { autocompletion } from "@codemirror/autocomplete";
import { oneDark } from "@codemirror/theme-one-dark";

import { markdown as md } from "@codemirror/lang-markdown";
import { vue } from "@codemirror/lang-vue";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { python } from "@codemirror/lang-python";

import { getFileBody } from "@/apis";
import { useMain } from "@/stores/Main";

const route = useRoute();
const main = useMain();

const path = route.query.path;
const name = route.query.name;
const text = ref();
const dark: Ref<boolean> = ref(
  matchMedia("(prefers-color-scheme: dark)").matches
);
let lang: any;

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
} else if (format === "python") {
  lang = python();
}
console.log(lang);

/**
 * 获取文件内容
 */
onMounted(async () => {
  const data = await getFileBody(
    main.now?.ip as string,
    main.now?.token as string,
    path as string
  );
  if (data.data.status) {
    text.value = data.data.data;
  }
});
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
  />
</template>

<style></style>
