import type { MenuOption } from "naive-ui";
import {
  Dashboard,
  ApplicationWeb,
  DataBaseAlt,
  VolumeFileStorage,
  Store,
  Task,
  Settings,
} from "@vicons/carbon";
import { NIcon } from "naive-ui";
import { h, type Component } from "vue";
import { RouterLink } from "vue-router";
import i18n from "@/i18n";
const data = JSON.parse(localStorage.getItem("counter") as string);
let language: any;
if (data.locale === "zh") {
  language = i18n("zh", "menu");
} else {
  language = i18n("", "menu");
}

function renderIcon(icon: Component) {
  return () => <NIcon>{h(icon)}</NIcon>;
}

export const MenuOptions: MenuOption[] = [
  {
    label: () => <RouterLink to="/dashboard">{language.dashboard}</RouterLink>,
    key: "dashboard",
    icon: renderIcon(Dashboard),
  },
  {
    label: () => <RouterLink to="/dashboard/site">{language.site}</RouterLink>,
    key: "site",
    icon: renderIcon(ApplicationWeb),
  },
  {
    label: () => (
      <RouterLink to="/dashboard/database">{language.database}</RouterLink>
    ),
    key: "database",
    icon: renderIcon(DataBaseAlt),
  },
  {
    label: () => <RouterLink to="/dashboard/file">{language.file}</RouterLink>,
    key: "file",
    icon: renderIcon(VolumeFileStorage),
  },
  {
    label: () => (
      <RouterLink to="/dashboard/store">{language.store}</RouterLink>
    ),
    key: "store",
    icon: renderIcon(Store),
  },
  {
    label: () => <RouterLink to="/dashboard/task">{language.task}</RouterLink>,
    key: "task",
    icon: renderIcon(Task),
  },
  {
    label: () => (
      <RouterLink to="/dashboard/setting">{language.setting}</RouterLink>
    ),
    key: "setting",
    icon: renderIcon(Settings),
  },
];
