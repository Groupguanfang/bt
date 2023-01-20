<script setup lang="ts">
import { useMain } from "@/stores/Main";
import { getSystemTotal, getDiskInfo, getNetWork } from "@/apis";
import { onMounted, ref, type Ref } from "vue";
import { NH4, NProgress, NSpace } from "naive-ui";
const main = useMain();
const cpuPercentage = ref(0);
const memPercentage = ref(0);
const diskPercentage: Ref<Array<any>> = ref([]);
const netPercentage = ref();
onMounted(async () => {
  setInterval(async () => {
    const data = await getSystemTotal(
      <string>main.now?.ip,
      <string>main.now?.token
    );
    memPercentage.value = parseFloat(
      ((data.data.memRealUsed / data.data.memTotal) * 100).toFixed(1)
    );
    cpuPercentage.value = data.data.cpuRealUsed;
  }, 1000);

  // 磁盘信息
  const disk = await getDiskInfo(<string>main.now?.ip, <string>main.now?.token);
  diskPercentage.value = disk.data;
  for (let item in diskPercentage.value) {
    diskPercentage.value[item].inodes[3] = parseFloat(
      diskPercentage.value[item].inodes[3].replace(/%/, "")
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
      <NProgress status="success" type="dashboard" :percentage="memPercentage">
        <NSpace vertical align="center">
          <div>内存</div>
          <NH4 class="nopad">{{ memPercentage }}%</NH4>
        </NSpace>
      </NProgress>
      <NProgress status="success" type="dashboard" :percentage="cpuPercentage">
        <NSpace vertical align="center">
          <div>CPU</div>
          <NH4 class="nopad">{{ cpuPercentage }}%</NH4>
        </NSpace>
      </NProgress>
    </NSpace>
    <NSpace vertical>
      <NProgress
        :key="index"
        v-for="(item, index) in diskPercentage"
        :percentage="item.inodes[3]"
        status="success"
      >
        磁盘用量 {{ item.inodes[3] }}%
      </NProgress>
    </NSpace>
  </NSpace>
</template>

<style scoped>
.nopad {
  margin: 0;
}
</style>
