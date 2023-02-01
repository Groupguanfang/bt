<script setup lang="ts">
import { useSetting } from "@/stores/Setting";
import {
  NH1,
  NH4,
  NRadio,
  NRadioGroup,
  NSpace,
  NTabPane,
  NTabs,
  NText,
} from "naive-ui";
import { ref } from "vue";
import { useMain } from "@/stores/Main";
import i18n from "@/i18n";

const setting = useSetting();
const main = useMain();

/**
 * 切换语言
 */
const language = ref();
(() =>
  main.locale === "zh"
    ? (language.value = i18n("zh", "menu"))
    : (language.value = i18n("", "menu")))();
</script>

<template>
  <div>
    <NH1>{{ language.setting }}</NH1>
    <NTabs size="large">
      <NTabPane name="本地设置">
        <NSpace vertical>
          <NH4 class="nopad">编辑器设置</NH4>
          <NRadioGroup
            :default-value="setting.editor"
            v-model:value="setting.editor"
            name="Editor Core"
            size="large"
          >
            <NRadio value="Ace" label="Ace Editor" />
            <NRadio value="Codemirror 6" label="Codemirror 6" />
            <NRadio value="Monaco" label="Monaco Editor" />
            <NRadio value="Codemirror 5" label="Codemirror 5" />
          </NRadioGroup>
          <NText depth="3">
            Ace Editor:
            对移动端友好，有自动提示和代码纠错，但是不支持Vue文件的编辑(Vue党哭泣
            只能用html模式来弥补
          </NText>
          <NText depth="3">
            Codemirror 6:
            对移动端支持一般，如果你的手机比较老旧的学生党千万别用这个。官方是支持Vue文件的编辑，但是目前v6版本还需要社区酝酿，所以...自动补全那些基本没有，代码纠错只有JSON文件支持。
          </NText>
          <NText depth="3">
            Monaco Editor:
            完全不支持移动端，微软出品，Vscode同款编辑器，性能那是杠杠的。如果您现在的设备是电脑，那么建议用这个。
          </NText>
          <NText depth="3">
            Codemirror 5: 对移动端支持一般，没有代码提示，但是性能比v6版本好。
          </NText>
        </NSpace>
      </NTabPane>
    </NTabs>
  </div>
</template>

<style scoped>
.nopad {
  margin-bottom: 0;
}
</style>
