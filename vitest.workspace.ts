import fs from 'node:fs'
import path from 'node:path'
import { load } from 'js-yaml'
import { defineWorkspace } from 'vitest/config'

function loadWorkspace(): string[] {
  if (!fs.existsSync(path.join('pnpm-workspace.yaml')))
    return []
  const workspaceFile = fs.readFileSync('pnpm-workspace.yaml', 'utf-8')
  const parsedFile = (load(workspaceFile) as { packages: string[] }) || { packages: [] }
  return (parsedFile || { packages: [] as string[] }).packages || []
}

export default defineWorkspace(loadWorkspace())
