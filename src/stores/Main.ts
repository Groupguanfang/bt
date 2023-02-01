import { defineStore } from "pinia";

interface state {
  account: Array<{
    ip: string;
    token: string;
  }>;
  locale: "zh" | "";
  now?: {
    ip?: string;
    token?: string;
  };
  isCollapsed: boolean
  showSider: boolean
}

export const useMain = defineStore("counter", {
  state: (): state => {
    return {
      account: [],
      locale: "zh",
      now: {},
      isCollapsed: false,
      showSider: true
    };
  },
  actions: {
    changeLang() {
      if (this.locale === "zh") {
        this.locale = "";
      } else {
        this.locale = "zh";
      }
    },
    changeSider() {
      this.showSider = !this.showSider
    },
    changeCollapsed() {
      this.isCollapsed = !this.isCollapsed
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});
