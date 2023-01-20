<script setup lang="ts">
import {
  NButton,
  NCard,
  NEmpty,
  NGi,
  NGrid,
  NH1,
  NIcon,
  NInput,
  NLayout,
  NModal,
  NSpace,
  useMessage,
} from "naive-ui";
import { Add } from "@vicons/carbon";
import { useMain } from "@/stores/Main";
import i18n from "@/i18n";
import { ref } from "vue";
import { useRouter } from "vue-router";
const main = useMain();
const router = useRouter();
const message = useMessage();
const language = ref();

/**
 * 切换语言
 */
const checkLang = () =>
  main.locale === "zh"
    ? (language.value = i18n("zh", "server"))
    : (language.value = i18n("", "server"));
const lang = () => {
  main.changeLang();
  checkLang();
  if (main.locale === "zh") {
    message.warning("您已更改语言 请刷新页面获得更好的效果");
  } else {
    message.warning("Please refresh Page to have a good view");
  }
};
// 开盘先初始化
checkLang();

/**
 * 新建服务器弹窗
 */
const isShow = ref(false);
const ip = ref("");
const token = ref("");
const enter = () => {
  main.account.push({
    ip: ip.value,
    token: token.value,
  });
};

/**
 * 跳转到服务器面板
 */
const redict = (index: number) => {
  const server = main.account[index];
  main.now = server;
  router.push("/dashboard");
};
</script>

<template>
  <NLayout content-style="height: 100vh;padding:24px">
    <NSpace vertical>
      <NSpace align="center" justify="space-between">
        <NH1 style="margin-bottom: 0">{{ language.title }}</NH1>
        <NSpace align="center">
          <NButton size="small" @click="lang">
            {{ main.locale === "zh" ? "English" : "中文" }}
          </NButton>
          <NButton @click="isShow = !isShow" type="primary" circle>
            <template #icon>
              <NIcon>
                <Add />
              </NIcon>
            </template>
          </NButton>
        </NSpace>
      </NSpace>
      <NGrid
        x-gap="14"
        cols="1 s:1 m:2 l:4 xl:5 2xl:6"
        y-gap="14"
        responsive="screen"
      >
        <NGi v-for="(item, index) in main.account" :key="index">
          <NCard :title="item.ip" hoverable @click="redict(index)"></NCard>
        </NGi>
      </NGrid>
      <NEmpty v-if="main.account.length === 0" />
    </NSpace>

    <!-- 新建窗口 -->
    <NModal
      v-model:show="isShow"
      preset="dialog"
      :title="language.newServer"
      :negative-text="language.cancel"
      :positive-text="language.OK"
      @positive-click="enter"
    >
      <NSpace vertical>
        <NInput :placeholder="language.newIp" v-model:value="ip" />
        <NInput :placeholder="language.newToken" v-model:value="token" />
      </NSpace>
    </NModal>
  </NLayout>
</template>
