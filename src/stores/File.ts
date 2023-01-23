import { defineStore } from "pinia";

interface state {
  path: string;
  history: Array<string>;
  handler: boolean;
  isChange: boolean;
}

export const useFile = defineStore("file", {
  state: (): state => {
    return {
      path: "/",
      history: [],
      handler: false,
      isChange: false,
    };
  },
  actions: {
    push(path: string) {
      this.history.push(this.path);
      if (this.path === "/") {
        this.path = this.path + path;
      } else {
        this.path = this.path + "/" + path;
      }
    },
    back(): boolean {
      if (this.history.length - 1 == -1) {
        return false;
      } else {
        this.path = this.history[this.history.length - 1];
        this.history.pop();
        return true;
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["path", "history"],
      },
    ],
  },
});
