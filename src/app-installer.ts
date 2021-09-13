import * as core from '@actions/core'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as tc from '@actions/tool-cache'

export async function install(version: string): Promise<void> {
  const toolName = 'container-structure-test'
  const url = getDownloadUrl(version, toolName)
  /* eslint-disable no-console */
  console.log(`install app called version : ${version} url : ${url}`)
  /* eslint-enable no-console */

  const appPath = await getBinary(toolName, version, url)

  /* eslint-disable no-console */
  console.log(`${toolName} has been cached at ${appPath}`)
  /* eslint-enable no-console */

  core.addPath(path.dirname(appPath))
}

function getArch(): string {
  let archName: string | null = null
  switch (os.arch()) {
    case 'x64':
      archName = `amd64`
      break
  }
  if (!archName) {
    const errormsg = `Unsupported arch:${os.arch()}`
    throw new Error(errormsg)
  }
  return archName
}

function getDownloadUrl(version: string, tool: string): string {
  const platformMap: {[platform: string]: string} = {
    linux: 'linux',
    darwin: 'darwin',
    win32: 'windows'
  }
  const archMap: {[arch: string]: string} = {
    x64: 'amd64'
  }
  const arch = archMap[os.arch()]
  const platform = platformMap[os.platform()]
  const extension = getExecutableExtension()
  if (!arch || !platform) {
    const errormsg = `Unsupported platform.platform:${os.platform()},arch:${os.arch()}`
    throw new Error(errormsg)
  }
  return `https://storage.googleapis.com/${tool}/v${version}/${tool}-${platform}-${arch}${extension}` 
}

async function getBinary(
  toolName: string,
  version: string,
  url: string
): Promise<string> {
  let cachedToolpath: string
  cachedToolpath = tc.find(toolName, version)

  if (!cachedToolpath) {
    core.debug(`Downloading ${toolName} from: ${url}`)

    let downloadPath: string | null = null
    try {
      downloadPath = await tc.downloadTool(url)
    } catch (error) {
      throw new Error(`Failed to download version ${version}: ${error}`)
    }

    cachedToolpath = await tc.cacheFile(
      downloadPath,
      toolName + getExecutableExtension(),
      toolName,
      version
    )
  }

  const executablePath = path.join(
    cachedToolpath,
    toolName + getExecutableExtension()
  )

  fs.chmodSync(executablePath, '777')

  return executablePath
}

function getExecutableExtension(): string {
  if (os.type().match(/^Win/)) {
    return '.exe'
  }
  return ''
}
