<script setup lang="ts">
import {
  NButton,
  NButtonGroup,
  NDivider,
  NH6,
  NIcon,
  NInputNumber,
  NModal,
  NSpace,
  NSwitch,
  useMessage,
} from "naive-ui";
import { Save, Settings } from "@vicons/carbon";
import { useFile } from "@/stores/File";
import { computed, ref } from "vue";
import { useSetting } from "@/stores/Setting";

const file = useFile();
const setting = useSetting();
const message = useMessage();

const isChange = computed(() => file.isChange);
const settingPanel = ref(false);
const onWrapChanged = () => {
  if (setting.editor === "Ace") {
    message.warning("刷新页面后生效");
  }
};
</script>

<template>
  <NButtonGroup>
    <NButton type="info" @click="file.handler = !file.handler">
      <template #icon>
        <NIcon>
          <Save />
        </NIcon>
      </template>
      {{ isChange ? "未保存" : "保存" }}
    </NButton>
    <NButton circle @click="settingPanel = true">
      <template #icon>
        <NIcon>
          <Settings />
        </NIcon>
      </template>
    </NButton>
    <NModal
      style="max-width: 95%"
      title="快速设置"
      preset="card"
      v-model:show="settingPanel"
    >
      <NSpace vertical>
        <NH6 class="nopad">文字大小</NH6>
        <NInputNumber :min="1" v-model:value="file.size">
          <template #suffix>px</template>
        </NInputNumber>
        <NDivider />
        <NH6 class="nopad">换行</NH6>
        <NSwitch @change="onWrapChanged" v-model:value="file.wrap" />
      </NSpace>
    </NModal>
  </NButtonGroup>
</template>

<style scoped>
.nopad {
  margin: 0;
}
</style>
