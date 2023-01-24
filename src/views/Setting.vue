<script setup lang="ts">
import { useSetting } from "@/stores/Setting";
import {
  NH4,
  NRadioButton,
  NRadioGroup,
  NSpace,
  NTabPane,
  NTabs,
} from "naive-ui";
const setting = useSetting();
</script>

<template>
  <NTabs size="large">
    <NTabPane name="本地设置">
      <NSpace vertical>
        <NH4 class="nopad">编辑器设置</NH4>
        <NRadioGroup
          :default-value="setting.editor"
          v-model:value="setting.editor"
          name="Editor Core"
        >
          <NRadioButton value="Ace" label="Ace Editor" />
          <NRadioButton value="Codemirror 6" label="Codemirror 6" />
        </NRadioGroup>
      </NSpace>
    </NTabPane>
  </NTabs>
</template>

<style scoped>
.nopad {
  margin-bottom: 0;
}
</style>
