<script setup lang="tsx">
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import { AttachAddon } from 'xterm-addon-attach'
import { FitAddon } from 'xterm-addon-fit'
import { onMounted } from 'vue'
import { WorkspaceAPI } from '@/apis/Workspace'
import { useServer } from '@/stores/servers'
import { NButton, NSpace, useMessage } from 'naive-ui'
import config from '@/config/config'

const server = useServer()
const message = useMessage()
const now = server.now - 1

let terminalInstance: Terminal
let socket: WebSocket
const paste = async () => {
  try {
    const text = await navigator.clipboard.readText()
    terminalInstance.paste(text)
  } catch (err) {
    message.error('粘贴失败 可能是您没有授予粘贴权限或您的浏览器不支持此功能')
  }
}

const ctrlc = () => socket.send('')

const initTerminal = async () => {
  const workSpaceAPI = new WorkspaceAPI(server.servers[now].url, server.servers[now].key)
  const terminalPID = await workSpaceAPI.getTerminal()
  const fitAddon = new FitAddon()
  socket = new WebSocket(`ws://${config.serverURL}/socket/` + terminalPID)

  const attachAddon = new AttachAddon(socket)
  terminalInstance = new Terminal({ cursorBlink: true })
  terminalInstance.open(document.getElementById('xterm') as HTMLElement)
  // 尺寸
  terminalInstance.write('按Enter键激活控制台')
  terminalInstance.loadAddon(fitAddon)
  fitAddon.fit()
  window.addEventListener('resize', () => {
    fitAddon.fit()
  })
  terminalInstance.loadAddon(attachAddon)
}
onMounted(initTerminal)
</script>

<template>
  <div id="terminal">
    <div id="xterm"></div>
    <NSpace size="small" id="operation">
      <NButton @click="paste">粘贴</NButton>
      <NButton @click="terminalInstance.clear()">清屏</NButton>
      <NButton @click="ctrlc">Ctrl + C</NButton>
    </NSpace>
  </div>
</template>

<style lang="less">
@font-face {
  font-family: Jetbrains-Mono;
  src: url('/font/JetBrainsMono-Medium.woff2');
}
#terminal {
  height: 100%;
  width: 100%;
  position: absolute;
  #operation {
    background-color: #000;
  }
  #xterm {
    height: 100%;
    width: 100%;
    .xterm {
      height: 100%;
    }
    .xterm * {
      font-family: Jetbrains-Mono;
    }
    .xterm-viewport::-webkit-scrollbar {
      background: #000;
      width: 8px;
    }
    .xterm-viewport::-webkit-scrollbar-thumb {
      background: #ffffff30;
      border-radius: 100px;
    }
  }
}
</style>
