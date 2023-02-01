<script setup lang="tsx">
import { Pen, VmdkDisk, ArrowUp, ArrowDown } from "@vicons/carbon";
import { NText, NGi, NCard, NGrid, NIcon, NSpace } from "naive-ui";

const props = defineProps({
  upload: {
    type: Number,
    required: true,
  },
  download: {
    type: Number,
    required: true,
  },
  write: {
    type: Number,
    required: true,
  },
  read: {
    type: Number,
    required: true,
  },
  writeDelay: {
    type: Number,
  },
  readDelay: {
    type: Number,
  },
});
</script>

<template>
  <NCard title="监控">
    <NSpace justify="center" vertical>
      <NGrid :y-gap="30" cols="2 s:2 m:3 l:4">
        <NGi>
          <NSpace vertical align="center">
            <NIcon :color="upload > download ? '#0e7a0d' : ''" :size="35">
              <ArrowUp />
            </NIcon>
            <div>上传</div>
            <div>{{ props.upload }}KB</div>
          </NSpace>
        </NGi>
        <NGi>
          <NSpace vertical align="center">
            <NIcon :color="upload < download ? '#0e7a0d' : ''" :size="35">
              <ArrowDown />
            </NIcon>
            <div>下载</div>
            <div>{{ props.download }}KB</div>
          </NSpace>
        </NGi>
        <NGi>
          <NSpace vertical align="center">
            <NIcon :color="write < read ? '#F94646FF' : ''" :size="35">
              <VmdkDisk />
            </NIcon>
            <div>Read</div>
            <div>{{ (props.read / 1024 / 1024).toFixed(2) }}MB/s</div>
            <NText :depth="3">{{ readDelay }}ms</NText>
          </NSpace>
        </NGi>
        <NGi>
          <NSpace vertical align="center">
            <NIcon :color="write > read ? '#F94646FF' : ''" :size="35">
              <Pen />
            </NIcon>
            <div>Write</div>
            <div>{{ (props.write / 1024 / 1024).toFixed(2) }}MB/s</div>
            <NText :depth="3">{{ writeDelay }}ms</NText>
          </NSpace>
        </NGi>
      </NGrid>
    </NSpace>
  </NCard>
</template>
