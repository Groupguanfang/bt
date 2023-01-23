import { computed, defineComponent, type Ref } from "vue";
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

export default defineComponent({
  props: ["name"],
  setup(row) {
    const nameParser = (filename: string | Ref): string => {
      if (typeof filename === "string") {
        const format = filename.split(".");
        return format[format.length - 1];
      } else {
        const format = filename.value.split(".");
        return format[format.length - 1];
      }
    };
    function init() {
      if (row.name === "package.json" || row.name === "package-lock.json") {
        return () => (
          <NIcon>
            <Npm />
          </NIcon>
        );
      } else if (row.name === "yarn.lock") {
        return () => (
          <NIcon>
            <Yarn />
          </NIcon>
        );
      } else if (row.name === "pnpm-lock.yaml") {
        return () => (
          <NIcon>
            <Pnpm />
          </NIcon>
        );
      } else if (row.name === ".gitignore") {
        return () => (
          <NIcon>
            <Git />
          </NIcon>
        );
      } else if (
        row.name === ".prettierrc" ||
        row.name === ".prettierrc.js" ||
        row.name === ".prettierrc.mjs" ||
        row.name === ".prettierrc.json" ||
        row.name === ".prettier.config.js" ||
        row.name === ".prettierrc.yaml" ||
        row.name === ".prettierrc.toml"
      ) {
        return () => (
          <NIcon>
            <Prettier />
          </NIcon>
        );
      }
      const format = nameParser(row.name as string);
      if (format === "js" || format === "cjs" || format === "mjs") {
        return () => (
          <NIcon>
            <Javascript />
          </NIcon>
        );
      } else if (format === "ts") {
        return () => (
          <NIcon>
            <Typescript />
          </NIcon>
        );
      } else if (format === "html") {
        return () => (
          <NIcon>
            <Html />
          </NIcon>
        );
      } else if (format === "md") {
        return () => (
          <NIcon>
            <Markdown />
          </NIcon>
        );
      } else if (format === "json") {
        return () => (
          <NIcon>
            <Json />
          </NIcon>
        );
      } else if (format === "vue") {
        return () => (
          <NIcon>
            <Vue />
          </NIcon>
        );
      } else if (format === "jsx") {
        return () => (
          <NIcon>
            <React />
          </NIcon>
        );
      } else if (format === "tsx") {
        return () => (
          <NIcon>
            <ReactTypescript />
          </NIcon>
        );
      } else if (format === "php") {
        return () => (
          <NIcon>
            <Php />
          </NIcon>
        );
      } else if (format === "sql") {
        return () => (
          <NIcon>
            <Sql />
          </NIcon>
        );
      } else if (format === "css") {
        return () => (
          <NIcon>
            <Css />
          </NIcon>
        );
      } else if (format === "py") {
        return () => (
          <NIcon>
            <Python />
          </NIcon>
        );
      } else if (
        format === "eot" ||
        format === "woff" ||
        format === "woff2" ||
        format === "ttf"
      ) {
        return () => (
          <NIcon>
            <Font />
          </NIcon>
        );
      } else if (
        format === "svg" ||
        format === "png" ||
        format === "jpg" ||
        format === "jpeg" ||
        format === "ico" ||
        format === "bmp"
      ) {
        return () => (
          <NIcon>
            <Img />
          </NIcon>
        );
      } else {
        return () => (
          <NIcon>
            <File />
          </NIcon>
        );
      }
    }
    return computed(() => {
      return init();
    }).value;
  },
});
