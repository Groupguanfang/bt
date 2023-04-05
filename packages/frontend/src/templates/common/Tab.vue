<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="tsx">
import { NAffix, NTab, NTabs } from 'naive-ui'
</script>

<template>
  <Teleport to="body">
    <NAffix class="tab-container" :trigger-bottom="9999999" :bottom="0">
      <NTabs type="segment">
        <NTab name="主页"></NTab>
        <NTab name="网站"></NTab>
      </NTabs>
    </NAffix>
  </Teleport>
</template>

<style lang="less">
.tab-container {
  width: calc(100% - 28px);
  margin-bottom: 14px;
  margin-left: 14px;
  .n-tabs .n-tabs-rail {
    background-color: rgb(44 44 44);
  }
}
</style>
