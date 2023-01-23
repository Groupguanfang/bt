<script setup lang="ts">
import { NIcon } from "naive-ui";
import Javascript from "@/assets/icon/Javascript.vue";
import Typescript from "@/assets/icon/Typescript.vue";
import Html from "@/assets/icon/Html.vue";
import Markdown from "@/assets/icon/Markdown.vue";
import Json from "@/assets/icon/Json.vue";
import Npm from "@/assets/icon/Npm.vue";
import Yarn from "@/assets/icon/Yarn.vue";
import Pnpm from "@/assets/icon/Pnpm.vue";
import Git from "@/assets/icon/Git.vue";
import Vue from "@/assets/icon/Vue.vue";
import Img from "@/assets/icon/Img.vue";
import React from "@/assets/icon/React.vue";
import ReactTypescript from "@/assets/icon/ReactTs.vue";
import Php from "@/assets/icon/Php.vue";
import Sql from "@/assets/icon/Sql.vue";
import Css from "@/assets/icon/Css.vue";
import Font from "@/assets/icon/Font.vue";
import File from "@/assets/icon/File.vue";
import Python from "@/assets/icon/Python.vue";
import Prettier from "@/assets/icon/Prettier.vue";
const row = defineProps({
  name: {
    type: String,
    required: true,
  },
});
const nameParser = (filename: string): string => {
  const format = filename.split(".");
  return format[format.length - 1];
};
const format = nameParser(row.name);
</script>

<template>
  <NIcon>
    <Npm
      v-if="row.name === 'package.json' || row.name === 'package-lock.json'"
    />
    <Yarn v-else-if="row.name === 'yarn.lock'" />
    <Pnpm v-else-if="row.name === 'pnpm-lock.yaml'" />
    <Git v-else-if="row.name === '.gitignore'" />
    <Prettier
      v-else-if="
        row.name === '.prettierrc' ||
        row.name === '.prettierrc.js' ||
        row.name === '.prettierrc.mjs' ||
        row.name === '.prettierrc.json' ||
        row.name === '.prettier.config.js' ||
        row.name === '.prettierrc.yaml' ||
        row.name === '.prettierrc.toml'
      "
    />
    <Javascript
      v-else-if="format === 'js' || format === 'cjs' || format === 'mjs'"
    />
    <Typescript v-else-if="format === 'ts'" />
    <Html v-else-if="format === 'html'" />
    <Markdown v-else-if="format === 'md'" />
    <Json v-else-if="format === 'json'" />
    <Vue v-else-if="format === 'vue'" />
    <React v-else-if="format === 'jsx'" />
    <ReactTypescript v-else-if="format === 'tsx'" />
    <Php v-else-if="format === 'php'" />
    <Sql v-else-if="format === 'sql'" />
    <Css v-else-if="format === 'css'" />
    <Python v-else-if="format === 'py'" />
    <Font
      v-else-if="
        format === 'eot' ||
        format === 'woff' ||
        format === 'woff2' ||
        format === 'ttf'
      "
    />
    <Img
      v-else-if="
        format === 'svg' ||
        format === 'png' ||
        format === 'jpg' ||
        format === 'jpeg' ||
        format === 'ico' ||
        format === 'bmp'
      "
    />
    <File v-else />
  </NIcon>
</template>
