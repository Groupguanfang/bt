<script setup lang="ts">
import { useMain } from "@/stores/Main";
import { updatePanel } from "@/apis";
import { NAlert, NBadge, NResult, NScrollbar, NSpace } from "naive-ui";
import { onMounted, ref, type Ref } from "vue";
import i18n from "@/i18n";
const main = useMain();
const language = ref();

/**
 * 切换语言
 */
(() =>
  main.locale === "zh"
    ? (language.value = i18n("zh", "home"))
    : (language.value = i18n("", "home")))();

const status = ref(false);
const isShow = ref("");
const msg: Ref<{
  updateMsg?: string;
}> = ref({});
onMounted(async () => {
  const update = await updatePanel(
    <string>main.now?.ip,
    <string>main.now?.token
  );
  //status.value = update.data.status;
  if (update.data.status) {
    isShow.value = "新";
    msg.value = update.data.msg;
  }
});
</script>

<template>
  <NBadge class="max" :value="isShow">
    <NAlert
      :type="status ? 'info' : 'success'"
      class="max net_container"
      :title="language.updateTitle"
    >
      <NSpace v-if="status" vertical>
        <NScrollbar style="max-height: 80px">
          <div v-html="msg.updateMsg" />
        </NScrollbar>
      </NSpace>
      <NSpace v-if="!status"> 暂无更新 </NSpace>
    </NAlert>
  </NBadge>
</template>

<style scoped>
.max {
  width: 100%;
}
</style>
