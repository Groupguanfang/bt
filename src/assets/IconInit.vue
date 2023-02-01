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
import Editorconfig from "./icon/Editorconfig.vue";
import Eslint from "./icon/Eslint.vue";
import NestController from "./icon/NestController.vue";
import NestModule from "./icon/NestModule.vue";
import NestPipe from "./icon/NestPipe.vue";
import NestMiddleware from "./icon/NestMiddleware.vue";
import NestService from "./icon/NestService.vue";
import NestDecorator from "./icon/NestDecorator.vue";
import TestTs from "./icon/TestTs.vue";
import DeclareTs from "./icon/DeclareTs.vue";
import Yaml from "./icon/Yaml.vue";
import Xml from "./icon/Xml.vue";
import Jest from "./icon/Json.vue";

import { computed, ref, watch } from "vue";

const row = defineProps({
  name: {
    type: String,
    required: true,
  },
});
const name = ref(row.name);
const nameParser = (filename: string): string => {
  const format = filename.split(".");
  return format[format.length - 1];
};
let format = nameParser(row.name);
watch(
  computed(() => row.name),
  () => {
    name.value = row.name;
    format = nameParser(row.name);
  }
);
</script>

<template>
  <NIcon>
    <Npm v-if="name === 'package.json' || name === 'package-lock.json'" />
    <Jest v-else-if="/jest-e2e.json/.test(name)" />
    <Yarn v-else-if="name === 'yarn.lock'" />
    <Pnpm v-else-if="name === 'pnpm-lock.yaml'" />
    <Git v-else-if="name === '.gitignore'" />
    <DeclareTs v-else-if="/.d.ts$/g.test(name)" />
    <!-- Nest家族 -->
    <NestController v-else-if="/.controller.ts$/g.test(name)" />
    <NestModule v-else-if="/.module.ts$/g.test(name)" />
    <NestPipe v-else-if="/.pipe.ts$/g.test(name)" />
    <NestMiddleware v-else-if="/.middleware.ts$/g.test(name)" />
    <NestService v-else-if="/.service.ts$/g.test(name)" />
    <NestDecorator v-else-if="/.decorator.ts$/g.test(name)" />
    <!-- 测试 -->
    <TestTs v-else-if="/.spec.ts$/g.test(name)" />
    <Prettier
      v-else-if="
        name === '.prettierrc' ||
        name === '.prettierrc.js' ||
        name === '.prettierrc.mjs' ||
        name === '.prettierrc.json' ||
        name === '.prettier.config.js' ||
        name === '.prettierrc.yaml' ||
        name === '.prettierrc.toml' ||
        name === '.prettierignore'
      "
    />
    <Editorconfig v-else-if="name === '.editorconfig'" />
    <Eslint
      v-else-if="
        name === '.eslintignore' ||
        name === '.eslintrc' ||
        name === '.eslintrc.js' ||
        name === '.eslintrc.json' ||
        name === '.eslintrc.cjs'
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
    <Yaml v-else-if="format === 'yaml' || format === 'yml'" />
    <Xml v-else-if="format === 'xml'" />
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
