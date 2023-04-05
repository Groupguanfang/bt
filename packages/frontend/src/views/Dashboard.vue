<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="tsx">
import { NDivider, NGi, NGrid, NProgress, NSpace, useMessage, useThemeVars } from 'naive-ui'
import LargeHeader from '@/components/LargeHeader.vue'
import { useServer } from '@/stores/servers'
import { useRouter } from 'vue-router'
import { Exit } from '@vicons/carbon'
import { DashboardAPI } from '@/apis/Dashboard'
import { ref } from 'vue'
import Tab from '@/templates/common/Tab.vue'
import Progress from '@/components/Progress.vue'
import SmallCard from '@/components/SmallCard.vue'
import InfoCard from '@/templates/dashboard/InfoCard.vue'

const server = useServer()
const now = server.now - 1
const router = useRouter()
const message = useMessage()
const themeVars = useThemeVars()
const dashboard = new DashboardAPI(server.servers[now].url, server.servers[now].key)

if (server.now === 0) {
  message.error('请重新选择服务器')
  router.push('/servers')
}

const cpuCoreUse = ref<number[]>([])
const memUse = ref({
  memBuffers: 0,
  memCached: 0,
  memFree: 0,
  memRealUsed: 0,
  memTotal: 0
})
const serverInfo = ref({
  system: '',
  cpu: '',
  title: '',
  time: '',
  version: '',
  user_info: {
    data: {
      username: ''
    }
  }
})
const onLoad = async () => {
  const network = await dashboard.getNetWork()
  cpuCoreUse.value = network.cpu[2]
  memUse.value = network.mem
  serverInfo.value = network
  console.log(network)
}
setInterval(() => onLoad(), 1000)
</script>

<template>
  <div class="padding page">
    <Tab />
    <LargeHeader
      title="主页"
      :button="Exit"
      :button-size="20"
      @operation="router.push('/servers')"
    />
    <NDivider />
    <NSpace vertical>
      <NProgress
        v-for="(item, index) in cpuCoreUse"
        :key="index"
        :percentage="item"
        indicator-placement="inside"
      />
    </NSpace>
    <NSpace style="margin-top: 20px" justify="space-between" align="center">
      <NSpace vertical>
        <NDivider style="margin: 0">内存</NDivider>
        <Progress
          title="内存"
          :color="themeVars.successColor"
          :percentage="parseFloat(((memUse.memRealUsed / memUse.memTotal) * 100).toFixed(1))"
        />
      </NSpace>
      <NGrid cols="2" :x-gap="10" :y-gap="10">
        <NGi>
          <SmallCard title="已用" :count="memUse.memRealUsed" />
        </NGi>
        <NGi>
          <SmallCard title="Cache" :count="memUse.memCached" />
        </NGi>
        <NGi>
          <SmallCard title="可用" :count="memUse.memFree" />
        </NGi>
        <NGi>
          <SmallCard title="Buffer" :count="memUse.memBuffers" />
        </NGi>
      </NGrid>
    </NSpace>
    <NSpace style="margin-top: 20px">
      <InfoCard :net-percentage="serverInfo" />
    </NSpace>
  </div>
</template>
