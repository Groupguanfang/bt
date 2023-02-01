<script setup lang="ts">
import i18n from "@/i18n";
import { useMain } from "@/stores/Main";
import { getSystemTotal, getDiskInfo, getNetWork } from "@/apis";
import { onMounted, ref, type Ref } from "vue";
import { NCard, NGrid, NGi, NH4, NProgress, NSpace, NTable } from "naive-ui";
import UpdateCard from "@/components/UpdateCard.vue";
import InfoCard from "@/components/InfoCard.vue";

const main = useMain();
const cpuCores = ref();
const cpuPercentage = ref(0);
const memPercentage = ref(0);
const diskPercentage: Ref<Array<any>> = ref([]);
const netPercentage = ref({
  cpu: ["", "", ""],
  system: "",
  title: "",
  time: "",
  user_info: { data: { username: "" } },
  version: "",
});
const loadOnePercentage = ref(0);
const loadFivePercentage = ref(0);
const loadFifteenPercentage = ref(0);
const language = ref();
/**
 * 切换语言
 */
(() =>
  main.locale === "zh"
    ? (language.value = i18n("zh", "home"))
    : (language.value = i18n("", "home")))();

onMounted(async () => {
  setInterval(async () => {
    // 获取系统信息
    const data = await getSystemTotal(
      <string>main.now?.ip,
      <string>main.now?.token
    );
    memPercentage.value = parseFloat(
      ((data.data.memRealUsed / data.data.memTotal) * 100).toFixed(1)
    );
    cpuPercentage.value = data.data.cpuRealUsed;
    cpuCores.value = data.data.cpuNum;
    // 网络
    const network = await getNetWork(
      <string>main.now?.ip,
      <string>main.now?.token
    );
    loadOnePercentage.value = network.data.load.one;
    loadFivePercentage.value = network.data.load.five;
    loadFifteenPercentage.value = network.data.load.fifteen;
  }, 1000);

  // 磁盘信息
  const disk = await getDiskInfo(<string>main.now?.ip, <string>main.now?.token);
  diskPercentage.value = disk.data;
  for (let item in diskPercentage.value) {
    diskPercentage.value[item].size[3] = parseFloat(
      diskPercentage.value[item].size[3].replace(/%/, "")
    );
  }

  // 负载与网络
  const network = await getNetWork(
    <string>main.now?.ip,
    <string>main.now?.token
  );
  netPercentage.value = network.data;
  console.log(network.data);
});
</script>

<template>
  <NSpace vertical>
    <NSpace justify="center">
      <!-- 一分钟 -->
      <NProgress
        status="success"
        type="dashboard"
        :percentage="loadOnePercentage"
      >
        <NSpace vertical align="center">
          <div>一分钟</div>
          <NH4 class="nopad">{{ loadOnePercentage }}%</NH4>
        </NSpace>
      </NProgress>
      <!-- 五分钟 -->
      <NProgress
        status="success"
        type="dashboard"
        :percentage="loadFivePercentage"
      >
        <NSpace vertical align="center">
          <div>五分钟</div>
          <NH4 class="nopad">{{ loadFivePercentage }}%</NH4>
        </NSpace>
      </NProgress>
      <!-- 十分钟 -->
      <NProgress
        status="success"
        type="dashboard"
        :percentage="loadFifteenPercentage"
      >
        <NSpace vertical align="center">
          <div>十分钟</div>
          <NH4 class="nopad">{{ loadFifteenPercentage }}%</NH4>
        </NSpace>
      </NProgress>
      <!-- 内存 -->
      <NProgress status="success" type="dashboard" :percentage="memPercentage">
        <NSpace vertical align="center">
          <div>内存</div>
          <NH4 class="nopad">{{ memPercentage }}%</NH4>
        </NSpace>
      </NProgress>
      <!-- CPU -->
      <NProgress status="success" type="dashboard" :percentage="cpuPercentage">
        <NSpace vertical align="center">
          <div>{{ cpuCores }}核心</div>
          <NH4 class="nopad">{{ cpuPercentage }}%</NH4>
        </NSpace>
      </NProgress>
    </NSpace>

    <!-- 格子阵 -->
    <NSpace vertical>
      <NGrid
        x-gap="14"
        y-gap="14"
        cols="1 s:1 m:2 l:3 xl:4 2xl:5"
        responsive="screen"
      >
        <NGi>
          <NCard class="disk_container" :title="language.diskInfomation">
            <div
              class="disk"
              :key="index"
              v-for="(item, index) in diskPercentage"
            >
              <NProgress processing :percentage="item.size[3]" status="success">
                {{ item.filesystem }}
                {{ item.size[3] }}%
              </NProgress>
              <NSpace justify="space-between">
                <div>文件系统：{{ item.type }}</div>
                <div>Inode使用率: {{ item.inodes[3] }}</div>
              </NSpace>
            </div>
          </NCard>
        </NGi>
        <NGi>
          <UpdateCard />
        </NGi>
        <NGi>
          <InfoCard :netPercentage="netPercentage" />
        </NGi>
      </NGrid>
    </NSpace>
  </NSpace>
</template>

<style scoped>
.nopad {
  margin: 0;
}
</style>
