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
      this.history.push(this.path);
      if (this.path === "/") {
        this.path = this.path + path;
      } else {
        this.path = this.path + "/" + path
      }
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
