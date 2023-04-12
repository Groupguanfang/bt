import express = require('express')
import * as pty from 'node-pty'
import os from 'os'

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash'
const router = express.Router()

const termMap = new Map()

function nodeEnvBind() {
  //绑定当前系统 node 环境
  const term = pty.spawn(shell, ['--login'], {
    name: 'xterm-color',
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env as any
  })
  termMap.set(term.pid, term)
  return term
}

//服务端初始化
router.post('/terminal', (req, res) => {
  const term = nodeEnvBind()
  res.send(term.pid.toString())
  res.end()
})

router.ws('/socket/:pid', (ws, req) => {
  const pid = parseInt(req.params.pid)
  const term = termMap.get(pid)
  term.on('data', function (data: any) {
    ws.send(data)
  })

  ws.on('message', (data: any) => {
    console.log(typeof data === 'string')
    term.write(data)
  })
  ws.on('close', function () {
    term.kill()
    termMap.delete(pid)
  })
})

module.exports = router
