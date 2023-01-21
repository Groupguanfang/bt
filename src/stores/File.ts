import { defineStore } from "pinia";

export const useFile = defineStore("file", {
  state: () => {
    return {
      path: "/",
      history: [],
    };
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
