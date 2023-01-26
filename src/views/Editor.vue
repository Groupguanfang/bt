<script setup lang="ts">
import Codemirror from "./editors/Codemirror.vue";
import Ace from "./editors/Ace.vue";
import { useSetting } from "@/stores/Setting";
import Monaco from "./editors/Monaco.vue";
import Codemirror5 from "./editors/Codemirror5.vue";
const setting = useSetting();
</script>

<template>
  <Codemirror v-if="setting.editor === 'Codemirror 6'" />
  <Ace v-if="setting.editor === 'Ace'" />
  <Monaco v-if="setting.editor === 'Monaco'" />
  <Codemirror5 v-if="setting.editor === 'Codemirror 5'" />
</template>
