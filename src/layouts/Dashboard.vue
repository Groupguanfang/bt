<script setup lang="ts">
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutSider,
  NMenu,
} from "naive-ui";
import { ref } from "vue";
import { MenuOptions } from "@/components/Menu";
import Header from "@/components/Header.vue";
const collapsed = ref(false);
</script>

<template>
  <NLayout content-style="height: 100vh">
    <NLayoutHeader id="header" bordered>
      <Header />
    </NLayoutHeader>
    <NLayout has-sider id="content-container">
      <NLayoutSider
        show-trigger
        collapse-mode="width"
        :collapsed="collapsed"
        @collapse="collapsed = true"
        @expand="collapsed = false"
        :collapsed-width="60"
        bordered
      >
        <NMenu
          default-value="dashboard"
          :options="MenuOptions"
          :collapsed="collapsed"
          :collapsed-width="60"
          accordion
        />
      </NLayoutSider>
      <NLayoutContent
        content-style="padding: 24px;overflow-x:hidden;overflow-y: auto"
      >
        <RouterView />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<style>
#header {
  position: fixed;
  z-index: 999;
  height: 50px;
  width: 100%;
}
#content-container {
  height: calc(100% - 50px);
  margin-top: 50px;
}
</style>
