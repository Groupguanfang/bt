<script setup lang="ts">
import { NIcon } from "naive-ui";
import Folder from "./icon/Folder.vue";

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
    <Folder />
  </NIcon>
</template>
