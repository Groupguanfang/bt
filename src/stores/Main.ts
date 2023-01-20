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
}

export const useMain = defineStore("counter", {
  state: (): state => {
    return {
      account: [],
      locale: "zh",
      now: {},
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
