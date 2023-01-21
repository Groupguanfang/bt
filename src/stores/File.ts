import { defineStore } from "pinia";

interface state {
  path: string;
  history: Array<string>;
}

export const useFile = defineStore("file", {
  state: (): state => {
    return {
      path: "/",
      history: [],
    };
  },
  actions: {
    push(path: string) {
      this.path = this.path + path;
      this.history.push(this.path);
    },
    back() {
      this.path = this.history[this.history.length - 1];
      this.history.pop();
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
