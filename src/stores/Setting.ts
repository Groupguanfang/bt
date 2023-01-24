import { defineStore } from "pinia";

interface state {
  editor: "Ace" | "Codemirror 6";
}

export const useSetting = defineStore("setting", {
  state: (): state => {
    return {
      editor: "Codemirror 6",
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
