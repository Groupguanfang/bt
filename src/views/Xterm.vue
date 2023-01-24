<script setup lang="tsx">
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import { AttachAddon } from "xterm-addon-attach";
import { FitAddon } from "xterm-addon-fit";
import { onMounted } from "vue";
const initTerminal = () => {
  const prefix = "Baota $ ";
  const fitAddon = new FitAddon();
  const socket = new WebSocket("ws://0.0.0.0/sss");

  const attachAddon = new AttachAddon(socket);
  const terminal = new Terminal({ cursorBlink: true });
  terminal.open(document.getElementById("xterm") as HTMLElement);
  // 尺寸
  terminal.loadAddon(fitAddon);
  fitAddon.fit();

  terminal.loadAddon(attachAddon);
};
onMounted(() => initTerminal());
</script>

<template>
  <div id="xterm"></div>
</template>

<style></style>
