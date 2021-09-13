import * as core from '@actions/core'
import * as fs from 'fs'
import * as installer from '../src/app-installer'
import * as os from 'os'
import * as path from 'path'

const toolName = 'container-structure-test'

describe('app installer tests', () => {
  it('check the installation', async () => {
    const toolDir = process.env['RUNNER_TOOL_CACHE'] as string
    const version = '1.10.0'
    await installer.install(version)
    const dir = path.join(toolDir, toolName, version, os.arch())
    if (process.platform === 'win32') {
      expect(fs.existsSync(path.join(dir, toolName + '.exe'))).toBe(true)
    } else {
      expect(fs.existsSync(path.join(dir, toolName))).toBe(true)
    }
    const processPath = process.env['PATH']
    expect(processPath).toContain(toolName)
    core.debug(`path ${processPath}`)
    
  }, 20000)
})
