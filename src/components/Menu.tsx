import type { MenuOption } from "naive-ui";
import {
  Dashboard,
  ApplicationWeb,
  DataBaseAlt,
  VolumeFileStorage,
  Store,
  Task,
} from "@vicons/carbon";
import { NIcon } from "naive-ui";
import { h, type Component } from "vue";
import { RouterLink } from "vue-router";

function renderIcon(icon: Component) {
  return () => <NIcon>{h(icon)}</NIcon>;
}

export const MenuOptions: MenuOption[] = [
  {
    label: () => <RouterLink to="/dashboard">首页</RouterLink>,
    key: "dashboard",
    icon: renderIcon(Dashboard),
  },
  {
    label: () => <RouterLink to="/dashboard/site">网站</RouterLink>,
    key: "site",
    icon: renderIcon(ApplicationWeb),
  },
  {
    label: () => <RouterLink to="/dashboard/database">数据</RouterLink>,
    key: "database",
    icon: renderIcon(DataBaseAlt),
  },
  {
    label: () => <RouterLink to="/dashboard/file">文件</RouterLink>,
    key: "file",
    icon: renderIcon(VolumeFileStorage),
  },
  {
    label: () => <RouterLink to="/dashboard/store">商店</RouterLink>,
    key: "store",
    icon: renderIcon(Store),
  },
  {
    label: () => <RouterLink to="/dashboard/task">任务</RouterLink>,
    key: "task",
    icon: renderIcon(Task),
  },
];
