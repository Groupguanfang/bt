import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: () => import("./layouts/Root.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("./layouts/Dashboard.vue"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("./views/Home.vue"),
        },
        {
          path: "/dashboard/site",
          name: "site",
          component: () => import("./views/Site.vue"),
        },
        {
          path: "/dashboard/site/php/:id",
          name: "phpSetting",
          component: () => import("./views/PHPSetting.vue"),
        },
        {
          path: "/dashboard/database",
          name: "database",
          component: () => import("./views/Database.vue"),
        },
        {
          path: "/dashboard/file",
          name: "file",
          component: () => import("./views/File.vue"),
        },
        {
          path: "/dashboard/editor",
          name: "editor",
          component: () => import("./views/Editor.vue"),
        },
        {
          path: "/dashboard/store",
          name: "store",
          component: () => import("./views/Store.vue"),
        },
        {
          path: "/dashboard/task",
          name: "task",
          component: () => import("./views/Task.vue"),
        },
        {
          path: "/dashboard/setting",
          name: "setting",
          component: () => import("./views/Setting.vue"),
        },
      ],
    },
    {
      path: "/servers",
      name: "servers",
      component: () => import("./layouts/Servers.vue"),
    },
  ],
});

export default router;
