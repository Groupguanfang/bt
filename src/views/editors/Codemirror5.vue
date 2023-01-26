<script setup lang="tsx">
// @ts-ignore
import _CodeMirror from "zlden-codemirror5";
import "zlden-codemirror5/lib/codemirror.css";
import "zlden-codemirror5/theme/monokai.css";
import "zlden-codemirror5/mode/javascript/javascript";
import "zlden-codemirror5/mode/jsx/jsx";
import "zlden-codemirror5/mode/vue/vue";
import "zlden-codemirror5/mode/xml/xml";
import "zlden-codemirror5/mode/sql/sql";
import "zlden-codemirror5/mode/php/php";
import "zlden-codemirror5/mode/lua/lua";
import "zlden-codemirror5/mode/yaml/yaml";
import "zlden-codemirror5/mode/rust/rust";
import "zlden-codemirror5/mode/css/css";
import "zlden-codemirror5/mode/sass/sass";
import "zlden-codemirror5/mode/python/python";
import "zlden-codemirror5/mode/htmlmixed/htmlmixed";
import "zlden-codemirror5/mode/markdown/markdown";
import { onMounted, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useMain } from "@/stores/Main";
import { getFileBody, saveFileBody } from "@/apis";
import { useFile } from "@/stores/File";
import { useMessage } from "naive-ui";

const main = useMain();
const file = useFile();
const message = useMessage();
const route = useRoute();

const text = ref("");
let CodeMirror: any;
const path = route.query.path;
const name = route.query.name;

/**
 * 判断文件扩展名
 */
const nameParser = (): string => {
  const filename = name as string;
  const format = filename.split(".");
  return format[format.length - 1];
};
const format = nameParser();

function getLang() {
  if (
    format === "js" ||
    format === "json" ||
    format === "mjs" ||
    format === "cjs"
  ) {
    return "javascript";
  } else if (format === "jsx" || format === "tsx") {
    return "jsx";
  } else if (format === "md") {
    return "markdown";
  } else if (format === "html") {
    return "htmlmixed";
  } else if (format === "py") {
    return "python";
  } else if (format === "less" || format === "scss") {
    return "sass";
  } else {
    return format;
  }
}

onMounted(async () => {
  const data = await getFileBody(
    main.now?.ip as string,
    main.now?.token as string,
    path as string
  );
  text.value = data.data.data;
  CodeMirror = _CodeMirror.fromTextArea(document.querySelector("#main"), {
    theme: "monokai",
    lineNumbers: true,
    autofocus: true,
    lineWrapping: true,
    hint: true,
    mode: getLang(),
  });
  CodeMirror.setOption("value", data.data.data);
  CodeMirror.on("change", () => {
    text.value = CodeMirror.getValue();
  });
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
  <textarea id="main"></textarea>
</template>

<style>
.CodeMirror {
  font-family: "JetBrains Mono", "v-mono", v-sans, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  height: auto;
  z-index: 0;
}
</style>
