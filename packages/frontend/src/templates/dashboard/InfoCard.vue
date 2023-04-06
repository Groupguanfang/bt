<script setup lang="ts">
import { NCard, NH3, NH5, NIcon, NSpace, NTable } from 'naive-ui'
import CentOS from '@/assets/CentOS.vue'
import Ubuntu from '@/assets/Ubuntu.vue'
import Debian from '@/assets/Debian.vue'
import Linux from '@/assets/Linux.vue'

const props = defineProps<{
  netPercentage: {
    system: string
    cpu: string
    title: string
    time: string
    version: string
    user_info: {
      data: {
        username: string
      }
    }
  }
}>()
</script>

<template>
  <NCard title="服务器信息">
    <NSpace>
      <NIcon :size="80">
        <CentOS v-if="/CentOS/g.test(props.netPercentage.system)" />
        <Ubuntu v-if="/Ubuntu/g.test(props.netPercentage.system)" />
        <Debian v-if="/Debian/g.test(props.netPercentage.system)" />
        <Linux v-if="/Linux/g.test(props.netPercentage.system)" />
      </NIcon>
      <NSpace vertical>
        <NH3>{{ props.netPercentage.system }}</NH3>
        <NH5>{{ props.netPercentage.cpu[3] }}</NH5>
      </NSpace>
    </NSpace>
    <NTable>
      <tbody>
        <tr>
          <td width="50">名称</td>
          <td>{{ props.netPercentage.title }}</td>
        </tr>
        <tr>
          <td width="50">已运行</td>
          <td>{{ props.netPercentage.time }}</td>
        </tr>
        <tr>
          <td width="50">用户名</td>
          <td>{{ props.netPercentage.user_info.data.username }}</td>
        </tr>
        <tr>
          <td width="50">版本</td>
          <td>{{ props.netPercentage.version }}</td>
        </tr>
      </tbody>
    </NTable>
  </NCard>
</template>
