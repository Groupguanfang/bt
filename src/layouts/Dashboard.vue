<script setup lang="ts">
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutSider,
  NMenu,
} from "naive-ui";
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router"
import { MenuOptions } from "@/components/Menu";
import Header from "@/components/Header.vue";
import { useMain } from "@/stores/Main"
const main = useMain()
const route = useRoute()
const collapsed = ref(main.isCollapsed);
const sider = computed(() => main.showSider)
watch(collapsed, () => main.isCollapsed = collapsed.value)
const style = `padding: ${route.path === "/dashboard/editor" ? "" : "24px"};overflow-x:hidden;overflow-y: auto`
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
        v-if="sider"
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
        :content-style="style"
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
